import React, { useState, useEffect } from "react";

const Typewriter = ({ text, delay, scrollToBottom, setIsWriting }) => {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLink, setIsLink] = useState(0);

  useEffect(() => {
    if (text[currentIndex] === "*") {
      setIsLink((value) => 1 - value);
      setCurrentText((text) => text.replace("*", ""));
    }
    if (isLink === 1) {
      delay = 0;
    }
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
  return (
    <div
      className="whitespace-pre-line"
      dangerouslySetInnerHTML={{ __html: currentText.replace("*", "") }}
    />
  );
};

export default Typewriter;
