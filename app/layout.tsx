import ClientOnly from './components/ClientOnly';
import Header from './components/navbar/Navbar';
import './globals.css'
import { Nunito } from 'next/font/google'
import ToasterProvider from './providers/ToasterProvider';
import getCurrentUser from './actions/getCurrentUser';
import ModalsProvider from './providers/ModalsProvider';
import Footer from './components/footer/Footer';

export const metadata = {
  title: 'Mökki Rent',
  description: 'The best place to spend your summer in Finland!',
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
    <html lang="en-FI">
      <body className={font.className}>
        <Header currentUser={currentUser} />
        <ClientOnly>
          <ToasterProvider />
          <ModalsProvider />
        </ClientOnly>
        <div className="pt-[88px] bg-gray-50">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  )
}
