import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://api-iptv.onrender.com',
})
