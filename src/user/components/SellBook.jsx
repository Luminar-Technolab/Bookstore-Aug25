import React from 'react'

function SellBook() {
  return (
    <div className='p-10 my-20 mx-5 bg-gray-200' >
        <h1 className="text-center text-3xl font-medium">Book Details</h1>
        <div className="md:grid grid-cols-2 mt-10 w-full">
          <div className="px-3">
            <div className="mb-3">
              <input placeholder='Book Title' type="text" className="w-full p-2 rounded bg-white" />
            </div>
            <div className="mb-3">
              <input placeholder='Author' type="text" className="w-full p-2 rounded bg-white" />
            </div>
             <div className="mb-3">
              <input placeholder='No. of Pages' type="text" className="w-full p-2 rounded bg-white" />
            </div>
            <div className="mb-3">
              <input placeholder='Book Image URL' type="text" className="w-full p-2 rounded bg-white" />
            </div>
             <div className="mb-3">
              <input placeholder='Original Price' type="text" className="w-full p-2 rounded bg-white" />
            </div>
            <div className="mb-3">
              <input placeholder='Discount Price' type="text" className="w-full p-2 rounded bg-white" />
            </div>
            <div className="mb-3">
              <textarea placeholder='Abstract' type="text" rows={'5'} className="w-full p-2 rounded bg-white" />
            </div>
          </div>
          <div className="px-3">
            <div className="mb-3">
              <input placeholder='Publisher' type="text" className="w-full p-2 rounded bg-white" />
            </div>
            <div className="mb-3">
              <input placeholder='Language' type="text" className="w-full p-2 rounded bg-white" />
            </div>
             <div className="mb-3">
              <input placeholder='ISBN' type="text" className="w-full p-2 rounded bg-white" />
            </div>
            <div className="mb-3">
              <input placeholder='Category' type="text" className="w-full p-2 rounded bg-white" />
            </div>
            <div className="mb-3 flex justify-center items-center mt-10">
              <label htmlFor='uploadProfile'>
                <input type="file"  id="uploadProfile" hidden />
                <img height={'200px'} width={'200px'} src="http://www.pngall.com/wp-content/uploads/2/Upload-Transparent.png" alt="upload" />
              </label>
            </div>
          </div>
        </div>
        <div className="p-3 w-full flex md:justify-end justify-center mt-8 ">
          <button className="py-2 px-3 rounded bg-gray-600 text-white hover:bg-white hover:text-gray-600">RESET</button>
          <button className="py-2 px-3 rounded bg-blue-600 text-white hover:bg-white hover:text-blue-600 ms-5">SUBMIT</button>
        </div>
    </div>
  )
}

export default SellBook