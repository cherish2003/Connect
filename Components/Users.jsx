import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { db } from "../Firebase-config";
import { ChatContext } from "../Context/ChatContext";

const Users = () => {
  const [chats, setChats] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });
      return () => {
        unsub();
      };
    };
    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handlSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  return (
    <>
      <div className="h-full  w-full overflow-x-scroll no-scrollbar scroll-smooth flex flex-row md:h-4/5 md:flex-col ">
        {Object.entries(chats)
          ?.sort((a, b) => b[1].date - a[1].date)
          .map((chat) => (
            <div
              className="text-white flex flex-col items-center  gap-3 p-3  transition ease-in-out  hover:bg-slate-800 h-24  w-3/12 md:w-full  md:flex-row  "
              key={chat[0]}
              onClick={() => handlSelect(chat[1].userInfo)}
            >
              <img
                src={chat[1].userInfo.photoURL}
                className="h-12 w-12 shrink-0 md:h-16 md:w-16 rounded-full object-cover "
                alt=""
              />
              <div className="text-xs font-UbuTite text-white md:text-lg ">
                {chat[1].userInfo.displayName}
                <p className="invisible hidden md:visible  md:block text-xs opacity-70 text-slate-200 ">
                  {chat[1].lastMessage?.text}
                </p>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};
export default Users;

 