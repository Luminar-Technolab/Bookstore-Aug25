import React from 'react'
import Header from '../components/Header'
import Footer from '../../components/Footer'
import { Link } from 'react-router-dom'
import { FaBackward } from 'react-icons/fa'

function PaymentError() {
  return (
    <>
    <Header/>
        <div className='container  min-h-screen flex justify-center items-center'>
            <div className="md:grid grid-cols-2 px-20 justify-center items-center my-10">
                <div>
                    <h1 className="text-red-500 md:text-4xl ">Sorry!!! Payment is UnSuccessfull...</h1>
                    <p className="text-2xl my-10">We Apologize for the inconvience caused and Appreciate your visit to Bookstore...</p>
                    <Link to={'/books'} className='flex items-center bg-red-600 w-60 p-2 text-white font-bold'> <FaBackward className='me-2'/> Explore More Books!!!</Link>
                </div>
                <div className="flex justify-center items-center">
                    <img  src="http://p4.maktabsoft.ir/780/component/messenger/assets/images/failed.gif" alt="payment error" />
                </div>
            </div>
        </div>
        <Footer/>
    </>
  )
}

export default PaymentError