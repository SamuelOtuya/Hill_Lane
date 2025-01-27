import axios from "axios"

const API  = axios.create({
    baseURL:"https://admin-carmart.windsormotors.co.ke"
    // baseURL:"https://admin.urbandrive.co.ke/"
})

export default API;