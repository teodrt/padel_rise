import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PadelRise",
  description: "Elevate your padel game with AI-powered insights",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
