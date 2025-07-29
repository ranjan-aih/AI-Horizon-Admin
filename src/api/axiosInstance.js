import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api', // Update with your backend URL
    withCredentials: true, // if using cookies/auth
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;