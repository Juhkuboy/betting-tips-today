import React from 'react';
import Navbar from './Navbar';
import './globals.css';

export const metadata = {
  title: 'Betting Tips Today',
  description: 'AI-Powered Betting Tips',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <Navbar />
                {children}
            </body>
        </html>
    );
}
