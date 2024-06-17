// http-common.js
import axios from 'axios';

const http = axios.create({
  baseURL: "https://hann-avm-backend.vercel.app/api", // your server base URL
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json;charset=UTF-8"
  }
});

export default http;