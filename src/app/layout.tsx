import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import ThemeLoader from "@/components/ThemeLoader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Quizmatix",
    description: "Türkiye'nin çevrim içi bilgi yarışması!",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="tr">
            <body className={inter.className}>{children}</body>
            <ThemeLoader></ThemeLoader>
        </html>
    );
}
