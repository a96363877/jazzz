
import Header from '@/components/header';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Loader } from '@/components/loader';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'فتح حساب ECCP',
  description: 'فتح حساب ECCP أو إسترجاع كلمة السر  ',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <Header />
          {children}
            {/* Footer */}
        <div className="text-center text-sm text-muted-foreground">
          حقوق التأليف والنشر © 2025 بريد الجزائر
        </div>
      </body>
    </html>
  );
}
