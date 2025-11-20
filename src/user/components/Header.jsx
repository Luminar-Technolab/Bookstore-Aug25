import React from 'react'
import { FaInstagram, FaUser   } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from 'react-router-dom';

function Header() {
  return (
    <>
      <div className='grid grid-cols-3 p-3'>
        {/* logo */}
        <div className="flex items-center">
          <img width={'50px'} height={'50px'} src="http://clipart-library.com/images_k/books-transparent-png/books-transparent-png-11.png" alt="logo" />
          <h1 className="text-2xl font-bold ms-2 md:hidden">BOOKSTORE</h1>
        </div>
        {/* title */}
        <div className='md:flex justify-center items-center hidden'>
          <h1 className="text-3xl font-bold">BOOK STORE</h1>
        </div>
        {/* login */}
        <div className="md:flex justify-end items-center hidden">
            <FaInstagram className='me-1'/>
            <FaXTwitter className='me-1'/>
            <FaFacebookSquare/>
            <Link to={'/login'} className='border border-black rounded px-3 py-2 ms-3 flex items-center hover:bg-black hover:text-white'><FaUser className='me-1'/> Login</Link>
        </div>
      </div>
    </>
  )
}

export default Header