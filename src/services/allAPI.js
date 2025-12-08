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