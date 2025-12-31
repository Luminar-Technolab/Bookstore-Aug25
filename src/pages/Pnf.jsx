import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { routeGuardContext } from '../contextAPI/AuthContext'

function Pnf() {
  const {role} = useContext(routeGuardContext)
  const navigate = useNavigate()

  const backHome = ()=>{
    if(role=="user"){
      navigate('/')
    }else{
      navigate('/admin/home')
    }
  }

  return (
    <div className='min-h-screen w-full flex justify-center items-center flex-col'>
      <img className='w-100' src="https://webytag.com/wp-content/uploads/2024/07/c19fc414b5c17a9e286bd53c5ab19e7c.gif" alt="pnf" />
      <p>Oh No!</p>
      <h3 className='text-2xl font-semi-bold'>Look Like You're Lost</h3>
      <p>The page you are looking for is not available</p>
      <button onClick={backHome} className='bg-black px-3 py-2 text-white my-5'>Home</button>
    </div>
  )
}

export default Pnf