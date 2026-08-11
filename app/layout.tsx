import { Fraunces, Inter } from "next/font/google";
import { JsonLd } from "@/components/seo/JsonLd";
import { getRestaurantSchema, getWebsiteSchema } from "@/lib/seo/schema";
import { rootMetadata } from "@/lib/seo/metadata";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = rootMetadata;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <JsonLd data={getWebsiteSchema()} />
        <JsonLd data={getRestaurantSchema()} />
        {children}
      </body>
    </html>
  );
}
