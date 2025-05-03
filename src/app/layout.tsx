import type { Metadata } from "next";
import { Analytics } from '@vercel/analytics/next';
import { Poppins, Roboto } from "next/font/google"; // Import Poppins and Roboto
import "./globals.css";

// Configure Poppins font
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "600", "700"], // Include weights needed, especially bold for titles
  display: "swap", // Optional: improves font loading performance
});

// Configure Roboto font
const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "700"], // Include weights needed, regular for body
  display: "swap", // Optional: improves font loading performance
});

// Update metadata
export const metadata: Metadata = {
  title: "DeNada Consulting - Création d'Applications Web",
  description:
    "DeNada Consulting aide les petites entreprises à se développer en ligne avec des sites et applications web sur mesure, faciles à gérer, conformes et accessibles.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${poppins.variable} ${roboto.variable} font-sans`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
