import { async } from "@firebase/util";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import { auth, db, storage } from "../Firebase-config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";

export default function Register() {
  const [image, setImage] = useState(null);
  const [err, setErr] = useState(false);
  const [errmsg, setErrormsg] = useState("");
  const [propic, setPropic] = useState(true);
  const [regpage, setRegpage] = useState(true);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const onImagechange = (e) => {
    setImage(null);
    setPropic(true);
    // console.log("hello");
    setImage(URL.createObjectURL(e.target.files[0]));
    setPropic(false);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userName = e.target[0].value;
    const userMail = e.target[1].value;
    const password = e.target[2].value;
    const ImageFile = e.target[3].files[0];
  

    if (
      (!userName && !userMail && !password && ImageFile == undefined) ||
      !userName ||
      !userMail ||
      !password ||
      ImageFile == undefined
    ) {
      setErrormsg("Input field required ");
      setErr(true);
    } else {
      try { 
        setRegpage(false);
        setLoading(true);
        const res = await createUserWithEmailAndPassword(
          auth,
          userMail,
          password
        );
        const date = new Date().getTime();
        const storageRef = ref(storage, `${userName + date}`);
        await uploadBytesResumable(storageRef, ImageFile).then(() => {
          getDownloadURL(storageRef).then(async (downloadURL) => {
            try {
              await updateProfile(res.user, {
                displayName: userName,
                photoURL: downloadURL,
              });
              await setDoc(doc(db, "users", res.user.uid), {
                uid: res.user.uid,
                displayName: userName,
                userMail,
                photoURL: downloadURL,
              });
              await setDoc(doc(db, "userChats", res.user.uid), {});
              navigate("/MainPage");
              navigate(0);
            } catch (err) {
              console.log("Error :", err);
            }
          });
        });

        console.log("DATA UPLOADED");
        setErr(false);
      } catch (err) {
        console.log(err);
        navigate('/')
        setLoading(false);
        setErr(true);

        setErrormsg("Something Went wrong");
      }
    }

    // console.log(userName,userMail,password);
  };

  return (
    <>
      {loading && (
        <div className=" text-black h-screen flex justify-center items-center text-xl ">
          <svg
            aria-hidden="true"
            role="status"
            class="inline w-7 h-7 mr-3 text-black animate-spin"
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
          Loading...
        </div>
      )}

      {regpage && (
        <div className="bg-white h-screen scroll-smooth  ">
          <Header></Header>
          <div className="flex justify-center items-center  ">
            <div class=" bg-white rounded-lg mt-16 sm:w-full sm:max-w-md xl:p-0  ">
              <div class="p-6 space-y-4 md:space-y-10 sm:p-8 relative">
                <h1 class="text-xl font-roboFont leading-tight tracking-tight text-gray-900 md:text-2xl ">
                  Register Now!
                </h1>
                {err && (
                  <span className=" absolute right-5 text-red-600 ">
                    {errmsg} <span className="animate-pulse">!</span>
                  </span>
                )}

                <form class="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                  <div>
                    <label
                      for="username"
                      class="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Username
                    </label>
                    <input
                      type="text"
                      name="username"
                      class="bg-gray-100 border
                       border-gray-100 text-black sm:text-sm rounded-lg block w-full p-2.5 focus:outline-none "
                      placeholder="Username"
                      required=""
                    />
                  </div>
                  <div>
                    <label
                      for="useremail"
                      class="block mb-2 text-sm font-medium text-black "
                    >
                      Useremail
                    </label>
                    <input
                      type="email"
                      name="useremail"
                      id="password"
                      placeholder="user@email.com"
                      class="bg-gray-100 border border-gray-100 text-gray-900 sm:text-sm rounded-lg focus:outline-none block w-full p-2.5"
                      required=""
                    />
                  </div>
                  <div>
                    <label
                      for="password"
                      class="block mb-2 text-sm font-medium text-black"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id=""
                      placeholder="minimum six characters"
                      class="bg-gray-100 border border-gray-100 text-black sm:text-sm rounded-lg focus:outline-none block w-full p-2.5"
                      required=""
                    />
                  </div>
                  <div className=" flex flex-col justify-center items-center">
                    <div className="text-center font-roboFont text-xl ">
                      Profile Picture
                    </div>
                    <div className="relative">
                      <img
                        src={image}
                        className=" h-32 w-32 rounded-full object-cover"
                        alt=""
                      />
                      {propic && (
                        <img
                          src="images/user.png"
                          className=" h-32 w-32 rounded-full absolute inset-0"
                          alt=""
                        />
                      )}
                    </div>
                    <input
                      type="file"
                      class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-black hover:file:bg-gray-200 
                  transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110  duration-300"
                      accept="image/*"
                      onChange={onImagechange}
                    />
                  </div>
                  <button
                    type="submit"
                    class="w-full text-white bg-black focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                    onSubmit={(e) => handleSubmit(e)}
                  >
                    Create an account
                  </button>
                  <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                    Already have an account?{" "}
                    <Link
                      class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                      to="/#"
                    >
                      Login here
                    </Link>
                    <p></p>
                  </p>
                </form>
              </div>
            </div>
          </div>
          <Footer></Footer>
        </div>
      )}
    </>
  );
}
