import { async } from "@firebase/util";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import React, { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { ChatContext } from "../Context/ChatContext";
import { db, storage } from "../Firebase-config";
import { v4 as uuid } from "uuid";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useRef } from "react";

const Input = () => {
  const [text, setText] = useState("");
  const [imgLoader, setImgLoader] = useState(false);

  const [img, setImg] = useState(null);
  const { data } = useContext(ChatContext);
  const { currentUser } = useContext(AuthContext);
  const handleKey = (e) => {
    if (e.target.value !== "") {
      setText(e.target.value);
      e.code == "Enter" && handleSubmit();
    }
  };
  
  const handleSubmit = async () => {
  

    if (img) {
      setImgLoader(true);
      
      const storageRef = ref(storage,  uuid());
      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {

          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            //  console.log("File available at", downloadURL);
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
          setImgLoader(false);

        }
      );

    } else if (text) {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }
    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });
    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });
    setImg(null);
    setText("");
  };

  return (
    <div className="p-3 h-14 bg-slate-700 flex justify-between items-center border-slate-500 border-t-2 relative">
      {imgLoader && <div className=" text-slate-400 bg-slate-700 h-full w-full flex justify-center items-center text-xl absolute">
        <svg
          aria-hidden="true"
          role="status"
          class="inline w-7 h-7 mr-3 text-slate-600 animate-spin"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="#E5E7EB"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentColor"
          />
        </svg>
        Image uploading...
      </div>}
      <input
        type="text"
        name=""
        className="h-10 text-xl
       w-4/5 border-none outline-none bg-slate-700 text-white  "
        placeholder="Message"
        onChange={(e) => setText(e.target.value)}
        value={text}
        onKeyDown={handleKey}
      />
      <div className=" flex items-center gap-3  ">
        <input
          type="file"
          name=""
          id="file"
          style={{ display: "none" }}
          onChange={(e) => {
            setImg(e.target.files[0]);
          }}
          accept="image/*"
        />
        <label htmlFor="file">
          <img src="images/attachment.png" className="h-8" alt="" srcset="" />
        </label>
        <button
          type="submit"
          className="p-3 rounded-lg text-slate-300 bg-slate-800 focus:outline-none"
          onClick={handleSubmit}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Input;
