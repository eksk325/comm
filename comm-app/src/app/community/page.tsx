"use client";

import React, { useEffect, useState } from "react";
import { PostListData } from "../types/types";

function Page() {
  const [posts, setPosts] = useState<PostListData[] | undefined>();

  useEffect(() => {
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
  }, []);

  if (posts) {
    return (
      <div>
        <div>
          {posts.map((p) => (
            <div>
              <span>{p.title}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Page;
