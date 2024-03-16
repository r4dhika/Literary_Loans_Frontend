import axios from 'axios'

const baseURL = process.env.SERVER_URL

const axiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  baseURL,
  withCredentials: true,
})


export default axiosInstance
