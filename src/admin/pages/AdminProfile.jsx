import React,{useState,useEffect} from 'react'
import AdminHeader from '../components/AdminHeader'
import Footer from '../../components/Footer'
import AdminSidebar from '../components/AdminSidebar'
import { FaPen } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { ToastContainer,toast } from 'react-toastify'
import { editUserAPI } from '../../services/allAPI'
import serverURL from '../../services/serverURL'

function AdminProfile() {

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
    setUserDetails({username:user.username,role:user.role,bio:user.bio,password:"",cpassword:"",id:user._id})
    setExisitngUserImage(user.picture)
    setPreview("")
    setPswdMatch(true)
   }
  
   const checkPasswordMatch = (data)=>{
      setUserDetails({...userDetails,cpassword:data})
      userDetails.password == data ? setPswdMatch(true) : setPswdMatch(false)
   }
  
   const handleUpdateUser = async ()=>{
    const {username,password,cpassword,bio,id,picture} = userDetails
    if(!username || !password || !cpassword ){
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
          preview ? reqBody.append("picture",userDetails.picture) : reqBody.append("picture",existingUserImage)
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
    <>
    <AdminHeader/>
    <div className='md:grid grid-cols-5'>
        <div className="col-span-1">
          <AdminSidebar/>
        </div>
        <div className='col-span-4 p-10'>
          
          <h1 className="text-center mb-10 font-bold text-3xl">Settings</h1>
          <div className="md:grid grid-cols-2 items-center">
            <div>
                <p className='text-xl mb-5'>Welcome, Admin 👋</p>
                <p className='text-justify'>
                  This is your personal administration space where you can manage your account details, system preferences, and platform roles with ease.
                  
                  From here, you can update essential information such as your username, password, contact details, and notification preferences — ensuring your access remains secure and personalized.
                </p>

                <p className='text-lg my-5'>🔧 What You Can Manage in This Section:</p>

                <ul>
                  <li>✏️ Update personal details (name, email, role, profile picture)</li>

                <li>🔐 Change or reset your password</li>

                <li>📢 Configure notification and alert preferences</li>

                <li>👥 Manage permissions based on assigned access level</li>

                <li>🧩 Customize dashboard visibility and layout</li>
                </ul>



                <p className='text-justify my-5'>
                  Your profile settings help ensure your administrative tools work the way you need them to — securely, efficiently, and with complete control.
                  
                  Thank you for keeping the platform organized and running smoothly.
                  Continue managing, updating, and improving the system — one step at a time. 🚀📚
                </p>
            </div>
            <div className="flex justify-center items-center flex-col m-10   bg-blue-100 p-5 rounded">
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
                <button className="bg-blue-300 z-53  text-white py-2 px-3 rounded" style={{marginLeft:'45px',marginTop:'-45px'}}><FaPen/></button>
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
                  
                  <div className="flex justify-end  w-full px-5 mt-5">
                      <button onClick={handleResetForm} className="bg-yellow-600 text-white px-3 py-2 rounded">RESET</button>
                  <button onClick={handleUpdateUser} className="bg-green-600 ms-5 text-white px-3 py-2 rounded">UPDATE</button>
                  </div>
              </div>
          </div>

        </div>
    </div>
    <Footer/>
                <ToastContainer position='top-center' autoClose={3000} theme='colored'/>
    
    </>
  )
}

export default AdminProfile