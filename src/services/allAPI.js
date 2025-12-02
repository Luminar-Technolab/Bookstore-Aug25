//regitser - Auth component

import commonAPI from "./commonAPI"
import serverURL from "./serverURL"

export const registerAPI = async (reqBody)=>{
    return await commonAPI("POST",`${serverURL}/register`,reqBody)
}