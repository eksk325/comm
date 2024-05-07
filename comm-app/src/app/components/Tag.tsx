import React from "react";
import { useLanguageContext } from "../context/LanguageContext";
import { websiteText } from "../language/websiteText";

const Tag = ({ tag, isActive }: { tag: string; isActive: boolean }) => {
  const { language } = useLanguageContext();

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
