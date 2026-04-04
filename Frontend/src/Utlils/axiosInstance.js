import axios from "axios";

const token = localStorage.getItem("accessToken") ? JSON.parse(localStorage.getItem("accessToken")) : null
const refresh_token = localStorage.getItem("refreshToken") ? JSON.parse(localStorage.getItem("refreshToken")) : null



const baseURL = 'http://localhost:8000/api/v1/'
const axiosInstance = axios({
  baseURL : baseURL,
  'content-type' : 'application',
  header : {
    'Authorization' : localStorage.getItem("access") ? `Bearer ${token}` : null
  },

})

export default axiosInstance