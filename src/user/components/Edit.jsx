import React, { useEffect, useState } from 'react'
import { FaPen } from 'react-icons/fa'
import { FaX } from 'react-icons/fa6'
import serverURL from '../../services/serverURL'

function Edit() {
 const [offcanvasStatus,setOffcanvasStatus] = useState(false)
 const [userDetails,setUserDetails] = useState({
  username:"",password:"",cpassword:"",picture:"",role:"",bio:""
 })
 const [existingUserImage,setExisitngUserImage] = useState("")
  const [preview,setPreview] = useState("")

 console.log(userDetails);
 

 useEffect(()=>{
  if(sessionStorage.getItem("user")){
    const user = JSON.parse(sessionStorage.getItem("user"))
    setUserDetails({...userDetails,username:user.username,role:user.role,bio:user.bio})
    setExisitngUserImage(user.picture)
  }
 },[])
 

 const handlePictureUpdate = (e)=>{
  setUserDetails({...userDetails,picture:e.target.files[0]})
  const url = URL.createObjectURL(e.target.files[0])
  setPreview(url)
 }

 const handleResetForm = ()=>{
  const user = JSON.parse(sessionStorage.getItem("user"))
  setUserDetails({username:user.username,role:user.role,bio:user.bio,password:"",cpassword:""})
  setExisitngUserImage(user.picture)
  setPreview("")
 }

 return (
    <div>
      <button onClick={()=>setOffcanvasStatus(true)} className="text-blue-600 border rounded border-blue-600 p-3 flex items-center hover:bg-blue-600 hover:text-white"> <FaPen className='me-2'/> Edit</button>
      {/* offcanvas */}
      {
        offcanvasStatus &&
        <div>
        <div className="fixed inset-0 bg-gray-500/75 w-full h-full"></div>
        <div className="bg-white h-full w-90 z-50 fixed top-0 left-0">
          {/* offcanvas head */}
          <div className="bg-black text-white px-3 py-4 flex justify-between text-2xl">
              <h1>Update User Profile</h1>
              <FaX onClick={()=>setOffcanvasStatus(false)}/>
          </div>
          {/* body */}
          <div className="flex justify-center items-center flex-col my-5">
              <label htmlFor="userProfile">
                <input onChange={e=>handlePictureUpdate(e)} type="file" id='userProfile' hidden />
                {
                  existingUserImage==""?
                  <img className='z-52' style={{width:'100px',height:'100px',borderRadius:'50%'}} src={preview?preview:"https://cdn1.iconfinder.com/data/icons/interaction-18/70/profile__account__user__upload__male-1024.png"} alt="profile" />
                  : 
                  existingUserImage.startsWith("https://lh3.googleusercontent.com/")?
                  <img className='z-52' style={{width:'100px',height:'100px',borderRadius:'50%'}} src={preview?preview:existingUserImage} alt="profile" />
                  :
                  <img className='z-52' style={{width:'100px',height:'100px',borderRadius:'50%'}} src={preview?preview:`${serverURL}/uploads/${existingUserImage}`} alt="profile" />
                }
                <button className="bg-blue-300 z-53 fixed text-white py-2 px-3 rounded" style={{marginLeft:'75px',marginTop:'-20px'}}><FaPen/></button>
              </label>
              <div className="mt-10 mb-3 w-full px-5">
                <input value={userDetails.username} onChange={e=>setUserDetails({...userDetails,username:e.target.value})} type="text" placeholder='Username' className="w-full border border-gray-300 p-2 rounded" />
              </div>
              <div className=" mb-3 w-full px-5">
                <input value={userDetails.password} onChange={e=>setUserDetails({...userDetails,password:e.target.value})} type="password" placeholder='New Password' className="w-full border border-gray-300 p-2 rounded" />
              </div>
              <div className=" mb-3 w-full px-5">
                <input value={userDetails.cpassword} onChange={e=>setUserDetails({...userDetails,cpassword:e.target.value})} type="password" placeholder='Confirm Password' className="w-full border border-gray-300 p-2 rounded" />
              </div>
              <div className=" mb-3 w-full px-5">
                <textarea value={userDetails.bio} onChange={e=>setUserDetails({...userDetails,bio:e.target.value})} type="text" placeholder='Bio' className="w-full border border-gray-300 p-2 rounded" />
              </div>
              <div className="flex justify-end  w-full px-5 mt-5">
                  <button onClick={handleResetForm} className="bg-yellow-600 text-white px-3 py-2 rounded">RESET</button>
                  <button className="bg-green-600 ms-5 text-white px-3 py-2 rounded">UPDATE</button>
              </div>
          </div>
        </div>
      </div>
      }
    </div>
  )
}

export default Edit