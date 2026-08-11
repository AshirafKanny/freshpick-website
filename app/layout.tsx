import { Geist, Geist_Mono } from "next/font/google";
import { JsonLd } from "@/components/seo/JsonLd";
import { getRestaurantSchema, getWebsiteSchema } from "@/lib/seo/schema";
import { rootMetadata } from "@/lib/seo/metadata";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = rootMetadata;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <JsonLd data={getWebsiteSchema()} />
        <JsonLd data={getRestaurantSchema()} />
        {children}
      </body>
    </html>
  );
}
