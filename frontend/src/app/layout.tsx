import { Cormorant_Garamond, Poppins } from 'next/font/google'
import "./globals.css";
import Navbar from '../components/Navbar';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-cormorant',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-poppins',
})

export const metadata = {
  title: 'Zetozz',
  description: 'Luxury Skincare Brand',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${cormorant.variable}`}>
        <Navbar />
        {children}
        </body>
    </html>
  );
}
