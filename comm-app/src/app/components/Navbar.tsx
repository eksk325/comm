"use client";

import React, { use, useEffect } from "react";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import LanguagePicker from "./LanguagePicker";
import { useLanguageContext } from "../context/LanguageContext";

function Navbar() {
  const pathName = usePathname();

  // Helper function to determine if the link is active
  const isActive = (path: string) => (pathName === path ? "underline" : "");

  const { language, setLanguage, websiteText } = useLanguageContext();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userLanguage = localStorage.getItem("userLanguage");
      if (userLanguage) {
        setLanguage(userLanguage);
      } else if (userLanguage === "") {
        setLanguage("EN");
      }
    }
  }, [setLanguage]);

  useEffect(() => {
    localStorage.setItem("userLanguage", language);
  }, [language]);

  if (language) {
    return (
      <nav
        className={`sticky top-0 z-50 border-b-[1px] border-zinc-200 flex justify-between py-4 px-5 items-center bg-white`}
      >
        <div id="nav-links" className="[&>a]:nav-link [&>a]:font-normal flex">
          <span className="text-xl font-semibold text-zinc-900 mr-3">
            {"NZKR Comm ⊹ ࣪ ˖"}
          </span>
          <Link href={"/"} className={isActive("/")}>
            {websiteText.home[language]}
          </Link>
          <Link href={"/my-page"} className={isActive("/my-page")}>
            {websiteText.myPage[language]}
          </Link>
          <Link href={"/community"} className={isActive("/community")}>
            {websiteText.community[language]}
          </Link>
          <Link href={"/jobs"} className={isActive("/jobs")}>
            {websiteText.jobs[language]}
          </Link>
          <Link href={"/market"} className={isActive("/market")}>
            {websiteText.market[language]}
          </Link>
        </div>

        <div id="nav-user" className="flex justify-center">
          <SignedOut>
            <div className={`[&>a]:nav-link ${isActive("/sign-in")}`}>
              <Link href={"/sign-in"}>{"Sign In"}</Link>
            </div>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <LanguagePicker />
        </div>
      </nav>
    );
  }
}

export default Navbar;
