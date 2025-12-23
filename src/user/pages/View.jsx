import React, { useState } from 'react'
import Header from '../components/Header'
import Footer from '../../components/Footer'
import { FaBackward, FaCamera, FaEye } from 'react-icons/fa'
import { Link, useParams } from 'react-router-dom'
import { viewBookAPI } from '../../services/allAPI'
import { useEffect } from 'react'
import serverURL from '../../services/serverURL'

function View() {

  const [modalStatus,setModalStatus] = useState(false)
  const [book,setBook] = useState({})
  const {id} = useParams()

  console.log(book);

  useEffect(()=>{
    getBookDetails()
  },[])
  

  const getBookDetails = async ()=>{
    const token = sessionStorage.getItem('token')
    if(token){
      const reqHeader = {
        "Authorization":`Bearer ${token}`
      }
      const result = await viewBookAPI(id,reqHeader)
      if(result.status==200){
        setBook(result.data)
      }else{
        console.log(result);
        
      }
    }
    

  }

  return (
    <>
    <Header/>
    <div className='md:m-10 m-5'>
      <div className="border p-5 shadow border-gray-200">
        <div className="md:grid grid-cols-4 gap-x-10">
          <div className="col-span-1">
            <img className='w-full' src={book?.imageURL} alt="book" />
          </div>
          <div className="col-span-3">
            <div className="flex justify-between mt-5 md:mt-0">
                <h1 className="text-2xl font-bold">{book?.title}</h1>
                <button onClick={()=>setModalStatus(!modalStatus)} className="text-gray-400"><FaEye/></button>
            </div>
            <h3 className="my-5 text-xl text-blue-600">{book?.author}</h3>
            <div className="md:grid grid-cols-3 gap-5 my-10">
              <p className="font-bold">Publisher  : {book?.publisher} </p>
              <p className="font-bold">Language   : {book?.language}</p>
              <p className="font-bold">No. of Pages  : {book?.pages}</p>
              <p className="font-bold">Category  : {book?.category}</p>
              <p className="font-bold">ISBN  : {book?.isbn}</p>
              <p className="font-bold">Original Price  : {book?.price}</p>
              <p className="font-bold">Seller  : {book?.sellerMail}</p>
            </div>
            <div className="md:my-10 my-4">
              <p className="font-bold text-lg">{book?.abstract} </p>
            </div>
            <div className="flex justify-end">
              <Link to={'/books'} className='bg-blue-900 text-white p-2 rounded flex items-center'><FaBackward className='me-2'/> Back</Link>
              <button className='bg-green-900 text-white p-2 rounded ms-5'>Buy $ {book?.discountPrice}</button>
            </div>
          </div>
        </div>

      </div>
      {/* modal */}
      { modalStatus &&
        <div className='relative z-10 overflow-y-auto ' onClick={()=>setModalStatus(!modalStatus)}>
          <div className="bg-gray-500/75 fixed inset-0">
              <div className="flex justify-center items-center min-h-screen scroll-auto">
                  <div className="bg-white rounded-2xl md:w-250 w-100">
                    {/* modal title */}
                    <div className="bg-black text-white flex justify-between items-center p-3">
                      <h3>Books Images</h3>
                    </div>
                    {/* madal body */}
                    <div className="relative p-5">
                      <p className="text-blue-600 flex items-center"><FaCamera className='me-2'/> Camera click of the book in the hand of seller</p>
                      {/* books in row & col */}
                      <div className="md:flex flex-wrap my-4">
                        {
                          book?.uploadImg?.length>0 ?
                            book?.uploadImg?.map((filename,index)=>(
                              <img key={index} className='md:w-75 w-25 md:me-2 mb-3 md:mt-0' src={`${serverURL}/uploads/${filename}`} alt="book" />
                            ))
                        :
                        <p className='font-bold text-lg'>No Book Images are available</p>
                        }
                      </div>
                    </div>
                  </div>
              </div>
          </div>
        </div>
      }
    </div>
    <Footer/>
    </>
  )
}

export default View