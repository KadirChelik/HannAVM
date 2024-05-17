// http-common.js
import axios from 'axios';

const http = axios.create({
  baseURL: "http://hann-avm-frontend.vercel.app", // your server base URL
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json;charset=UTF-8"
  }
});

export default http;