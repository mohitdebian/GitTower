import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'GitTower | GitHub Command Center',
  description: 'GitTower is the ultimate GitHub command center for developers. Zero context switching.',
};

import { Analytics } from "@vercel/analytics/react";

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
