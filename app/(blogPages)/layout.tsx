import MainNav from "@/components/shared/MainNav";
import Footer from "@/components/shared/Footer";
import { Noto_Serif } from "next/font/google";

const notoSerif = Noto_Serif({
  weight: "400",
  subsets: ["latin"],
});

export default function BlogPagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className={`${notoSerif.className} `}>
      <MainNav />
      <main className="min-h-dvh">{children}</main>
      <Footer />
    </main>
  );
}
