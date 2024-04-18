import React from "react";

const AlphabetSidebar: React.FC<{ currentLetter: string }> = ({
  currentLetter,
}) => {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  return (
    <div className="absolute right-8 top-0 bottom-20 flex flex-col items-center justify-evenly">
      {alphabet.map((letter) => (
        <div
          key={letter}
          className={`text-xs ${
            currentLetter === letter
              ? "text-blue-500 font-bold"
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
