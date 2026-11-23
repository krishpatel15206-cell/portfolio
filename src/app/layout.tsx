import type { Metadata } from "next";
import { Space_Grotesk, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Krish Patel | UI/UX Designer & Creative Portfolio",
  description: "Krish Patel — UI/UX Designer and Computer Science & Design Student. Designing digital experiences that are intuitive, engaging and meaningful.",
  keywords: ["UI/UX Designer", "Product Designer", "Figma", "Design Systems", "Krish Patel", "Portfolio", "Interaction Design"],
  openGraph: {
    title: "Krish Patel | UI/UX Designer",
    description: "Designing digital experiences that are intuitive, engaging and meaningful.",
    url: "https://krishpatel.design",
    siteName: "Krish Patel Portfolio",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${plusJakartaSans.variable} scroll-smooth scroll-pt-24 dark`}
    >
      <body className="min-h-screen bg-[#08080a] text-[#f4f4f5] antialiased selection:bg-[#ccff00] selection:text-black">
        {children}
      </body>
    </html>
  );
}
