import type { Metadata } from "next";
import {
  Noto_Sans_KR,
  Roboto_Mono,
  Noto_Sans_JP,
  Inter,
} from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Navbar from "./components/Navbar";
import { TagProvider } from "./context/TagContext";
import { UserProvider } from "./context/UserContext";
import { PostProvider } from "./context/PostContext";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ClerkProvider>
          <UserProvider>
            <PostProvider>
              <TagProvider>
                <Navbar />
                <main className="h-full overflow-y-auto position-relative ">
                  {children}
                </main>
              </TagProvider>
            </PostProvider>
          </UserProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
