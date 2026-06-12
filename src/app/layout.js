import "./globals.css";
import { Newsreader, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-serif",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata = {
  title: "Anil Chitrapu · Product Manager, Apple News",
  description:
    "Anil Chitrapu is a product manager at Apple working on News. Previously at The New York Times, Condé Nast, and SeatGeek.",
  keywords: [
    "Anil Chitrapu",
    "Product Manager",
    "Apple",
    "Apple News",
    "The New York Times",
    "Wirecutter",
    "Condé Nast",
    "SeatGeek",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${newsreader.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>👋</text></svg>" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>👋</text></svg>" />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
