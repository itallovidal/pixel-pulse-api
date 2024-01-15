import axios from 'axios'

export const igdbAPI = axios.create({
  baseURL: `https://api.igdb.com/v4`,
  headers: {
    'Content-Type': 'text/plain',
    Authorization: 'Bearer 896ql6zfginwb173n2y1zfadli5q9m',
    'Client-ID': `2ty2mja5wgqlcu4uqzvcfrci2r6izl`,
  },
})
