import React, { useState } from 'react'
import { FaPen } from 'react-icons/fa'
import { FaX } from 'react-icons/fa6'

function Edit() {
 const [offcanvasStatus,setOffcanvasStatus] = useState(false)
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
                <input type="file" id='userProfile' hidden />
                <img className='z-52' style={{width:'150px',height:'150px',borderRadius:'50%'}} src="https://img.freepik.com/premium-photo/happy-man-ai-generated-portrait-user-profile_1119669-1.jpg" alt="profile" />
                <button className="bg-blue-300 z-53 fixed text-white py-2 px-3 rounded" style={{marginLeft:'75px',marginTop:'-20px'}}><FaPen/></button>
              </label>
              <div className="mt-10 mb-3 w-full px-5">
                <input type="text" placeholder='Username' className="w-full border border-gray-300 p-2 rounded" />
              </div>
              <div className=" mb-3 w-full px-5">
                <input type="password" placeholder='New Password' className="w-full border border-gray-300 p-2 rounded" />
              </div>
              <div className=" mb-3 w-full px-5">
                <input type="password" placeholder='Confirm Password' className="w-full border border-gray-300 p-2 rounded" />
              </div>
              <div className=" mb-3 w-full px-5">
                <textarea type="text" placeholder='Bio' className="w-full border border-gray-300 p-2 rounded" />
              </div>
              <div className="flex justify-end  w-full px-5 mt-5">
                  <button className="bg-yellow-600 text-white px-3 py-2 rounded">RESET</button>
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