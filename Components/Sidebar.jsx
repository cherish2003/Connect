import React from 'react'
import Navbar from './Navbar'
import Search from './Search'
import Users from './Users'

const Sidebar = () => {
  return (
    <div className=" w-full  md:w-2/5 lg:w-2/6 md:h-full bg-slate-700  ">
      <Navbar></Navbar>
      <div className='hidden md:block'>
      <Search></Search>
      </div>
      <Users></Users>

    </div>
  );
}

export default Sidebar