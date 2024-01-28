import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/shared/Navbar'
import MainNav from '@/components/shared/MainNav'
import SessionProvider from './SessionProvider'
import Footer from '@/components/shared/Footer'
import { Noto_Serif } from 'next/font/google'
 
const NotoSerif = Noto_Serif({
  weight: '400',
  subsets: ['latin'],
})

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SEOMrush',
  description: 'This is a Blog App that provides the best guides, tips and teaches you web developent in specific and development in general',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${NotoSerif.className} bg-white`  }>
        <SessionProvider>
        <MainNav/>
        <main className='p-5 bg-white w-[85vw] m-auto'>

        {children}
        </main>
        <Footer/>
        </SessionProvider>
        </body>
    </html>
  )
}
