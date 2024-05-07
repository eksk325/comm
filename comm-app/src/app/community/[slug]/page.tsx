"use client";
import { useUser } from "@clerk/nextjs";
import { Noto_Sans_JP } from "next/font/google";
import react, { useEffect, useState } from "react";
import CommentSection from "src/app/components/CommentSection";
import { usePostContext } from "src/app/context/PostContext";
import getTimeAgo from "src/app/helpers/getTimeAgo";
import { Post } from "src/app/types/types";
import { useLanguageContext } from "src/app/context/LanguageContext";
import { websiteText } from "src/app/language/websiteText";

const notoJP = Noto_Sans_JP({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

function Page({ params }: { params: { slug: number } }) {
  const [post, setPost] = useState<Post | undefined>();
  const { postReloadTrigger, setPostReloadTrigger } = usePostContext();

  const [isLiked, setIsLiked] = useState<boolean | null>(null);
  const [numLikes, setNumLikes] = useState<number>(0);

  const { user } = useUser();

  const { language } = useLanguageContext();

  useEffect(() => {
    const userId = user ? user.id : "";

    const fetchPost = async () => {
      console.log("Fetching post");
      const res = await fetch(`/api/community/post?postId=${params.slug}`);
      const data = await res.json();

      if (!data) {
        return;
      }

      const postResponse = data[0];

      if (postResponse.likes.includes(userId)) {
        setIsLiked(true);
      } else {
        setIsLiked(false);
      }

      setNumLikes(postResponse.likes.length);

      const postData: Post = {
        id: postResponse.id,
        title: postResponse.title,
        content: postResponse.content,
        likes: postResponse.likes,
        comments: postResponse.comments,
        tag: postResponse.tag,
        userId: postResponse.user_id,
        username: postResponse.username,
        timestamp: postResponse.created_at,
      };

      setPost(postData);
    };

    if (user !== undefined) {
      fetchPost();
    }
  }, [postReloadTrigger, user, params.slug]);

  const handleLikeClick = async () => {
    if (user === null) {
      return;
    }

    setIsLiked((prevState) => !prevState);

    const response = await fetch(
      `/api/community/post/like?postId=${post?.id}`,
      { method: "PATCH" }
    );

    if (response.ok) {
      setPostReloadTrigger((prevState) => !prevState);
    }
  };

  if (post) {
    return (
      <div className={`flex-center-col items-center ${notoJP.className}`}>
        <div className="container">
          <span className="text-sm text-center mb-5">{`< ${
            websiteText[post.tag][language]
          } >`}</span>
          <span className="text-2xl mb-2 font-medium">{post.title}</span>
          <span className="text-sm mb-3 ">
            {`${post.username} (${getTimeAgo(post.timestamp, language)})`}
          </span>

          <span className="text-sm py-3 w-full border-t-[1px] border-zinc-800 whitespace-pre-line	">
            {post.content}
          </span>
          <div className="flex-center-col text-center w-min p-2 self-center">
            <span
              onClick={() => handleLikeClick()}
              className={`text-2xl hover:cursor-pointer ${
                isLiked
                  ? "text-rose-500"
                  : "hover:text-rose-500 transition-colors duration-500"
              }`}
            >
              {`${isLiked ? "♥" : "♡"}`}
            </span>
            <span className="">{numLikes}</span>
          </div>
          <CommentSection postId={params.slug} />
        </div>
      </div>
    );
  }
}

export default Page;
