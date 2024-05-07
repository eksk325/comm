import React from "react";
import { useLanguageContext } from "../context/LanguageContext";

const Tag = ({ tag, isActive }: { tag: string; isActive: boolean }) => {
  const { language, websiteText } = useLanguageContext();

  return (
    <div
      className={`community-tag ${
        isActive ? "tag-selected" : "tag-unselected"
      }`}
    >
      {websiteText[tag][language]}
    </div>
  );
};

export default Tag;
