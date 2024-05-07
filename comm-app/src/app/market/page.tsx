"use client";
import React from "react";
import { useLanguageContext } from "../context/LanguageContext";
import { websiteText } from "../language/websiteText";
import Image from "next/image";

function Page() {
  const { language } = useLanguageContext();
  return (
    <div className="flex-center-col items-center mt-20">
      <Image
        src="/under-construction.jpg"
        width={200}
        height={200}
        alt="Page under construction"
      />
      <span className="font-normal text-xl">
        {websiteText.construction[language]}
      </span>
    </div>
  );
}

export default Page;
