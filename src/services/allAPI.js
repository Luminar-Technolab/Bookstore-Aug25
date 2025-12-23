//regitser - Auth component

import commonAPI from "./commonAPI"
import serverURL from "./serverURL"

//register api - called by Auth component, when register btn clicked
export const registerAPI = async (reqBody)=>{
    return await commonAPI("POST",`${serverURL}/register`,reqBody)
}

//login api - called by Auth component, when login btn clicked
export const loginAPI = async (reqBody)=>{
    return await commonAPI("POST",`${serverURL}/login`,reqBody)
}

// google login api:  called by Auth component, when google login btn clicked
export const googleLoginAPI = async (reqBody)=>{
    return await commonAPI("POST",`${serverURL}/google-login`,reqBody)
}

///user/add/book : add book api - alled by sellBook ,when add book btn click
export const addBookAPI = async (reqBody,reqHeader)=>{
    return await commonAPI("POST",`${serverURL}/user/add/book`,reqBody,reqHeader)
}

//home books : /home/books - called by home compoennt when page loads
export const getHomePageBooksAPI = async ()=>{
    return await commonAPI("GET",`${serverURL}/home/books`,{})
}

//all-books : get request by books componnet when page loaded
export const getAllBooksPageAPI = async (reqHeader,searchKey)=>{
    return await commonAPI("GET",`${serverURL}/all-books?search=${searchKey}`,{},reqHeader)
}

//user-books : get request by bookstatus when it loads
export const getAllUserProfileBooksAPI = async (reqHeader)=>{
    return await commonAPI("GET",`${serverURL}/user-books`,{},reqHeader)
}
//user-books/bought : get request by purchase compoennet when it loads
export const getAllUserBoughtBooksAPI = async (reqHeader)=>{
    return await commonAPI("GET",`${serverURL}/user-books/bought`,{},reqHeader)
}
///user/:id/edit - put requst by edit compoenent when update btn clicked
export const editUserAPI = async (id,reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${serverURL}/user/${id}/edit`,reqBody,reqHeader)
}

//books/:id/view : GET rqst by view component when page loads
export const viewBookAPI = async (id,reqHeader)=>{
    return await commonAPI("GET",`${serverURL}/books/${id}/view`,{},reqHeader)
}
//books/all :GET reqst by Admin collection when it lads
export const getAllAdminBooksAPI = async (reqHeader)=>{
    return await commonAPI("GET",`${serverURL}/books/all`,{},reqHeader)
}

//users/all :GET reqst by Admin collection when it lads
export const getAllUsersAPI = async (reqHeader)=>{
    return await commonAPI("GET",`${serverURL}/users/all`,{},reqHeader)
}