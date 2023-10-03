import React, { useState } from "react";
import { MessageList, Input, Button } from "react-chat-elements";
import { HiOutlineMenu } from "react-icons/hi";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import "./Assistant.css";

const Assistant = () => {
  const [toggleHistory, setToggleHistory] = useState(false);

  return (
    <>
      <div className="chat-container">
        {toggleHistory && (
          <div className="history-box">
            <p className="text-center">CHAT HISTORY</p>
          </div>
        )}
        {toggleHistory ? (
          <HiOutlineMenuAlt3
            className="text-primary-900 hover:text-primary-500"
            size={37}
            onClick={() => setToggleHistory(false)}
          />
        ) : (
          <HiOutlineMenu
            className="text-primary-900 hover:text-primary-500"
            size={37}
            onClick={() => setToggleHistory(true)}
          />
        )}

        <div className={`chat-area-${toggleHistory ? "cut" : "full"}`}>
          <div className="chat-box">
            <MessageList
              className="message-list"
              lockable={true}
              toBottomHeight={"100%"}
              dataSource={[
                {
                  position: "left",
                  type: "text",
                  avatar:
                    "https://cdn-icons-png.flaticon.com/512/4712/4712109.png",
                  title: "Assistant",
                  text: "How can I help you today?",
                },
                {
                  position: "right",
                  type: "text",
                  title: "Emre",
                  text: "Hello, I would like to know more about Poland",
                },
              ]}
            />
          </div>
          <div className="input-box">
            <Input
              className="input-bar"
              placeholder="Type here..."
              multiline={false}
              rightButtons={
                <Button
                  text={"Send"}
                  onClick={() => alert("Sending...")}
                  title="Send"
                />
              }
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Assistant;
