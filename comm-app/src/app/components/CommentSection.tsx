"use client";

import React, { useEffect, useState } from "react";
import { Comment } from "../types/types";
import { useUserContext } from "../context/UserContext";
import getTimeAgo from "../helpers/getTimeAgo";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useLanguageContext } from "../context/LanguageContext";
import Image from "next/image";

function CommentSection({ postId }: { postId: number }) {
  const { userImg } = useUserContext();

  const [currentComment, setCurrentComment] = useState<string>("");
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [finalComments, setFinalComments] = useState<Comment[]>([]);

  const [reloadTrigger, setReloadTrigger] = useState(true);

  const { user } = useUser();
  const router = useRouter();
  const { language, websiteText } = useLanguageContext();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`/api/community/comment?postId=${postId}`);
        const comments = await response.json();

        if (!response.ok) {
          throw new Error();
        }

        const parsedComments = [];

        for (let i = 0; i < comments.length; i++) {
          const c = comments[i];

          const response = await fetch(`/api/clerk/user?userId=${c.user_id}`);
          const user = await response.json();

          const comment: Comment = {
            id: c.id,
            username: user.username,
            userImg: user.image,
            postId: c.post_id,
            text: c.text,
            replyingTo: c.replying_to,
            timestamp: c.created_at,
          };

          parsedComments.push(comment);
        }

        setFinalComments(parsedComments);
      } catch (err) {
        console.error("Failed to submit comment");
      }
    };

    fetchComments();
  }, [reloadTrigger, postId]);

  const handleSubmitComment = async () => {
    try {
      const response = await fetch("/api/community/comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId,
          text: currentComment,
          replyingTo,
          userImg,
        }),
      });

      if (!response.ok) {
        throw new Error();
      } else {
        setCurrentComment("");
        setReloadTrigger((prevState) => !prevState);
      }
    } catch (err) {
      console.error("Failed to submit comment");
    }
  };

  if (user !== undefined) {
    return (
      <div>
        <div className="flex w-full items-start mt-4">
          {user === null ? null : (
            <Image
              src={userImg}
              alt={"Current user's profile image"}
              width={32}
              height={32}
              className="profile-img"
            />
          )}

          <div className="flex flex-col dark-border grow h-28">
            {user === null ? (
              <div className="grow text-center text-sm flex-center-col items-center">
                <span>{"You must sign in to comment on this post"}</span>
                <button
                  className="grey-button w-24 mt-2"
                  onClick={() => router.push("/sign-in")}
                >
                  {"SIGN IN"}
                </button>
              </div>
            ) : (
              <div className="flex flex-col">
                <textarea
                  placeholder={websiteText.enterComment[language]}
                  spellCheck={false}
                  className="resize-none w-full focus:outline-none p-2 text-sm grow"
                  onChange={(e) => setCurrentComment(e.target.value)}
                  value={currentComment}
                ></textarea>
                <button
                  className={`grey-button self-end mr-2 my-2 w-auto`}
                  onClick={() => handleSubmitComment()}
                >
                  {websiteText.submit[language]}
                </button>
              </div>
            )}
          </div>
        </div>
        {finalComments.map((c, i) => (
          <div key={i} className="flex my-6 items-start text-sm">
            <Image
              src={c.userImg}
              alt="Comment user's profile picture"
              width={32}
              height={32}
              className="profile-img"
            />
            <div>
              <div className="flex items-center">
                <span className="font-medium">{c.username}</span>
                <span className="ml-1 text-xs">{`(${getTimeAgo(
                  c.timestamp,
                  language
                )})`}</span>
              </div>
              <span>{c.text}</span>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default CommentSection;
