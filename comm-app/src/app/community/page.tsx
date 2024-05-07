"use client";

import React, { useEffect, useState } from "react";
import { PostListData } from "../types/types";
import TagChooser from "../components/TagChooser";
import getTimeAgo from "../helpers/getTimeAgo";
import { useRouter } from "next/navigation";
import { useTagContext } from "../context/TagContext";

import { useLanguageContext } from "../context/LanguageContext";
import { websiteText } from "../language/websiteText";

function Page() {
  const [posts, setPosts] = useState<PostListData[] | undefined>();
  const { currentTag, setCurrentTag } = useTagContext();
  const { language } = useLanguageContext();

  const router = useRouter();

  useEffect(() => {
    import("ldrs")
      .then((ldrs) => {
        ldrs.ring2.register();
      })
      .catch((error) => console.error("Failed to load ldrs", error));
  }, []);
  useEffect(() => {
    setCurrentTag("");

    const fetchPosts = async () => {
      const response = await fetch("/api/community/posts");
      const data = await response.json();

      const postDatas = [];

      for (let i = 0; i < data.length; i++) {
        const post = data[i];

        const newPost: PostListData = {
          id: post.id,
          title: post.title,
          tag: post.tag,
          username: post.username,
          timestamp: post.created_at,
          numLikes: post.likes.length,
        };

        postDatas.push(newPost);
      }

      setPosts(postDatas);
    };

    fetchPosts();
  }, [setCurrentTag]);

  if (posts !== undefined) {
    return (
      <div className="flex-center-col items-center">
        <div className="container">
          <TagChooser />
          <button
            onClick={() => router.push("/new-post/community")}
            className="no-border-button w-min whitespace-nowrap self-end mb-4 text-base"
          >
            {`+ ${websiteText.newPost[language]} `}
          </button>
          {posts.map((p, i) => {
            if (p.tag === currentTag || currentTag === "") {
              return (
                <div
                  key={i}
                  onClick={() => router.push(`/community/${p.id}`)}
                  className="hover:cursor-pointer hover:text-blue-900 transition-colors duration-300 mb-2"
                >
                  <div className="flex justify-between items-center">
                    <span>{p.title}</span>
                    <div className="flex text-sm">
                      <span className="">{`${p.username} (${getTimeAgo(
                        p.timestamp,
                        language
                      )})`}</span>
                      <div className="min-w-8 text-right">
                        <span className="text-rose-500 pr-1">{"♥"}</span>
                        <span>{p.numLikes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
    );
  } else {
    <div>
      <l-ring-2
        size="40"
        stroke="5"
        stroke-length="0.25"
        bg-opacity="0.1"
        speed="0.8"
        color="black"
      ></l-ring-2>
    </div>;
  }
}

export default Page;
