import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../Context/ChatContext";
import { db } from "../Firebase-config";
import Message from "./Message";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);
  const defaultmsg=data.chatId;

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
    
      doc.exists() && setMessages(doc.data().messages);
    });


    return () => {
      unsub();
    };
  }, [data.chatId]);
//  console.log(messages.length)
  
  return (
    <>
      <div className="bg-slate-700 Msg overflow-scroll no-scrollbar ">
        {messages.map((m) => (
          <Message message={m} key={m.id} />
        ))}
        {messages.length == 0 && (
          <div
            className=" bg-slate-700 h-full
        flex justify-center items-center text-center text-slate-400 md:text-xl  flex-col"
          >
            No conversation found!
            <p>Search for users from the search bar</p>
            <div>
              {" "}
              if your viewing this website through moblie change to large screen
              device to enable search option
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Messages;
