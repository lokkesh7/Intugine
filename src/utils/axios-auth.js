import axios from 'axios'

//Created custom axios instance for all get request with bearer token
const instance = axios.create({
  baseURL: 'https://dl5opah3vc.execute-api.ap-south-1.amazonaws.com'
})
instance.interceptors.request.use(
  (config) => {
    let token = localStorage.getItem('token');

    if (token) {
      config.headers['Authorization'] = `Bearer ${ token }`;
    }

    return config;
  }
)

export default instance