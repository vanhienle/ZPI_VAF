import React, { useState, useRef, useEffect, useCallback } from "react";
import "./Assistant.css";
import {
  HiArrowCircleRight,
  HiChevronUp,
  HiOutlineChevronDoubleDown,
} from "react-icons/hi";
import Typewriter from "./Typewriter";
import { getAnswer } from "../../utils/Assistant/getAnswer";
import {
  message,
  input,
  source_,
  questionList,
  languages,
  langDict,
} from "../../constants/assistant";
import { getTranslated } from "../../utils/Assistant/getTranslated";
import AudioRecorder from "./AudioRecorder";
const Assistant = () => {
  const questionNum = 4;
  const [language, setLanguage] = useState(
    localStorage.getItem("lang") || languages[0]
  );
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);
  const [helloMessage, setHelloMessage] = useState(message);
  const [promptInput, setPromptInput] = useState(input);
  const [sourceDisplay, setSourceDisplay] = useState(source_);
  const [suggestedQuestions, setSuggestedQuestions] = useState(questionList);
  const scrollableChat = useRef(null);
  const textareaRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [isWriting, setIsWriting] = useState(false);
  const [isAnswering, setIsAnswering] = useState(false);
  const [isRecognizing, setIsRecognizing] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [userQuery, setUserQuery] = useState("");
  const [delay, setDelay] = useState(30);
  const [messages, setMessages] = useState([]);
  const urlPattern = /(https?:\/\/\S+|www\.\S+)/gi;
  const domainPattern = /https?:\/\/([^\/\s]+)/;
  const menuRef = useRef();

  const scrollToBottom = () => {
    if (scrollableChat.current) {
      const { scrollTop, clientHeight, scrollHeight } = scrollableChat.current;
      if (scrollHeight - scrollTop - clientHeight < 50) {
        scrollableChat.current.scrollTo({
          top: scrollableChat.current.scrollHeight,
          behavior: "smooth",
        });
        //setIsAtBottom(true);
      } else {
        //setIsAtBottom(false);
      }
    }
  };

  const forceScrollToBottom = () => {
    if (scrollableChat.current) {
      scrollableChat.current.scrollTo({
        top: scrollableChat.current.scrollHeight,
        behavior: "smooth",
      });
      setIsAtBottom(true);
    }
  };

  const resizeTextarea = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
    }
  };

  const handleUserQueryChange = (e) => {
    setUserQuery(e.target.value);
    resizeTextarea();
  };

  const handleQuerySubmit = async (q) => {
    if (!loading && (q || userQuery)) {
      setMessages([
        ...messages,
        {
          role: "user",
          content: q || userQuery,
        },
        {
          role: "assistant",
          content: "",
        },
      ]);
      setUserQuery("");
      setLoading(true);
      setTimeout(() => {
        getAnswer([
          ...messages,
          {
            role: "user",
            content: q || userQuery,
          },
        ]).then((answer) => {
          setLoading(false);
          setMessages([
            ...messages,
            {
              role: "user",
              content: q || userQuery,
            },
            {
              role: "assistant",
              content: "" + answer.response,
              source: answer.source.match(urlPattern),
            },
          ]);
        });
      }, 100);
      setTimeout(() => {
        forceScrollToBottom();
      }, 50);
    }
  };

  const handleSetLanguage = async (language) => {
    setIsOpen(false);
    setLanguage(language);
    localStorage.setItem("lang", language);
  };

  const translateTexts = async () => {
    setPageLoading(true);
    const translatedMessage = await getTranslated({
      content: message,
      target_language: language,
    });
    const translatedPrompt = await getTranslated({
      content: input,
      target_language: language,
    });
    const translatedSource = await getTranslated({
      content: source_,
      target_language: language,
    });
    const promises = questionList.map(async (question) => {
      return await getTranslated({
        content: question,
        target_language: language,
      });
    });
    const translatedQuestions = await Promise.all(promises);
    setHelloMessage(translatedMessage);
    setPromptInput(translatedPrompt);
    setSourceDisplay(translatedSource);
    setSuggestedQuestions(translatedQuestions);
    setMessages([]);
    setPageLoading(false);
  };

  const handleOutsideClick = useCallback(
    (e) => {
      if (isOpen && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    },
    [isOpen]
  );

  useEffect(() => {
    translateTexts();
    setIsAtBottom(true);
  }, [language]);

  useEffect(() => {
    const interval = setInterval(() => {
      const speeds = [30];
      setDelay(speeds[Math.floor(Math.random() * speeds.length)]);
    }, 2000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [handleOutsideClick]);

  const handleScroll = useCallback(() => {
    const { scrollTop, clientHeight, scrollHeight } = scrollableChat.current;
    if (scrollHeight - scrollTop - clientHeight < 80) {
      setIsAtBottom(true);
    } else {
      setIsAtBottom(false);
    }
  }, []);

  useEffect(() => {
    const div = scrollableChat.current;
    if (div) {
      div.addEventListener("scroll", handleScroll);
      return () => div.removeEventListener("scroll", handleScroll);
    }
  }, [scrollableChat.current]);

  useEffect(() => {
    if (scrollableChat.current) {
      if (isAnswering) {
        let interval;
        interval = setInterval(scrollToBottom, 500);
        return () => {
          if (interval) {
            clearInterval(interval);
          }
        };
      } else {
        forceScrollToBottom();
      }
    }
  }, [isAnswering, scrollableChat.current]);

  // useEffect(() => {
  //   if (pageLoading === false) {
  //     setPageLoading(true);
  //   }
  // }, [pageLoading]);
  return (
    <div className="mx-auto h-[85vh]">
      {pageLoading ? (
        <div className="flex items-center justify-center h-[40vh]">
          <div className="spinner border-4 border-accent-500 border-t-4 border-t-accent-900 w-20 h-20 rounded-full mx-auto"></div>
        </div>
      ) : (
        <div className="h-full flex items-center flex-col bg-white shadow-lg rounded-lg pt-0 pb-0">
          <div
            ref={scrollableChat}
            className="w-full h-full overflow-auto px-60 max-2xl:px-15 max-xl:px-10 max-lg:px-2"
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
                <div>
                  <Typewriter
                    delay={30}
                    text={helloMessage}
                    setIsWriting={setIsWriting}
                  />
                </div>
                {!isWriting && (
                  <div className="">
                    <div className="grid justify-items-stretch grid-cols-2 max-sm:grid-cols-1 place-items-center text-primary-900">
                      {suggestedQuestions.map(
                        (question, index) =>
                          index < questionNum && (
                            <button
                              className="ease-in-out duration-150 text-base border-solid border-2 border-accent-900 bg-accent-500 rounded-md hover:bg-accent-900 text-center m-2 h-16 max-sm:h-14 animate-fade-in"
                              onClick={() => {
                                handleQuerySubmit(question);
                              }}
                            >
                              {question}
                            </button>
                          )
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
            {messages.map(({ role, content, source }, index) => (
              <div>
                {role === "user" && (
                  <div className="flex gap-4 mt-8">
                    <div className="flex-shrink-0 flex flex-col relative items-end">
                      <div className="relative flex">
                        <img
                          className="rounded-sm w-10"
                          alt="User"
                          src="https://cdn-icons-png.flaticon.com/512/9131/9131529.png"
                        />
                      </div>
                    </div>
                    <div className="flex items-center w-full bg-accent-500 shadow-md rounded-lg">
                      <div className="m-2">{content}</div>
                    </div>
                  </div>
                )}
                {role === "assistant" && (
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
                        <div className="">
                          <Typewriter
                            delay={delay}
                            text={content}
                            setIsWriting={setIsAnswering}
                          />
                          {source !== undefined &&
                            source !== null &&
                            (index + 1 !== messages.length || !isAnswering) && (
                              <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5 mt-4">
                                <div className="text-accent-700">
                                  {sourceDisplay}
                                </div>
                                {source.map((link, index) => (
                                  <a
                                    className="flex items-center gap-2 rounded-lg border border-accent-900 hover:border-accent-700 bg-background-color px-2 py-1.5 leading-none"
                                    href={link}
                                    target="_blank"
                                  >
                                    <img
                                      class="h-3.5 w-3.5 rounded"
                                      src={
                                        "https://www.google.com/s2/favicons?sz=64&domain_url=" +
                                        link.match(domainPattern)[1]
                                      }
                                      alt="Study In Poland"
                                    ></img>
                                    <div>{link.match(domainPattern)[1]}</div>
                                  </a>
                                ))}
                              </div>
                            )}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
            <div className="flex h-[17vh]" />
          </div>
        </div>
      )}
      {!isAtBottom && (
        <button className="absolute flex p-2 rounded-full border bg-background-color shadow-md transition-all hover:bg-accent-500 border-accent-700 shadow-accent-900 bottom-36 right-20 max-xl:right-5">
          <HiOutlineChevronDoubleDown
            className="text-accent-700 m-auto"
            size={30}
            onClick={() => {
              forceScrollToBottom();
            }}
          />
        </button>
      )}

      <div className="fixed bottom-0 flex w-full px-60 max-2xl:px-15 max-xl:px-10 max-lg:px-2 py-4 bg-accent-500">
        <div className="w-full flex border-solid border border-text-color bg-background-color rounded-lg p-3">
          <textarea
            ref={textareaRef}
            className="flex-1 border-0 outline-none resize-none overflow-hidden"
            rows={1}
            name="myInput"
            placeholder={pageLoading ? "" : promptInput}
            value={userQuery}
            minLength={1}
            onChange={handleUserQueryChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (e.shiftKey) {
                  resizeTextarea();
                } else {
                  handleQuerySubmit();
                }
              }
            }}
          />
          {isRecognizing ? (
            <div className="flex items-center justify-center h-full">
              <div className="spinner border-4 border-accent-500 border-t-4 border-t-accent-900 w-6 h-6 rounded-full mx-auto"></div>
            </div>
          ) : (
            <AudioRecorder
              handleQuerySubmit={handleQuerySubmit}
              setIsRecognizing={setIsRecognizing}
            />
          )}
        </div>

        <div ref={menuRef} className="relative inline-block">
          <div>
            <button
              type="button"
              className="inline-flex justify-center p-3"
              onClick={toggleDropdown}
            >
              <img
                src={langDict[language][0]}
                className="w-6 max-lg:w-6 max-md:w-6 mr-1"
                alt="Logo"
              />
              <HiChevronUp
                className="w-10 cursor-pointer text-primary-900 hover:text-primary-500 transition-all duration-200 ease-in-out animate-fade-in"
                size={20}
              />
            </button>
          </div>

          {isOpen && (
            <div className="absolute right-0 bottom-16 mb-1 w-36 bg-background-color border divide-y divide-primary-500 rounded-md ring-1 ring-black ring-opacity-5">
              {languages.map((lang) => (
                <div>
                  <button
                    type="button"
                    className="p-2 flex items-center justify-start w-full hover:bg-accent-500"
                    onClick={() => handleSetLanguage(lang)}
                  >
                    <img
                      src={langDict[lang][0]}
                      className="w-6 max-lg:w-6 max-md:w-6 mr-2"
                      alt="Logo"
                    />
                    <p>{langDict[lang][1]}</p>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        <HiArrowCircleRight
          className="cursor-pointer text-primary-900 hover:text-primary-500 transition-all duration-200 ease-in-out animate-fade-in"
          size={50}
          onClick={() => {
            handleQuerySubmit();
          }}
        />
      </div>
    </div>
  );
};

export default Assistant;
