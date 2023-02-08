import { async } from "@firebase/util";
import { signInWithEmailAndPassword,sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import { auth } from "../Firebase-config";
export default function Login() {
  const [err, setErr] = useState(false);
  const [errmsg, setErrormsg] = useState("");
  const [email, setEmail] = useState()
  const [reserpwdmsg, setReserpwdmsg] = useState("");
  const navigate =useNavigate();
const handleReset=()=>{
  console.log("Reset:",email)
  sendPasswordResetEmail(auth, email)
    .then(() => {
      console.log("Password reset email sent!");
      // ..
    })
    .catch((error) => {
      console.log(error)
      // ..
    });
    
  console.log("reset")
}  
  const handleSubmit = async (e) => {
    setErr(false); 
    e.preventDefault();
    const userMail = e.target[0].value;
    setEmail(userMail);
    const password = e.target[1].value;
    // console.log(userMail, password);
    if (
      (!userMail && !password) ||
      !userMail ||
      !password
    ) {
      setErrormsg("Input field required ");
      setErr(true);
    }else{
     try {
        await signInWithEmailAndPassword(auth,userMail,password)
        console.log("LOGIN SUCESS");
        navigate("/Mainpage")
        navigate(0);
        setErr(false);
      } catch (err) {
        setErrormsg("Invalid credentials");
        console.log(err);
        setErr(true);
      }
      
    }
  
  };
  


  return (
    <>
      <div className="bg-white h-full ">
        {/* Title and button */}
        <Header></Header>

        <div className=" text-2xl sm:text-4xl md:text-4xl font-UbuTite  py-5 text-center">
          A Private Multi Chat Messenger
        </div>
        <div className=" flex flex-col px-3 py-10 sm:px-6 sm:py-16  justify-around items-center lg:flex-row-reverse lg:justify-evenly">
          <img
            class="h-80 mt-3 md:mt-5 sm:h-96 md:h-102 max-w-lg  "
            src="images/sideimg.svg"
            alt=""
          />

          <div className=" mt-10 w-full sm:mt-12 sm:w-3/4 lg:w-1/3 max-w-xl relative">
            <div class="px-10 pt-4 pb-10 rounded-tr-4xl ">
              <h1 class="text-2xl font-UbuTite text-gray-900 sm:text-3xl">
                Welcome
              </h1>
              <div className="font-UbuTite opacity-50 text-xs">
                Please enter your details to login
              </div>
              <form
                class="mt-12"
                action=""
                method="POST"
                onSubmit={handleSubmit}
              >
                <div class="relative">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    class="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-black"
                    placeholder="Cherish@420"
                  />
                  <label
                    for="email"
                    class="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    User Email
                  </label>
                </div>
                <div class="mt-10 relative">
                  <input
                    id="password"
                    type="password"
                    name="password"
                    class="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-black"
                    placeholder="Password"
                  />
                  <label
                    for="password"
                    class="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-black peer-focus:text-sm"
                  >
                    Password
                  </label>
                </div>
                <button
                  className="mt-20 font-UbuTite px-4 py-2 rounded bg-black text-white font-semibold text-center block w-full focus:outline-none  cursor-pointer  "
                  type="submit"
                  onSubmit={(e) => handleSubmit(e)}
                >
                  Login
                </button>

                <div className="mt-2 text-sm flex justify-evenly  shrink-0">
                  <div className="">
                    <button type="submit" className="underline" onClick={handleReset}>
                      Reset passsword
                    </button>
                  </div>
                  <div>
                    <Link
                      className="underline text text-black "
                      to="/Register "
                    >
                      Register
                    </Link>
                  </div>
                </div>
                <div></div>
              </form>
            </div>
            {/* extra div for showing error messages */}
            {err && (
              <div className=" absolute flex justify-end  items-center font-MainTitle text-red-700 rounded-sm text-center top-0 right-0 h-10 w-full md:w-2/5 text-sm  ">
                {errmsg}
                <div className="animate-bounce m-2">
                  <img src="images/error.svg" className="h-3 md:h-5" alt="" />
                </div>
              </div>
            )}
            {}
          </div>
        </div>
        {/* Footer */}
        <Footer></Footer>
      </div>
    </>
  );
}
