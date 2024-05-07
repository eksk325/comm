import React, { useEffect } from "react";
import Tag from "./Tag";
import tagList from "../constants/tagList";
import { useTagContext } from "../context/TagContext";

function TagChooser() {
  const { currentTag, setCurrentTag } = useTagContext();

  // useEffect(() => {
  //   setCurrentTag("");
  // }, []);

  const handleTagSelect = (tag: string) => {
    if (tag === currentTag) {
      setCurrentTag("");
    } else {
      setCurrentTag(tag);
    }
  };

  return (
    <div className="flex-center my-3">
      {tagList.map((tag, index) => (
        <div
          key={index}
          onClick={() => {
            handleTagSelect(tag);
          }}
        >
          <Tag tag={tag} isActive={currentTag === tag} />
        </div>
      ))}
    </div>
  );
}

export default TagChooser;
