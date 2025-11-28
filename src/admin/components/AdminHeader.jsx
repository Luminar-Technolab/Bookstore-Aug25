import React from 'react'
import { FaPowerOff } from 'react-icons/fa'

function AdminHeader() {
  return (
    <>
    <div className="flex justify-between items-center p-3 md:px-20">
      {/* logo */}
      <div className="flex items-center">
          <img width={'50px'} height={'50px'} src="http://clipart-library.com/images_k/books-transparent-png/books-transparent-png-11.png" alt="logo" />
          <h1 className="text-2xl font-bold ms-2 ">BOOKSTORE</h1>
      </div>
      {/* logout */}
      <button className='bg-black px-3 py-2 rounded text-white hover:border hover:text-black hover:bg-white flex items-center'>LOGOUT <FaPowerOff className='ms-2'/></button>
    </div>
    {/* marquue */}
    <div className="w-full p-3 bg-black text-white">
      <marquee>Welcome Admin, Your all set to manage and monitor the system.  Let's get into work!!!</marquee>
    </div>

    </>
  )
}

export default AdminHeader