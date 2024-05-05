"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type TagContextType = {
  currentTag: string;
  setCurrentTag: React.Dispatch<React.SetStateAction<string>>;
};

const TagContext = createContext<TagContextType>(
  undefined as unknown as TagContextType
);

export const TagProvider = ({ children }: { children: ReactNode }) => {
  const [currentTag, setCurrentTag] = useState<string>("");

  return (
    <TagContext.Provider value={{ currentTag, setCurrentTag }}>
      {children}
    </TagContext.Provider>
  );
};

export const useTagContext = (): TagContextType => {
  const context = useContext(TagContext);
  if (!context) {
    throw new Error("useTagContext must be used within a TagProvider");
  }
  return context;
};
