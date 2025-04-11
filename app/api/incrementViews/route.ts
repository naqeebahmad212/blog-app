import { prisma } from "@/lib/db/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getClientIp } from "request-ip"; // Install `request-ip` for IP detection

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Post ID is required" },
        { status: 400 }
      );
    }

    // Get the user's IP address
    const ip =
      getClientIp(req as any) || // Use request-ip to get the IP address
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.ip ||
      "unknown";
    // If using a proxy or load balancer, the IP might not be directly available
    // so you might need to use a library like `request-ip` to get the real IP address.

    if (ip === "unknown") {
      return NextResponse.json(
        { error: "Unable to determine IP address" },
        { status: 400 }
      );
    }

    // Check if this IP has already viewed the post recently
    const existingView = await prisma.postViews.findFirst({
      where: {
        postId: id,
        ipAddress: ip,
        createdAt: {
          gte: new Date(Date.now() - 24 * 60 * 60 * 1000), // Within the last 24 hours
        },
      },
    });

    if (!existingView) {
      // Increment the view count
      await prisma.post.update({
        where: { id },
        data: { views: { increment: 1 } },
      });

      // Log the view in the database
      await prisma.postViews.create({
        data: {
          postId: id,
          ipAddress: ip,
        },
      });
    }

    return NextResponse.json(
      { message: "View count updated" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error incrementing views:", error);
    return NextResponse.json(
      { error: "Failed to increment views" },
      { status: 500 }
    );
  }
}
