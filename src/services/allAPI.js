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
