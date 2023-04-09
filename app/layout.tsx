import './globals.scss'
import { Providers } from './GlobalRedux/provider';
import Header from "./Components/Header";
import Footer from "./Components/Footer";

export const metadata = {
  title: 'Sample Site',
  description: 'Site description here.'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
