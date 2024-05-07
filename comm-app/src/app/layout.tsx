import type { Metadata } from "next";
import {
  Noto_Sans_KR,
  Roboto_Mono,
  Source_Sans_3,
  Inter,
} from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Navbar from "./components/Navbar";
import { TagProvider } from "./context/TagContext";
import { UserProvider } from "./context/UserContext";
import { PostProvider } from "./context/PostContext";
import {
  LanguageProvider,
  useLanguageContext,
} from "./context/LanguageContext";

// The following import prevents a Font Awesome icon server-side rendering bug,
// where the icons flash from a very large icon down to a properly sized one:
import "@fortawesome/fontawesome-svg-core/styles.css";
// Prevent fontawesome from adding its CSS since we did it manually above:
import { config } from "@fortawesome/fontawesome-svg-core";
import { useEffect } from "react";
config.autoAddCss = false; /* eslint-disable import/first */

const notoSansKR = Noto_Sans_KR({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

const inter = Inter({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

const sourceSans3 = Source_Sans_3({
  weight: ["200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "커뮤니티 ✧",
  description: "Created with Next.js <3",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={sourceSans3.className}>
      <body>
        <ClerkProvider>
          <UserProvider>
            <LanguageProvider>
              <PostProvider>
                <TagProvider>
                  <Navbar />
                  <main className="h-full overflow-y-auto position-relative">
                    {children}
                  </main>
                </TagProvider>
              </PostProvider>
            </LanguageProvider>
          </UserProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
