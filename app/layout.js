import { Inter } from 'next/font/google'
import './globals.css'
import { Syne } from "next/font/google";

// const inter = Inter({ subsets: ['latin'] })
const syne = Syne({
  subsets: ["latin"],
  display: "block",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata = {
  title: 'Earth',
  description: 'Our planet is a beautiful place.',

}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${syne.className} no-scrollbar`}>{children}</body>
    </html>
  )
}
