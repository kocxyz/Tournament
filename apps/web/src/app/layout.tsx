import Navbar from '@/components/Navbar';
import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Brawler | kocity.xyz',
  description: 'A KnockoutCity Brawler index',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`flex flex-col ${inter.className} min-h-screen`}>
        <Navbar />
        {children}
        <footer className="footer items-center justify-center p-4 bg-neutral text-neutral-content">
          <p>Copyright © 2023 - All right reserved</p>
        </footer>
      </body>
    </html>
  );
}
