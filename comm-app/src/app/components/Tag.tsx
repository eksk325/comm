import React from "react";

const Tag = ({ tag, isActive }: { tag: string; isActive: boolean }) => {
  return (
    <div
      className={`community-tag ${
        isActive ? "tag-selected" : "tag-unselected"
      }`}
    >
      {tag}
    </div>
  );
};

export default Tag;
