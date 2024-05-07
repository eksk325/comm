"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

type LanguageContextType = {
  language: string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
  websiteText: { [key: string]: Translation };
};

type Translation = {
  EN: string;
  KR: string;
  [key: string]: string;
};

const LanguageContext = createContext<LanguageContextType>(
  undefined as unknown as LanguageContextType
);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState("");

  const websiteText: { [key: string]: Translation } = {
    study: {
      EN: "Study",
      KR: "공부",
    },
    food: {
      EN: "Food",
      KR: "음식",
    },
    anything: {
      EN: "Anything",
      KR: "아무거나",
    },
    games: {
      EN: "Games",
      KR: "게임",
    },
    school: {
      EN: "School",
      KR: "학교",
    },
    home: {
      EN: "Home",
      KR: "홈",
    },
    myPage: {
      EN: "My Page",
      KR: "마이 페이지",
    },
    community: {
      EN: "Community",
      KR: "커뮤니티",
    },
    jobs: {
      EN: "Jobs",
      KR: "일자리",
    },
    market: {
      EN: "Market",
      KR: "마켓",
    },
    newPost: {
      EN: "New Post",
      KR: "새 게시물",
    },
    title: {
      EN: "Title",
      KR: "제목",
    },
    content: {
      EN: "Content",
      KR: "내용",
    },
    publish: {
      EN: "Publish",
      KR: "등록",
    },
    enterComment: {
      EN: "Enter your comment...",
      KR: "댓글 입력...",
    },
    submit: {
      EN: "Submit",
      KR: "등록",
    },
    myPosts: {
      EN: "My Posts",
      KR: "내 게시물",
    },
    construction: {
      EN: "This page is currently under construction",
      KR: "이 페이지는 현재 공사중 입니다",
    },
  };
  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        websiteText,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguageContext = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error(
      "useLanguageContext must be used within a LanguageProvider"
    );
  }
  return context;
};
