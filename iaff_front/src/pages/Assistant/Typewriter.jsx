import React, { useState, useEffect } from "react";

const Typewriter = ({ text, delay, scrollToBottom, setIsWriting }) => {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    if (currentIndex < text.length) {
      setIsWriting(true);
      const timeout = setTimeout(() => {
        scrollToBottom();
        setCurrentText((prevText) => prevText + text[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, delay);

      return () => clearTimeout(timeout);
    } else {
      setIsWriting(false);
    }
  }, [currentIndex, delay, text, scrollToBottom, setIsWriting]);
  return <div className="whitespace-pre-line">{currentText}</div>;
};

export default Typewriter;
