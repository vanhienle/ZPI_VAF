import React, { useState, useRef } from "react";
import "./Assistant.css";
import { HiArrowCircleRight } from "react-icons/hi";
import Typewriter from "./Typewriter";

const Assistant = () => {
  const scrollableChat = useRef(null);
  const scrollToBottom = () => {
    if (scrollableChat.current) {
      scrollableChat.current.scrollTop = scrollableChat.current.scrollHeight;
    }
  };

  const [loading, setLoading] = useState(false);
  const [isWriting, setIsWriting] = useState(false);

  const [userQuery, setUserQuery] = useState("");
  const handleUserQueryChange = (e) => {
    setUserQuery(e.target.value);
  };

  const handleQuerySubmit = (q) => {
    if (!loading && (q || userQuery)) {
      setMessages([
        ...messages,
        {
          user: q || userQuery,
          assistant:
            "I currently do not have answers to this question. I currently do not have answers to this question. I currently do not have answers to this question. I currently do not have answers to this question.",
        },
      ]);
      setUserQuery("");
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
      setTimeout(() => {
        scrollToBottom();
      }, 100);
    }
  };

  const suggestedQuestions = [
    "How can I get a PESEL number?",
    "Where can I find accomodation?",
    "What I need to study in Poland?",
    "Are are any student programs?",
  ];
  const [messages, setMessages] = useState([]);

  const helloMessage = `Hi, I am your intelligent assistant from Poland, happy to help.\nHere are some suggested questions:`;

  return (
    <div className="mx-auto h-screen">
      <div className="h-5/6 flex items-center flex-col bg-white shadow-lg rounded-lg pt-0 pb-0 m-2">
        <div
          ref={scrollableChat}
          className="w-full h-full overflow-auto px-60 max-sm:px-2"
        >
          <div className="flex gap-4 mt-4">
            <div className="flex-shrink-0 flex flex-col relative items-end">
              <div className="relative flex">
                <img
                  className="rounded-sm w-10"
                  alt="Assistant"
                  src="https://cdn-icons-png.flaticon.com/512/4616/4616271.png"
                />
              </div>
            </div>
            <div className="w-full">
              <div className="">
                <Typewriter
                  delay={15}
                  text={helloMessage}
                  scrollToBottom={scrollToBottom}
                  setIsWriting={setIsWriting}
                />
              </div>
              {!isWriting && (
                <div className="grid justify-items-stretch grid-cols-2 max-sm:grid-cols-1 place-items-center text-primary-900 mb-4">
                  {suggestedQuestions.map((question) => (
                    <button
                      className="ease-in-out duration-150 text-base border-solid border-2 border-accent-900 bg-accent-500 rounded-md hover:bg-accent-900 text-center p-2 m-2 h-20 max-sm:h-16"
                      onClick={() => {
                        handleQuerySubmit(question);
                      }}
                    >
                      {question}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          {messages.map((message, index) => (
            <>
              <div className="flex gap-4 mt-4">
                <div className="flex-shrink-0 flex flex-col relative items-end">
                  <div className="relative flex">
                    <img
                      className="rounded-sm w-10"
                      alt="User"
                      src="https://cdn-icons-png.flaticon.com/512/9131/9131529.png"
                    />
                  </div>
                </div>
                <div className="w-full bg-accent-500 shadow-md rounded-lg p-1">
                  <div className="">{message.user}</div>
                </div>
              </div>
              <div className="flex gap-4 my-4">
                <div className="flex-shrink-0 flex flex-col relative items-end">
                  <div className="relative flex">
                    <img
                      className="rounded-sm w-10"
                      alt="Assistant"
                      src="https://cdn-icons-png.flaticon.com/512/4616/4616271.png"
                    />
                  </div>
                </div>
                <div className="w-full">
                  {index + 1 === messages.length && loading ? (
                    <div className="spinner border-4 border-accent-500 border-t-4 border-t-accent-900 w-10 h-10 rounded-full"></div>
                  ) : (
                    <div className="mt-2">
                      <Typewriter
                        delay={15}
                        text={message.assistant}
                        scrollToBottom={scrollToBottom}
                        setIsWriting={() => {}}
                      />
                    </div>
                  )}
                </div>
              </div>
            </>
          ))}
        </div>
        <div className="flex w-full px-60 max-sm:px-2 py-6 bg-accent-500 ">
          <input
            className="w-full border-solid border border-text-color rounded-lg p-3"
            name="myInput"
            placeholder="Send a question..."
            value={userQuery}
            minLength={1}
            onChange={handleUserQueryChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleQuerySubmit();
              }
            }}
          />
          <HiArrowCircleRight
            className="cursor-pointer text-primary-900 hover:text-primary-500 transition-all duration-200 ease-in-out animate-fade-in"
            size={50}
            onClick={() => {
              handleQuerySubmit();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Assistant;
