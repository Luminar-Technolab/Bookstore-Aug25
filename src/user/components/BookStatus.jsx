import React from 'react'

function BookStatus() {
  return (
    <div className='p-10 my-20 shadow rounded'>
      {/* duplicate book with status updation */}
      <div className="p-5 rounded mt-4 bg-gray-100">
        <div className="md:grid grid-cols-[3fr_1fr]">
          <div className="px-4">
            <h1 className="text-2xl">Title</h1>
            <h2 className="text-xl">author</h2>
            <h3 className="text-lg text-blue-600">$ price</h3>
            <p className="text-justify">abstract</p>
            <div className="flex mt-3">
              <img width={'120px'} height={'120px'} src="https://psdstamps.com/wp-content/uploads/2022/04/round-pending-stamp-png.png" alt="pending" />
              <img width={'80px'} height={'80px'} src="https://pngimg.com/d/approved_PNG1.png" alt="approve" />
              <img width={'80px'} height={'80px'} src="https://www.pngmart.com/files/7/Sold-PNG-Photo.png" alt="sold" />
            </div>
          </div>
          <div className="px-4 mt-4 md:mt-0">
            <img className='w-full' src="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1654371463i/18144590.jpg" alt="book" />
            <div className="mt-4 flex justify-end">
              <button className="bg-red-600 text-white p-2 rounded">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookStatus