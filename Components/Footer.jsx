import React from "react";

export default function Footer(second) {
  return (
    <footer class="p-4 bg-black  shadow md:flex md:items-center md:justify-between md:p-6">
      <img
        src="images/logo-white.png"
        className="h-10 mb-2 md:mb-0"
        alt=""
        srcset=""
      />
      <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400 ">
        © 2023
        <a href="#" className="hover:underline ml-1">
          Connect™
        </a>
        . All Rights Reserved.
      </span>
      <ul class="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
        <li>
          <a href="#" class="mr-4 hover:underline md:mr-6 ">
            Contact @
          </a>
        </li>

        <li>
          <a href="#" class="mr-4 md:mr-6">
            saicherish90@gmail.com
          </a>
        </li>
        <li>
          <a
            href="https://www.linkedin.com/in/siva-sai-cherish-94688b236/"
            class="hover:underline"
          >
            <img src="images/linked.png" className="h-9"></img>
            
          </a>
        </li>
      </ul>
    </footer>
  );
}
// <div
//   className="bg-black h-24 flex justify-between
//    items-center sticky top-full "
// >
//   <div className="w-28 ml-3">
//     <img src="images/logo-white.png" alt="" srcset="" />

//   </div>
//   <div className="text-white  h-18 w-18 flex flex-col justify-between items-end ">
//     <div className=" text-xs opacity-60 h-1/2">Contact me @</div>
//     <div className=" flex w-3/4 justify-between">
//       <a href="" className=" opacity-20">
//         <img src="images/gmail.png " className=" h-6" alt="" />
//       </a>
//       <a href="">
//         <img src="images/linked.png" className="h-6 opacity-20" alt="" />
//       </a>
//     </div>
//   </div>
// </div>
