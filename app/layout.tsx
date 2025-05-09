import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MainNav from "@/components/shared/MainNav";
import SessionProvider from "./SessionProvider";
import Footer from "@/components/shared/Footer";
import { Noto_Serif } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { env } from "@/lib/env";
import Provider from "./SessionProvider";
import logo from "@/images/Untitled_design__8_-removebg-preview.png";
const NotoSerif = Noto_Serif({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SEOMrush",
  description:
    "This is a Blog App that provides the best guides, tips and teaches you web developent in specific and development in general",
  icons: {
    icon: "https://res.cloudinary.com/dw7nnruzm/image/upload/v1744377170/blog/s6jiewujcn0gtcsnbzzy.png",
    shortcut:
      "https://res.cloudinary.com/dw7nnruzm/image/upload/v1744377170/blog/s6jiewujcn0gtcsnbzzy.png",
    apple:
      "https://res.cloudinary.com/dw7nnruzm/image/upload/v1744377170/blog/s6jiewujcn0gtcsnbzzy.png",
  },
  openGraph: {
    title: "SEOMrush",
    description:
      "This is a Blog App that provides the best guides, tips and teaches you web developent in specific and development in general",
    url: "https://blog-app-f8xx.vercel.app",
    siteName: "SEOMrush",
    images: [
      {
        url: "https://res.cloudinary.com/dw7nnruzm/image/upload/v1744377170/blog/s6jiewujcn0gtcsnbzzy.png",
        width: 800,
        height: 600,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${NotoSerif.className} bg-white`}>
        <SessionProvider>
          <main className="">{children}</main>
        </SessionProvider>
      </body>
      <GoogleAnalytics gaId={env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
    </html>
  );
}
