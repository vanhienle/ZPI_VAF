import React, { useState, useEffect } from "react";

const Typewriter = ({ text, delay, setIsWriting }) => {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (text[currentIndex] !== " ") {
      delay = 0;
    }
    if (currentIndex < text.length) {
      setIsWriting(true);
      const timeout = setTimeout(() => {
        setCurrentText((prevText) => prevText + text[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, delay);

      return () => {
        clearTimeout(timeout);
      };
    } else {
      setIsWriting(false);
    }
  }, [currentIndex, delay, text, setIsWriting]);

  return (
    <div
      className="whitespace-pre-line"
      dangerouslySetInnerHTML={{ __html: currentText }}
    />
  );
};

export default Typewriter;
