import type { Metadata } from "next";
import { Noto_Sans_KR, Roboto_Mono, Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Navbar from "./components/Navbar";
import { TagProvider } from "./context/TagContext";

const notoSansKR = Noto_Sans_KR({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ClerkProvider>
          <TagProvider>
            <Navbar />
            <main>{children}</main>
          </TagProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
