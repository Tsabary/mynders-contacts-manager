import React from "react";

const AlphabetSidebar: React.FC<{ currentLetter: string }> = ({
  currentLetter,
}) => {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#".split("");

  return (
    <div className="absolute z-50 right-8 md:!right-11 top-0 bottom-20 flex flex-col items-center justify-evenly">
      {alphabet.map((letter) => (
        <div
          key={letter}
          className={`text-xs transition-all ease-in-out ${
            currentLetter === letter
              ? "text-purple-500 font-bold text-base"
              : "text-gray-400"
          }`}
        >
          {letter}
        </div>
      ))}
    </div>
  );
};

export default AlphabetSidebar;
