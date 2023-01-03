import {BASE_URL} from './helper'

import {commonRequest} from './apiCalls'


export const adduser =  async (data,header) =>{
    return await commonRequest("POST", `${BASE_URL}/api/user/register`,data,header)
}


export const getUsers =  async (search,gender,status,sort,page) =>{
     return await commonRequest("GET", 
     `${BASE_URL}/api/user?search=${search}&gender=${gender}&status=${status}&sort=${sort}&page=${page}`, "")
}

export const getSingleUserById = async  (id) =>{
    return await commonRequest("GET", `${BASE_URL}/api/user/${id}`, "")
}

export const editUser = async  (id,data,header) =>{
    return await commonRequest("PUT", `${BASE_URL}/api/user/edit/${id}`,data,header)
}

export const deleteUser = async  (id) =>{
    return await commonRequest("DELETE", `${BASE_URL}/api/user/${id}`,{})
}



export const changedUserStatus = async  (id,data) =>{
    return await commonRequest("PUT", `${BASE_URL}/api/user/status/${id}`,{data})
}

export const exportUserToCSV = async  () =>{
    return await commonRequest("GET", `${BASE_URL}/api/user/export`,"")
}