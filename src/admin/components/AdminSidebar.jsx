import React, { useState,useEffect } from 'react'
import { FaDatabase } from 'react-icons/fa'
import { FaChartSimple, FaGear } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import serverURL from '../../services/serverURL'

function AdminSidebar() {

  const [username,setUsername] = useState("")
  const [dp,setDp] = useState("")

  useEffect(()=>{
      if(sessionStorage.getItem("token") && sessionStorage.getItem("user")){
        const user = JSON.parse(sessionStorage.getItem("user"))
        setUsername(user?.username)
        setDp(user?.picture)
      }
    },[])


  return (
    <div className='bg-blue-100 md:min-h-screen h-fit  py-10 '>
      {/* image */}
      <div className="flex justify-center">
      <img width={'100px'} height={'100px'} style={{borderRadius:'50%'}} src={dp==""?"https://cdn1.iconfinder.com/data/icons/interaction-18/70/profile__account__user__upload__male-1024.png":dp.startsWith("https://lh3.googleusercontent.com/")?dp:`${serverURL}/uploads/${dp}`} alt="profile" />
      </div>
      {/* name */}
      <h1 className="text-xl font-bold my-5 text-center">{username}</h1>
      {/* nav links */}
      <div className="mt-10 flex flex-col justify-center items-center">
        <div className="mt-3">
          <Link to={'/admin/home'} className='flex items-center'> <FaChartSimple className='me-1'/> Dashboard</Link>
        </div>
        <div className="mt-3">
          <Link to={'/admin/collections'} className='flex items-center'> <FaDatabase className='me-1'/> Collections</Link>
        </div>
        <div className="mt-3">
          <Link to={'/admin/profile'} className='flex items-center'> <FaGear className='me-1'/> Settings</Link>
        </div>
      </div>
    </div>
  )
}

export default AdminSidebar