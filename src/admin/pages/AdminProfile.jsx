import React from 'react'
import AdminHeader from '../components/AdminHeader'
import Footer from '../../components/Footer'
import AdminSidebar from '../components/AdminSidebar'
import { FaPen } from 'react-icons/fa'
import { FaX } from 'react-icons/fa6'
function AdminProfile() {
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
                    <input type="file" id='userProfile' hidden />
                    <img className='z-52' style={{width:'150px',height:'150px',borderRadius:'50%'}} src="https://img.freepik.com/premium-photo/happy-man-ai-generated-portrait-user-profile_1119669-1.jpg" alt="profile" />
                    <button className="bg-blue-300 z-53  text-white py-2 px-3 rounded" style={{marginLeft:'75px',marginTop:'-20px'}}><FaPen/></button>
                  </label>
                  <div className="mt-10 mb-3 w-full px-5">
                    <input type="text" placeholder='Username' className="w-full   p-2 rounded bg-white" />
                  </div>
                  <div className=" mb-3 w-full px-5">
                    <input type="password" placeholder='New Password' className="w-full bg-white p-2 rounded" />
                  </div>
                  <div className=" mb-3 w-full px-5">
                    <input type="password" placeholder='Confirm Password' className="w-full bg-white p-2 rounded" />
                  </div>
                  
                  <div className="flex justify-end  w-full px-5 mt-5">
                      <button className="bg-yellow-600 text-white px-3 py-2 rounded">RESET</button>
                      <button className="bg-green-600 ms-5 text-white px-3 py-2 rounded">UPDATE</button>
                  </div>
              </div>
          </div>

        </div>
    </div>
    <Footer/>
    </>
  )
}

export default AdminProfile