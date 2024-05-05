"use client";
import { SignedIn } from "@clerk/nextjs";
import React, { useState } from "react";
import TagChooser from "src/app/components/TagChooser";
import { useTagContext } from "src/app/context/TagContext";

function Page() {
  const { currentTag } = useTagContext();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleCreatePost = async () => {
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

          <label>{"Title"}</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="dark-border focus-blue-border p-1 font-normal text-sm"
          ></input>
          <label className="mt-5">{"Text"}</label>
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
            {"PUBLISH"}
          </button>
        </div>
      </div>
    </SignedIn>
  );
}

export default Page;
