"use client";
import { SignedIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import TagChooser from "src/app/components/TagChooser";
import { useTagContext } from "src/app/context/TagContext";
import { useLanguageContext } from "src/app/context/LanguageContext";

function Page() {
  const { currentTag } = useTagContext();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const router = useRouter();

  const { language, websiteText } = useLanguageContext();

  const handleCreatePost = async () => {
    if (title.trim() === "" || content.trim() === "") {
      alert("Title and content cannot be empty.");
      return;
    }
    try {
      const response = await fetch("/api/community/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
          tag: currentTag,
        }),
      });

      if (!response.ok) {
        console.error("Failed to create post!");
      } else {
        router.push("/community");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <SignedIn>
      <div className="flex-center">
        <div className="container">
          <TagChooser />

          <label>{websiteText.title[language]}</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="dark-border focus-blue-border p-1 font-normal text-sm"
          ></input>
          <label className="mt-5">{websiteText.content[language]}</label>
          <textarea
            spellCheck={false}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="dark-border focus-blue-border resize-none p-1 text-sm h-64"
          ></textarea>
          <button
            className="grey-button mt-4 self-end"
            onClick={() => handleCreatePost()}
          >
            {websiteText.publish[language].toUpperCase()}
          </button>
        </div>
      </div>
    </SignedIn>
  );
}

export default Page;
