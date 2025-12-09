import React, { useState } from 'react'
import { FaEye, FaEyeSlash, FaUser } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer,toast } from 'react-toastify'
import { loginAPI, registerAPI } from '../services/allAPI'
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

function Auth({registerURL}) {

  const navigate = useNavigate()
  const [invalidUsername,setInvalidUsername] = useState(false)
  const [invalidEmail,setInvalidEmail] = useState(false)
  const [invalidPassword,setInvalidPassword] = useState(false)

  const [viewPassword,setViewPassword] = useState(false)
  const [userDetails,setUserDetails] = useState({
    username:"",email:"",password:""
  })

  const validateInput = (inputTag)=>{
    const {name,value} = inputTag
    
    if(name=="username"){
      setUserDetails({...userDetails,username:value})
      if(!!value.match(/^[a-zA-Z ]{3,16}$/)) { 
        setInvalidUsername(false)
      } else{
        setInvalidUsername(true)
      }
    }else if(name=="email"){
      setUserDetails({...userDetails,email:value})
      if(!!value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)){
        setInvalidEmail(false)
      }  else{
    setInvalidEmail(true)
      }
    }else if(name=="password"){
      setUserDetails({...userDetails,password:value})
      if(!!value.match(/^.{6,16}$/)){
        setInvalidPassword(false)
      }else{
        setInvalidPassword(true)
      }
    }
  }

  const handleRegister = async (e)=>{
    e.preventDefault()
    const {username , email, password} = userDetails
    if(username && email && password){
      // alert("api call")
      try{
        const result = await registerAPI(userDetails)
        console.log(result);        
        //result in 200, 409,500
        if(result.status==200){
          toast.success("Register successfully... Please Login!!!")
          setUserDetails({username:"",email:"",password:""})
          navigate('/login')
        }else if(result.status==409){
            toast.warning(result.response.data)
            setUserDetails({username:"",email:"",password:""})
            navigate('/login')
        }else{
          toast.error("Something went wrong!!!")
          setUserDetails({username:"",email:"",password:""})
        }
      }catch(err){
        console.log(err);        
      }
    }
    else{
      toast.warning("Please fill the form completely")
    }
  }

  const handleLogin = async (e)=>{
    e.preventDefault()
    const { email, password} = userDetails
    if(email && password){
      // alert("api call")
      const result = await loginAPI(userDetails)
      if(result.status==200){
        toast.success("Login Successful...")
        sessionStorage.setItem("token",result.data.token)
        sessionStorage.setItem("user",JSON.stringify(result.data.user))
        setUserDetails({username:"",email:"",password:""})
        setTimeout(() => {
          if(result.data.user.role=="admin"){
            navigate('/admin/home')
          }else{
            navigate('/')
          }
        }, 2500);
      }else if(result.status==401 || result.status==404){
        toast.warning(result.response.data)
         setUserDetails({username:"",email:"",password:""})
      }else{
        toast.error("Something went wrong!!!")
        console.log(result);        
      }
    }
    else{
      toast.warning("Please fill the form completely")
    }
  }

  const handleGoogleLogin = async (credentialResponse)=>{
    console.log("Inside handleGoogleLogin ");
    // console.log(credentialResponse);
    const decode = jwtDecode(credentialResponse.credential)
    console.log(decode);
    
    // const { email, password} = userDetails
    // if(email && password){
      
    // }
    // else{
    //   toast.warning("Please fill the form completely")
    // }
  }

  return (
    <div className='w-full min-h-screen flex justify-center items-center bg-[url(/landing.jpg)] bg-cover bg-center text-white'>
      <div className="p-10">
        <h1 className="text-center font-bold text-3xl">BOOK STORE</h1>
        <div style={{width:'400px'}} className="bg-black text-white p-5 flex justify-center items-center flex-col my-5">
            {/* user logo */}
            <div style={{width:'100px',height:'100px',borderRadius:'50%'}} className="border mb-5 flex justify-center items-center ">
              <FaUser className='text-3xl'/>
            </div>
            {/* form title */}
            <h1 className="text-2xl"> {registerURL?"Register":"Login"}  </h1>
            {/* form */}
            <form className="my-5 w-full">
              {/* username - register */}
              {
                registerURL &&
                <>
                <input value={userDetails.username} onChange={e=>validateInput(e.target)} name='username' type="text" placeholder='Username' className="bg-white p-2 w-full rounded my-5 text-black" />
                {invalidUsername && <div className="text-yellow-500 mb-5">*Invalid Username</div>}
                </>
              }
              {/* email */}
              <input value={userDetails.email} onChange={e=>validateInput(e.target)} name='email' type="text" placeholder='E Mail' className="bg-white p-2 w-full rounded mb-5 text-black" />
               {invalidEmail && <div className="text-yellow-500 mb-5">*Invalid Email</div>}
              {/* password */}
              <div className="flex items-center">
                  <input value={userDetails.password} onChange={e=>validateInput(e.target)} name='password' type={viewPassword?"text":"password"} placeholder='Password' className="bg-white p-2 w-full rounded mb-2 text-black" />
                  {
                    viewPassword ?
                    <FaEyeSlash onClick={()=>setViewPassword(!viewPassword)} className='text-gray-600 ' style={{marginLeft:'-30px',marginTop:'-20px'}}/>
                    :
                    <FaEye onClick={()=>setViewPassword(!viewPassword)} className='text-gray-600' style={{marginLeft:'-30px',marginTop:'-20px'}}/>
                  }
              </div>
               {invalidPassword && <div className="text-yellow-500 mb-5">*Invalid Password</div>}
              {/* forgot password */}               
                <div className="flex justify-between mb-5">
                <p className='text-xs text-orange-300'>*Never share your password with others</p>
                {!registerURL && <button className="text-xs underline">Forgot Password</button>}
                </div>
              {/* btn regietr / login */}
              <div className="text-center">
                {
                  registerURL ?
                    <button onClick={handleRegister} disabled={invalidUsername || invalidEmail || invalidPassword} className="bg-green-700 p-2 w-full rounded">Register</button>
                  :
                  <button onClick={handleLogin} disabled={invalidUsername || invalidEmail || invalidPassword} className="bg-green-700 p-2 w-full rounded">Login</button>
                }
              </div>
              {/* google authentication */}
              {
                !registerURL &&
                <div className="my-5 text-center">
                  <p>-----------------or-----------------</p>
                  <div className="mt-2 flex justify-center items-center w-full">
                    <GoogleLogin
                      onSuccess={credentialResponse => {
                        handleGoogleLogin(credentialResponse)
                      }}
                      onError={() => {
                        console.log('Login Failed');
                      }}
                    />
                  </div>
                </div>
              }
              <div className="my-5 text-center">
                {
                  registerURL ?
                  <p className="text-blue-500">Already a user? <Link to={'/login'} className='underline ms-3'>Login</Link> </p>
                  :
                  <p className="text-blue-500">New user? <Link to={'/register'} className='underline ms-3'>Register</Link> </p>
                }
              </div>
            </form>
        </div>
      </div>
      <ToastContainer position='top-center' autoClose={3000} theme='colored'/>
    </div>
  )
}

export default Auth