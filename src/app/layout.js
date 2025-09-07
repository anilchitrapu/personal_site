import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

export const metadata = {
  title: "Anil Chitrapu | Product Manager",
  description: "Personal website of Anil Chitrapu, Product Manager enabling teams to build impactful products that drive engagement and growth.",
  keywords: ["Anil Chitrapu", "Product Manager", "The New York Times", "Wirecutter", "Condé Nast", "SeatGeek", "Penn Masala"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300..800&display=swap" />
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
