"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

type PostContextType = {
  postIsLoading: boolean;
  setPostIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  postReloadTrigger: boolean;
  setPostReloadTrigger: React.Dispatch<React.SetStateAction<boolean>>;
};

const PostContext = createContext<PostContextType>(
  undefined as unknown as PostContextType
);

export const PostProvider = ({ children }: { children: ReactNode }) => {
  const [postIsLoading, setPostIsLoading] = useState(true);
  const [postReloadTrigger, setPostReloadTrigger] = useState(true);

  useEffect(() => {}, []);

  return (
    <PostContext.Provider
      value={{
        postIsLoading,
        setPostIsLoading,
        postReloadTrigger,
        setPostReloadTrigger,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export const usePostContext = (): PostContextType => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error("usePostContext must be used within a PostProvider");
  }
  return context;
};
