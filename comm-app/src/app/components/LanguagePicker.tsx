import React, { useEffect, useRef, useState } from "react";
import { useLanguageContext } from "../context/LanguageContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

const flags: { [key: string]: string } = {
  EN: "🇳🇿",
  KR: "🇰🇷",
};

function LanguagePicker() {
  const { language, setLanguage } = useLanguageContext();
  const [isOpen, setIsOpen] = useState(false);

  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="dark-border hover:cursor-pointer relative left-0 text-sm ml-2 h-7"
      onClick={() => setIsOpen((prevState) => !prevState)}
      ref={pickerRef}
    >
      <div className="px-3 pt-[2px]">
        <span className="hover:bg-zinc-100">{`${flags[language]} ${language}`}</span>
        <FontAwesomeIcon icon={faCaretDown} className="ml-2" />
      </div>
      {isOpen ? (
        <div className="flex-center-col absolute bg-white w-full dark-border top-8">
          <span
            onClick={() => setLanguage("EN")}
            className="hover:bg-zinc-100 pl-3 py-1"
          >{`${flags.EN} EN`}</span>
          <span
            onClick={() => setLanguage("KR")}
            className="hover:bg-zinc-100 pl-3 py-1"
          >{`${flags.KR} KR`}</span>
        </div>
      ) : null}
    </div>
  );
}

export default LanguagePicker;
