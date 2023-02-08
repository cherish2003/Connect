import React, { useContext, useState } from "react";
import { db } from "../Firebase-config";
import { collection, query, where, getDoc,getDocs, setDoc, updateDoc,doc,serverTimestamp } from "firebase/firestore";
import { async } from "@firebase/util";
import { AuthContext } from "../Context/AuthContext";
import { ChatContext } from "../Context/ChatContext";

const Search = () => {
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);
  
  const [userName, setUserName] = useState("");
  const [err, setErr] = useState(false);
  const [user, setUser] = useState(null);

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", userName)
    );
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (er) {
      console.log(er);
      setErr(true);
      setUser(null);
    }
  };

  const handleSubmit = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async () => {
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;

    try{
      const res = await getDoc(doc(db, "users",combinedId) );
      if (!res.exists()) {


        await setDoc(doc(db, "chats", combinedId), { messages: [] });
  
        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
  
        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

      }



    }catch(err){
      console.log(err);
    }
  
    setUser(null);
    setUserName("");
  };
  const handleUser=(user)=>{
    dispatch({ type: "CHANGE_USER", payload:user  });
  }

  return (
    <>
      <div class="relative flex items-center w-full h-12  bg-slate-800 border-b-2 border-slate-500 rounded-sm  ">
        <div class="grid place-items-center h-full w-12 text-gray-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <input
          class="peer h-full w-full outline-none  bg-slate-800 text-sm text-gray-300 pr-2"
          type="text"
          id="search"
          placeholder="Search For Users"
          onChange={(e) => setUserName(e.target.value)}
          onKeyDown={handleSubmit}
          value={userName}
        />
      </div>
      {err && <span>User not found</span>}

      {user && (
        <div
          className="text-white flex flex-col items-center gap-3 p-3  transition ease-in-out hover:bg-slate-800 md:flex-row h-1/4 "
          onClick={()=>{handleSelect(); handleUser(user)}}
        >
          <img
            src={user.photoURL}
            className="h-14 w-14 md:h-16 md:w-16 rounded-full object-cover "
            alt=""
          />
          <div className="text-xs font-UbuTite text-white md:text-lg ">
            {user.displayName}
            
          </div>
        </div>
      )}
    </>
  );
};

export default Search;
