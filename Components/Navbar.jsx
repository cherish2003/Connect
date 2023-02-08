import { signOut } from "firebase/auth";
import React, { useContext } from "react";
import { auth } from "../Firebase-config";
import {AuthContext} from "../Context/AuthContext"

const Navbar = () => {
  const {currentUser}=useContext(AuthContext);
  // console.log(currentUser)


  return (
    <div className="h-20 bg-slate-800 flex items-center justify-around">
      <div className="flex justify-around items-center w-2/5 ">
        <img
          src={currentUser.photoURL}
          className="h-14 w-14 rounded-full object-cover "
          alt=""
        />
        <div className="ml-2 text-lg font-UbuTite font-bold text-center text-white">

          {currentUser.displayName}
        </div>
      </div>

      <button
        type="submit"
        className="p-3 bg-slate-700 text-white rounded-lg hover:bg-slate-900 transition ease-in-out delay-150 "
        onClick={() => signOut(auth)}
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
