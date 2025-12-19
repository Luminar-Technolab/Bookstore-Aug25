import React, { useState } from 'react'
import Header from '../components/Header'
import Footer from '../../components/Footer'
import { FaCircleCheck } from 'react-icons/fa6'
import Edit from '../components/Edit'
import Purchase from '../components/Purchase'
import SellBook from '../components/SellBook'
import BookStatus from '../components/BookStatus'
import { useEffect } from 'react'
import serverURL from '../../services/serverURL'

function Profile() {

  const [tabNo,setTabNo]= useState(1)
  const [username,setUsername]= useState("")
  const [dp,setDp] = useState("")

  useEffect(()=>{
    if(sessionStorage.getItem("token") && sessionStorage.getItem("user")){
      const user = JSON.parse(sessionStorage.getItem("user"))
      setUsername(user?.username)
      setDp(user?.picture)
    }
  },[])

  return (
    <>
    <Header/>
    <div style={{height:'200px'}} className='bg-black'></div>
    <div style={{width:'230px',height:'230px',borderRadius:'50%',marginLeft:'70px',marginTop:'-130px'}} className='bg-white p-3'>
      <img width={'200px'} height={'200px'} style={{borderRadius:'50%'}} src={dp==""?"https://cdn1.iconfinder.com/data/icons/interaction-18/70/profile__account__user__upload__male-1024.png":dp.startsWith("https://lh3.googleusercontent.com/")?dp:`${serverURL}/uploads/${dp}`} alt="profile" />
    </div>
    <div className="md:flex justify-between px-20 mt-5">
        <div className="flex items-center">
          <h1 className="font-bold md:text-3xl text-2xl">{username}</h1>
          <FaCircleCheck className='text-blue-400 ms-3'/>
        </div>
        <Edit/>
    </div>
    <p className="text-justify md:px-20 px-5 my-5">This is your personal space where you can manage your account, explore your reading activity, track your orders, and save books you love. Whether you're building a wishlist, discovering new arrivals, or reviewing your recent purchases, this page keeps everything organized and easy to access.

Your reading journey continues here — enjoy exploring, discovering, and collecting stories that inspire you. ✨</p>
    <div className="md:px-40">
      {/* tabs */}
      <div className="flex justify-center items-center my-8 font-medium text-lg">
        <p onClick={()=>setTabNo(1)} className={tabNo==1?'p-4 border-gray-200 border-l border-t border-r rounded cursor-pointer':'p-4 border-gray-200 border-b rounded cursor-pointer'}>Sell Books</p>
        <p onClick={()=>setTabNo(2)} className={tabNo==2?'p-4 border-gray-200 border-l border-t border-r rounded cursor-pointer':'p-4 border-gray-200 border-b rounded cursor-pointer'}>Book Status</p>
        <p onClick={()=>setTabNo(3)} className={tabNo==3?'p-4 border-gray-200 border-l border-t border-r rounded cursor-pointer':'p-4 border-gray-200 border-b rounded cursor-pointer'}>Purchase History</p>
      </div>
      {/* contents */}
      {
        tabNo==1 &&
      <div> <SellBook/> </div>
      }
      {
        tabNo==2 &&
        <div> <BookStatus/> </div>
      }
      {
        tabNo==3 &&
        <div> <Purchase/> </div>
      }
      </div>
    <Footer/>
    </>
  )
}

export default Profile