import Header from './components/Header/Header';
import './globals.css'
import {  Nunito } from 'next/font/google'

export const metadata = {
  title: 'Mokki rent demo',
  description: 'best place to spend your summer in Finland',
}

const font = Nunito({
  subsets: ["latin"],
});

export default function RootLayout({ 
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Header />
        {children}
      </body>
    </html>
  )
}
