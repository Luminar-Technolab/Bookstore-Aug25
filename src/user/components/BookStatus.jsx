import React from 'react'
import { useState } from 'react'
import { getAllUserProfileBooksAPI, removeBookAPI } from '../../services/allAPI';
import { useEffect } from 'react';

function BookStatus() {

  const [allBooks,setAllBooks] = useState([])

  console.log(allBooks);
  useEffect(()=>{
    getAllUserProfileBooks()
  },[])

  const getAllUserProfileBooks = async ()=>{
    const token = sessionStorage.getItem("token")
    if(token){
      const reqHeader = {
        "Authorization":`Bearer ${token}`
      }
      const result = await getAllUserProfileBooksAPI(reqHeader)
      if(result.status==200){
        setAllBooks(result.data)
      }else{
        console.log(result);
      }
    }
  }
  
  const removeBook = async (id)=>{
    const token = sessionStorage.getItem("token")
    if(token){
      const reqHeader = {
        "Authorization":`Bearer ${token}`
      }
      const result = await removeBookAPI(id,reqHeader)
      if(result.status==200){
        getAllUserProfileBooks()
      }else{
        console.log(result);
      }
    }
  }

  return (
    <div className='p-10 my-20 shadow rounded'>
      {/* duplicate book with status updation */}
      {
        allBooks?.length>0?
          allBooks?.map(book=>(
            <div key={book?._id} className="p-5 rounded mt-4 bg-gray-100">
              <div className="md:grid grid-cols-[3fr_1fr]">
                <div className="px-4">
                  <h1 className="text-2xl"> {book?.title}</h1>
                  <h2 className="text-xl">{book?.author}</h2>
                  <h3 className="text-lg text-blue-600">$ {book?.discountPrice} price</h3>
                  <p className="text-justify">{book?.abstract} </p>
                  <div className="flex mt-3">                   
                    {
                      book?.status=="pending"?
                      <img width={'120px'} height={'120px'} src="https://psdstamps.com/wp-content/uploads/2022/04/round-pending-stamp-png.png" alt="pending" />
                      : book?.status=="approved"?
                      <img width={'80px'} height={'80px'} src="https://pngimg.com/d/approved_PNG1.png" alt="approve" />
                      :
                      <img width={'80px'} height={'80px'} src="https://www.pngmart.com/files/7/Sold-PNG-Photo.png" alt="sold" />
                    }
                  </div>
                </div>
                <div className="px-4 mt-4 md:mt-0">
                  <img className='w-full' src={book?.imageURL} alt="book" />
                  <div className="mt-4 flex justify-end">
                    <button onClick={()=>removeBook(book?._id)} className="bg-red-600 text-white p-2 rounded">Delete</button>
                  </div>
                </div>
              </div>
            </div>
          ))
        :
        <p className="text-center font-bold">No books added yet!!!</p>
      }
    </div>
  )
}

export default BookStatus