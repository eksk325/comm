"use client";
import { Noto_Sans_JP } from "next/font/google";
import react, { useEffect, useState } from "react";
import { Post } from "src/app/types/types";

const notoJP = Noto_Sans_JP({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

function Page({ params }: { params: { slug: string } }) {
  const [post, setPost] = useState<Post | undefined>();
  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch(`/api/community/post?postId=${params.slug}`);
      const data = await res.json();

      if (!data) {
        return;
      }

      const postResponse = data[0];

      const postData: Post = {
        id: postResponse.id,
        title: postResponse.title,
        content: postResponse.content,
        likes: postResponse.likes,
        comments: postResponse.comments,
        tag: postResponse.tag,
        userId: postResponse.user_id,
        timestamp: postResponse.created_at,
      };

      setPost(postData);
    };

    fetchPost();
  }, []);

  if (post) {
    return (
      <div className={`${notoJP.className}`}>
        <div className="w-3/5 flex flex-col justify-center items-center border-[1.5px] rounded-3xl p-10 mb-[150px] font-light">
          <span className="text-2xl">{post.title}</span>
          <span>{post.tag}</span>
          <span>{post.content}</span>
        </div>
      </div>
    );
  }
}

export default Page;
