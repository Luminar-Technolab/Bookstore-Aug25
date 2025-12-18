import React,{useState,useEffect} from 'react'
import { getAllUserBoughtBooksAPI } from '../../services/allAPI'

function Purchase() {

  const [allBooks,setAllBooks] = useState([])

  console.log(allBooks);

  useEffect(()=>{
    getAllUserPurchaseBooks()
  },[])

  const getAllUserPurchaseBooks = async ()=>{
      const token = sessionStorage.getItem("token")
      if(token){
        const reqHeader = {
          "Authorization":`Bearer ${token}`
        }
        const result = await getAllUserBoughtBooksAPI(reqHeader)
        if(result.status==200){
          setAllBooks(result.data)
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
                    <img width={'120px'} height={'120px'} src="https://static.vecteezy.com/system/resources/previews/023/629/698/non_2x/web-button-icon-purchase-button-free-png.png" alt="purchase" />
                  </div>
                </div>
                <div className="px-4 mt-4 md:mt-0">
                  <img className='w-full' src={book?.imageURL} alt="book" />
               
                </div>
              </div>
            </div>
          ))
        :
        <p className="text-center font-bold">No books purchased yet!!!</p>
      }
     
    </div>
  )
}

export default Purchase