import type { Metadata } from "next";
import { DM_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { PortfolioChatbot } from "@/components/PortfolioChatbot";
import { ScrollToTop } from "@/components/ScrollToTop";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sirigineedi Balaji | Full Stack Developer & AI Enthusiast",
  description: "Portfolio of Sirigineedi Balaji, a Full Stack Developer specialized in Backend, API Development, and AI-Integrated Applications.",
  icons: {
    icon: "/Letter B Logo (1) Cropped.png",
    apple: "/Letter B Logo (1) Cropped.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${dmSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          {children}
          <PortfolioChatbot />
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}

