import axios from 'axios'

//Created custom axios instance for all get request with bearer token
const instance = axios.create({
  baseURL: 'https://dl5opah3vc.execute-api.ap-south-1.amazonaws.com'
})
let token = localStorage.getItem('token')
instance.defaults.headers.get['Authorization'] = `Bearer ${token}`

export default instance