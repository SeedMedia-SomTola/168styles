import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import "./globals.css";
import { NextIntlClientProvider } from 'next-intl';
import {getMessages} from "next-intl/server";

const ubuntuSans = Ubuntu({
    variable: "--font-ubuntu-sans",
    subsets: ["latin"],
    weight: ["400", "500", "700"], // Add weights as needed
});

export const metadata: Metadata = {
    title: "168Styles",
    description: "Beauty Website",
};

export default async function LocaleLayout({
                                               children,
                                               params,
                                           }: {
    children: React.ReactNode;
    params: { locale: string };
}) {
    const { locale } = await params; // Await params before using `locale`

    const messages = await getMessages();

    return (
        <html lang={locale}>
        <body className={`${ubuntuSans.variable} antialiased`}>
        <NextIntlClientProvider messages={messages}>
            {children}
        </NextIntlClientProvider>
        </body>
        </html>
    );
}