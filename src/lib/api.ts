import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://api-iptv-brasil-v1.fly.dev',
})
