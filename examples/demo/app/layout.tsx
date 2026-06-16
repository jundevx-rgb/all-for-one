import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'All for One — Web Design Master',
  description: 'Production-grade web design component library demo',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-gray-950 text-white antialiased">
        {children}
      </body>
    </html>
  );
}
