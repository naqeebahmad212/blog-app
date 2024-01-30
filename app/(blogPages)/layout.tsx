import MainNav from "@/components/shared/MainNav";
import Footer from "@/components/shared/Footer";
import { Noto_Serif } from "next/font/google";


const NotoSerif = Noto_Serif({
  weight: "400",
  subsets: ["latin"],
});



export default function BlogPagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
   
      <main>
          <MainNav />
          <main className="">{children}</main>
          <Footer />
      </main>
  )
}
