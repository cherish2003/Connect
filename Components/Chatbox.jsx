import React, { useContext } from 'react'
import Input from './Input'
import Messages from './Messages'
import { ChatContext } from '../Context/ChatContext';

const Chatbox = () => {
    const { data } = useContext(ChatContext); 
    const dummytext="No user selected"
  return (
    <>
      <div className=" border-t-2 md:border-l-2 border-slate-500 flex-1 h-3  md:h-full  ">
        <div className="bg-slate-800 h-20 flex items-center justify-start">
          <div className="text-white font-UbuTite text-xl p-3">
            {data.user?.displayName || dummytext}
          </div>
        </div>
        <Messages></Messages>
        <Input></Input>
      </div>
    </>
  );
}

export default Chatbox