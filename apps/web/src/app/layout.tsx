import Navbar from '@/components/Navbar';
import './globals.css';

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
      <body className={`flex flex-col min-h-screen`}>
        <Navbar />
        {children}
        <footer className="min-h-[7vh] max-h-[7vh] footer items-center justify-center p-4 bg-neutral text-neutral-content">
          <p>Copyright © 2023 - All right reserved</p>
        </footer>
      </body>
    </html>
  );
}
