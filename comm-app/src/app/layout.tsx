import type { Metadata } from "next";
import { Noto_Sans, Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import { ClerkProvider, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import "./globals.css";
import Link from "next/link";

const notoSansKR = Noto_Sans_KR({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
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
    <html lang="en">
      <body>
        <ClerkProvider>
          <header>
            <nav className="bg-blue-500 flex justify-between py-4 px-5 items-center">
              <div id="nav-links" className="[&>a]:nav-link [&>a]:font-light">
                <span className="text-xl font-semibold text-white mr-3">
                  {"NZKR Comm"}
                </span>
                <Link href={"/"} className="">
                  {"Home"}
                </Link>
                <Link href={"/community"}>{"Community"}</Link>
                <Link href={"/jobs"}>{"Jobs"}</Link>
                <Link href={"/market"}>{"Market"}</Link>
              </div>

              <div id="nav-user" className="flex justify-center">
                <SignedOut>
                  <Link href={"/sign-in"}>{"Sign In"}</Link>
                </SignedOut>
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </div>
            </nav>
          </header>
          <main className={`${notoSansKR.className} font-sans`}>
            {children}
          </main>
        </ClerkProvider>
      </body>
    </html>
  );
}
