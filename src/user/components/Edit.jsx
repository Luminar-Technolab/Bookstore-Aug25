import React, { useEffect, useState } from 'react'
import { FaPen } from 'react-icons/fa'
import { FaX } from 'react-icons/fa6'
import serverURL from '../../services/serverURL'
import { ToastContainer,toast } from 'react-toastify'
import { editUserAPI } from '../../services/allAPI'
import { useNavigate } from 'react-router-dom'

function Edit() {
 const [offcanvasStatus,setOffcanvasStatus] = useState(false)
 const [userDetails,setUserDetails] = useState({
  username:"",password:"",cpassword:"",picture:"",role:"",bio:"",id:""
 })
 const [existingUserImage,setExisitngUserImage] = useState("")
 const [preview,setPreview] = useState("")
 const [pswdMatch,setPswdMatch] = useState(true)
 const navigate = useNavigate()

//  console.log(userDetails);
 
 useEffect(()=>{
  if(sessionStorage.getItem("user")){
    const user = JSON.parse(sessionStorage.getItem("user"))
    setUserDetails({...userDetails,username:user.username,role:user.role,bio:user.bio,id:user._id})
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

 const checkPasswordMatch = (data)=>{
    setUserDetails({...userDetails,cpassword:data})
    userDetails.password == data ? setPswdMatch(true) : setPswdMatch(false)
 }

 const handleUpdateUser = async ()=>{
  const {username,password,cpassword,bio,id,picture} = userDetails
  if(!username || !password || !cpassword || !bio ){
    toast.info("Please fill the form completely")
  }else if(pswdMatch){
    //api call
    const token = sessionStorage.getItem("token")
    if(token){
      const reqHeader = {
        "Authorization":`Bearer ${token}`
      }
      const reqBody = new FormData()
      for(let key in userDetails){
        if(key != "picture"){
          reqBody.append(key,userDetails[key])
        }else{
        preview ? reqBody.append("picture",picture) : reqBody.append("picture",existingUserImage)
        }
      }
      //api call
      const result = await editUserAPI(id,reqBody,reqHeader)
      if(result.status==200){
        toast.success("Profile updated successfully..")
        setTimeout(() => {
          sessionStorage.clear()
          navigate('/login')
        }, 2000);
      }else{
        console.log(result);
        toast.error("Something went wrong!!!")
      }
    }    
  }else{
    toast.warning("Operation failed!!! Password mismatch")
  }
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
                <input value={userDetails.cpassword} onChange={e=>checkPasswordMatch(e.target.value)} type="password" placeholder='Confirm Password' className="w-full border border-gray-300 p-2 rounded" />
              </div>
              {!pswdMatch && <div className="text-red-600 mb-3 w-full px-5 text-xs font-bold">
                Confirm Password must be match with new password
              </div>}
              <div className=" mb-3 w-full px-5">
                <textarea value={userDetails.bio} onChange={e=>setUserDetails({...userDetails,bio:e.target.value})} type="text" placeholder='Bio' className="w-full border border-gray-300 p-2 rounded" />
              </div>
              <div className="flex justify-end  w-full px-5 mt-5">
                  <button onClick={handleResetForm} className="bg-yellow-600 text-white px-3 py-2 rounded">RESET</button>
                  <button onClick={handleUpdateUser} className="bg-green-600 ms-5 text-white px-3 py-2 rounded">UPDATE</button>
              </div>
          </div>
        </div>
      </div>
      }
            <ToastContainer position='top-center' autoClose={3000} theme='colored'/>
      
    </div>
  )
}

export default Edit