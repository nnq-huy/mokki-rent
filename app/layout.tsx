import ClientOnly from './components/ClientOnly';
import Header from './components/navbar/Navbar';
import './globals.css'
import {  Nunito } from 'next/font/google'
import ToasterProvider from './providers/ToasterProvider';
import getCurrentUser from './actions/getCurrentUser';
import ModalsProvider from './providers/ModalsProvider';

export const metadata = {
  title: 'Mokki rent',
  description: 'best place to spend your summer in Finland',
}

const font = Nunito({
  subsets: ["latin"],
});

export default async function RootLayout({ 
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider/>
          <ModalsProvider/>
          <Header currentUser={currentUser}/>
        </ClientOnly>
        <div className="pb-20 pt-28">
        {children}
        </div>
      </body>
    </html>
  )
}
