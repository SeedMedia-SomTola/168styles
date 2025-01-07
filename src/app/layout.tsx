import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import "./globals.css";

const ubuntuSans = Ubuntu({
  variable: "--font-ubuntu-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"], // Add weights as needed
});

export const metadata: Metadata = {
  title: "168Styles",
  description: "Beauty Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${ubuntuSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
