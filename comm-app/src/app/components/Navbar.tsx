"use client";
import React from "react";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

function Navbar() {
  const pathName = usePathname();

  // Helper function to determine if the link is active
  const isActive = (path: string) => (pathName === path ? "underline" : "");

  return (
    <nav className="sticky top-0 z-50 border-b-[1px] flex justify-between py-4 px-5 items-center">
      <div id="nav-links" className="[&>a]:nav-link [&>a]:font-light">
        <span className="text-xl font-semibold text-zinc-900 mr-3">
          {"NZKR Comm ⊹ ࣪ ˖"}
        </span>
        <Link href={"/"} className={isActive("/")}>
          {"Home"}
        </Link>
        <Link href={"/my-page"} className={isActive("/my-page")}>
          {"My Page"}
        </Link>
        <Link href={"/community"} className={isActive("/community")}>
          {"Community"}
        </Link>
        <Link href={"/jobs"} className={isActive("/jobs")}>
          {"Jobs"}
        </Link>
        <Link href={"/market"} className={isActive("/market")}>
          {"Market"}
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
      </div>
    </nav>
  );
}

export default Navbar;
