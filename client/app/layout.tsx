import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Appointment system',
  description: 'Appointment system frontend',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
