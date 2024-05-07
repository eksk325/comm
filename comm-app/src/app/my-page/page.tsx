"use client";
import { useUser } from "@clerk/nextjs";
import React from "react";

import { useLanguageContext } from "../context/LanguageContext";
import Image from "next/image";

function Page() {
  const { user } = useUser();
  const { language, websiteText } = useLanguageContext();

  if (user) {
    return (
      <div className="flex-center-col items-center">
        <div className="container flex-row justify-start">
          <Image
            src={user.imageUrl}
            alt="User profile image"
            width={52}
            height={52}
            className="profile-img self-start"
          />
          <div className="flex flex-col">
            <span className="text-2xl font-normal">{user.username}</span>
            <span className="text-base font-light">
              {user.primaryEmailAddress?.toString() || ""}
            </span>
          </div>
        </div>
        <div className="">
          <span>{websiteText.myPosts[language]}</span>
        </div>
      </div>
    );
  }

  if (user === null) {
    return <div>Please log in to see your profile page.</div>;
  }
}

export default Page;
