import React, { useEffect, useState } from 'react'
import { FaAddressCard, FaBars, FaInstagram, FaPowerOff, FaUser   } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import serverURL from '../../services/serverURL';

function Header() {

  const navigate = useNavigate()
  const [toggle,setToggle] = useState(false)
  const [token,setToken] = useState("")
  const [dp,setDp] = useState("")
  const [dropDown,setDropDown] = useState(false)

  useEffect(()=>{
    if(sessionStorage.getItem("token") && sessionStorage.getItem("user")){
      const userToken = sessionStorage.getItem("token")
      setToken(userToken)
      const user = JSON.parse(sessionStorage.getItem("user"))
      setDp(user.picture)
    }
  },[token])

  const logout = ()=>{
    sessionStorage.clear()
    setToken("")
    setDp("")
    setDropDown(false)
    navigate('/')
  }

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
            {/* login link */}
            {
              !token ?
              <Link to={'/login'} className='border border-black rounded px-3 py-2 ms-3 flex items-center hover:bg-black hover:text-white'><FaUser className='me-1'/> Login</Link>
              :
              <div>
                <button onClick={()=>setDropDown(!dropDown)} className='shadow-sm rounded ms-5 p-2 hover:bg-gray-100'>
                  <img width={'40px'} height={'40px'} style={{borderRadius:'50%'}} src={dp==""?"https://static.vecteezy.com/system/resources/thumbnails/019/879/186/small_2x/user-icon-on-transparent-background-free-png.png":dp.startsWith("https://lh3.googleusercontent.com/")?dp:`${serverURL}/uploads/${dp}`} alt="profile" />
                </button>
                {/* dropdown menu */}
                  {
                    dropDown &&
                    <div className="absolute right-0 z-10 mt-2 w-40 shadow rounded bg-white ring-1 ring-black/5 p-2 focus:outline-hidden">
                    {/* profile link */}
                    <Link to={'/user/profile'} className='flex  items-center text-gray-700 text-sm px-3 py-2'><FaAddressCard className='me-2'/> Profile</Link>
                    {/* logout btn */}
                    <button onClick={logout} className='flex  items-center text-gray-700 text-sm px-3 py-2'><FaPowerOff className='me-2'/> Logout</button>
                  </div>
                  }
              </div>
            }
        </div>
      </div>
      <nav className='w-full p-3 bg-black text-white md:flex justify-center items-center'>
        {/* menu icon & login  */}
        <div className="flex justify-between items-center text-2xl md:hidden">
        <button onClick={()=>setToggle(!toggle)}><FaBars/></button>
        {/* login link */}
        {
              !token ?
              <Link to={'/login'} className='border border-black rounded px-3 py-2 ms-3 flex items-center hover:bg-black hover:text-white'><FaUser className='me-1'/> Login</Link>
              :
              <div>
                <button onClick={()=>setDropDown(!dropDown)} className='shadow-sm rounded ms-5 p-2 hover:bg-gray-100'>
                  <img width={'40px'} height={'40px'} style={{borderRadius:'50%'}} src={dp==""?"https://static.vecteezy.com/system/resources/thumbnails/019/879/186/small_2x/user-icon-on-transparent-background-free-png.png":dp.startsWith("https://lh3.googleusercontent.com/")?dp:`${serverURL}/uploads/${dp}`} alt="profile" />
                </button>
                {/* dropdown menu */}
                  {
                    dropDown &&
                    <div className="absolute right-0 z-10 mt-2 w-40 shadow rounded bg-white ring-1 ring-black/5 p-2 focus:outline-hidden">
                    {/* profile link */}
                    <Link to={'/user/profile'} className='flex  items-center text-gray-700 text-sm px-3 py-2'><FaAddressCard className='me-2'/> Profile</Link>
                    {/* logout btn */}
                    <button onClick={logout} className='flex  items-center text-gray-700 text-sm px-3 py-2'><FaPowerOff className='me-2'/> Logout</button>
                  </div>
                  }
              </div>
            }
        </div>
      <ul className={toggle?'flex flex-col':'md:flex justify-center items-center hidden '}>
        <li className='md:mx-4 mt-2 md:mt-0'><Link to={'/'}>HOME</Link></li>
        <li className='md:mx-4 mt-2 md:mt-0'><Link to={'/books'}>BOOKS</Link></li>
        <li className='md:mx-4 mt-2 md:mt-0'><Link to={'/contact'}>CONTACT</Link></li>
      </ul>
      </nav>
    </>
  )
}

export default Header