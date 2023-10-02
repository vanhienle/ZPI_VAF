import React from "react";
import { ChatList, Input } from "react-chat-elements";
import "./Assistant.css";
const Assistant = () => {
  return (
    <div className="chat-box">
      <ChatList
        className="chat-list"
        dataSource={[
          {
            avatar: "https://cdn-icons-png.flaticon.com/512/4712/4712109.png",
            alt: "assistant_avatar",
            title: "Assistant",
            subtitle: "How can I help you today?",
            date: new Date(),
            unread: 0,
          },
        ]}
      />
    </div>
  );
};

export default Assistant;
