import React from 'react'

function Purchase() {
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
              <img width={'120px'} height={'120px'} src="https://static.vecteezy.com/system/resources/previews/023/629/698/non_2x/web-button-icon-purchase-button-free-png.png" alt="purchase" />
              </div>
          </div>
          <div className="px-4 mt-4 md:mt-0">
            <img className='w-full' src="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1654371463i/18144590.jpg" alt="book" />
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default Purchase