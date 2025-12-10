import React from 'react'
import { useState } from 'react'
import { FaPlus } from "react-icons/fa";


function SellBook() {

  const [bookDetails,setBookDetails] = useState({
    title:"",author:"",pages:"",imageURL:"",price:"",discountPrice:"",abstract:"",publisher:"",language:"",isbn:"",category:"",uploadImg:[]
  })
  const [preview,setPreview] = useState("")
  const [previewList,setPreviewList] = useState([])

  console.log(bookDetails);

  const handleBookImageUpload = (e)=>{
    // console.log(e.target.files[0]);
    const file = e.target.files[0]
    const uploadImgArray = bookDetails.uploadImg
    uploadImgArray.push(file)
    setBookDetails({...bookDetails,uploadImg:uploadImgArray})
    const url = URL.createObjectURL(file)
    setPreview(url)
    const demoPreviewList = previewList
    demoPreviewList.push(url)
    setPreviewList(demoPreviewList)
  }
  
  return (
    <div className='p-10 my-20 mx-5 bg-gray-200' >
        <h1 className="text-center text-3xl font-medium">Upload Book Details</h1>
        <div className="md:grid grid-cols-2 mt-10 w-full">
          <div className="px-3">
            <div className="mb-3">
              <input value={bookDetails.title} onChange={e=>setBookDetails({...bookDetails,title:e.target.value})} placeholder='Book Title' type="text" className="w-full p-2 rounded bg-white" />
            </div>
            <div className="mb-3">
              <input value={bookDetails.author} onChange={e=>setBookDetails({...bookDetails,author:e.target.value})} placeholder='Author' type="text" className="w-full p-2 rounded bg-white" />
            </div>
             <div className="mb-3">
              <input value={bookDetails.pages} onChange={e=>setBookDetails({...bookDetails,pages:e.target.value})} placeholder='No. of Pages' type="text" className="w-full p-2 rounded bg-white" />
            </div>
            <div className="mb-3">
              <input value={bookDetails.imageURL} onChange={e=>setBookDetails({...bookDetails,imageURL:e.target.value})} placeholder='Book Image URL' type="text" className="w-full p-2 rounded bg-white" />
            </div>
             <div className="mb-3">
              <input value={bookDetails.price} onChange={e=>setBookDetails({...bookDetails,price:e.target.value})} placeholder='Original Price' type="text" className="w-full p-2 rounded bg-white" />
            </div>
            <div className="mb-3">
              <input value={bookDetails.discountPrice} onChange={e=>setBookDetails({...bookDetails,discountPrice:e.target.value})} placeholder='Discount Price' type="text" className="w-full p-2 rounded bg-white" />
            </div>
            <div className="mb-3">
              <textarea value={bookDetails.abstract} onChange={e=>setBookDetails({...bookDetails,abstract:e.target.value})} placeholder='Abstract' type="text" rows={'5'} className="w-full p-2 rounded bg-white" />
            </div>
          </div>
          <div className="px-3">
            <div className="mb-3">
              <input value={bookDetails.publisher} onChange={e=>setBookDetails({...bookDetails,publisher:e.target.value})} placeholder='Publisher' type="text" className="w-full p-2 rounded bg-white" />
            </div>
            <div className="mb-3">
              <input value={bookDetails.language} onChange={e=>setBookDetails({...bookDetails,language:e.target.value})} placeholder='Language' type="text" className="w-full p-2 rounded bg-white" />
            </div>
             <div className="mb-3">
              <input value={bookDetails.isbn} onChange={e=>setBookDetails({...bookDetails,isbn:e.target.value})} placeholder='ISBN' type="text" className="w-full p-2 rounded bg-white" />
            </div>
            <div className="mb-3">
              <input value={bookDetails.category} onChange={e=>setBookDetails({...bookDetails,category:e.target.value})} placeholder='Category' type="text" className="w-full p-2 rounded bg-white" />
            </div>
            <div className="mb-3 flex justify-center items-center mt-10">
              <label htmlFor='uploadProfile'>
                <input onChange={e=>handleBookImageUpload(e)} type="file"  id="uploadProfile" hidden />
                <img height={'200px'} width={'200px'} src={preview?preview:"http://www.pngall.com/wp-content/uploads/2/Upload-Transparent.png"} alt="upload" />
              </label>
            </div>
            {
              preview &&
              <div className='flex items-center justify-center'>
                {
                  previewList?.map((bookImgURL,index)=>(
                    <img key={index} width={'70px'} height={'70px'} className='mx-2' src={bookImgURL} alt="book image" />
                  ))
                }
                {
                  previewList.length<3 &&
                  <label htmlFor="bookUpload">
                    <input onChange={e=>handleBookImageUpload(e)} type="file" id="bookUpload" hidden/>
                    <FaPlus className='text-3xl ms-2'/>
                  </label>
                }
              </div>
            }
          </div>
        </div>
        <div className="p-3 w-full flex md:justify-end justify-center mt-8 ">
          <button className="py-2 px-3 rounded bg-gray-600 text-white hover:bg-white hover:text-gray-600">RESET</button>
          <button className="py-2 px-3 rounded bg-blue-600 text-white hover:bg-white hover:text-blue-600 ms-5">ADD BOOK</button>
        </div>
    </div>
  )
}

export default SellBook