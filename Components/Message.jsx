import React, { useContext,useRef,useEffect } from 'react'
import { AuthContext } from '../Context/AuthContext';
import { ChatContext } from '../Context/ChatContext';

const Message = ({message}) => {

    const { data } = useContext(ChatContext);
    const{currentUser}=useContext(AuthContext);
      const ref = useRef();
       useEffect(() => {
         ref.current?.scrollIntoView({ behavior: "smooth" });
       }, [message]);
  return (
    <div
      ref={ref}
      className={`flex  mb-5 ml-3 mt-2 items-start gap-5  ${
        message.senderId === currentUser.uid && "Reciever"
      }`}
    >
      <div className="flex flex-col  text-gray-400 justify-around gap-2 ">
        <img
          src={
            message.senderId == currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
          className="h-10 w-10 rounded-full object-cover"
        />
        <span>just now</span>
      </div>
      {message.text && (
        <p className="bg-slate-600 text-white py-3 px-5  rounded-md">
          {message.text}
        </p>
      )}

      {message.img && (
        <img
          src={message.img}
          alt=""
          className="w-1/2  flex flex-col items-start  md:items-end "
        />
        // </div>
      )}
    </div>
  );
}

export default Message