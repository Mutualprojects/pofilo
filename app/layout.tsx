import type { Metadata } from "next";
import { DM_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { PortfolioChatbot } from "@/components/PortfolioChatbot";
import { ScrollToTop } from "@/components/ScrollToTop";
import { CookieConsent } from "@/components/CookieConsent";
import { Analytics } from "@vercel/analytics/next";

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
  title: {
    default: "Sirigineedi Balaji | Full Stack Developer & AI Architect",
    template: "%s | Sirigineedi Balaji",
  },
  description: "Portfolio of Sirigineedi Balaji, a Full Stack Developer specializing in high-performance Backend Architecture, next-gen API Development, and advanced AI-Integrated Applications.",
  keywords: [
    "Sirigineedi Balaji",
    "Full Stack Developer",
    "Software Engineer",
    "AI Developer",
    "AI Architect",
    "Backend Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "System Architecture",
    "API Development",
    "Web Development Portfolio"
  ],
  authors: [{ name: "Sirigineedi Balaji" }],
  creator: "Sirigineedi Balaji",
  publisher: "Sirigineedi Balaji",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "oCKPmsc8TayOJwzRbikbi2cDCTYUf4VBNeUWKIKayi4",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Sirigineedi Balaji | Full Stack Developer & AI Architect",
    description: "Explore the portfolio of Sirigineedi Balaji, specializing in Backend Architecture, API Development, and AI Apps.",
    siteName: "Sirigineedi Balaji Portfolio",
    images: [
      {
        url: "/Letter B Logo (1) Cropped.png",
        width: 1200,
        height: 630,
        alt: "Sirigineedi Balaji Portfolio Showcase",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sirigineedi Balaji | Full Stack Developer & AI Architect",
    description: "Explore the portfolio of Sirigineedi Balaji, specializing in Backend Architecture, API Development, and AI Apps.",
    images: ["/Letter B Logo (1) Cropped.png"],
  },
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
  // JSON-LD Schema for Google Knowledge Graph / Rich Snippets
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Sirigineedi Balaji",
    "url": "https://sirigineedibalaji.com", // Update this with your actual domain
    "image": "https://sirigineedibalaji.com/Letter%20B%20Logo%20(1)%20Cropped.png",
    "jobTitle": "Full Stack Developer & AI Architect",
    "description": "Full Stack Developer specializing in high-performance Backend Architecture, next-gen API Development, and advanced AI-Integrated Applications.",
    "sameAs": [
      "https://www.linkedin.com/in/sirigineedibalaji", // Add your real LinkedIn
      "https://github.com/SirigineediBalaji", // Add your real GitHub
      "https://twitter.com/SirigineediB" // Add your real Twitter/X if applicable
    ],
    "alumniOf": {
      "@type": "CollegeOrUniversity",
      "name": "Your University Name" // Optional: helps with knowledge graph connections
    },
    "knowsAbout": [
      "Software Engineering",
      "Full Stack Web Development",
      "Artificial Intelligence",
      "Backend Architecture",
      "React",
      "Next.js",
      "Node.js",
      "Python"
    ]
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5Q2WMTJ6');`
          }}
        />
        {/* End Google Tag Manager */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${dmSans.variable} ${geistMono.variable} antialiased`}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-5Q2WMTJ6"
            height="0" 
            width="0" 
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          {children}
          <PortfolioChatbot />
          <ScrollToTop />
          <CookieConsent />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}

