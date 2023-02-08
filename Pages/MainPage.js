import React from 'react'
import { useNavigate } from 'react-router-dom'
import Chatbox from '../Components/Chatbox'
import Header from '../Components/Header'
import Sidebar from '../Components/Sidebar'


const MainPage = () => {
 
  // useNavigate
  return (
    <>
      <div>
        <Header></Header>

        <div className="h-screen flex justify-center items-center">
          <div className="h-5/6  w-4/5   flex flex-col md:flex-row rounded-lg overflow-hidden  ">
            <Sidebar></Sidebar>
            <Chatbox></Chatbox>
          </div>
        </div>
      </div>
    </>
  );
}

export default MainPage