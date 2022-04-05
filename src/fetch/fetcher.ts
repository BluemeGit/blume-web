import axios from 'axios'
const baseURL = 'http://localhost:5000';
// const baseURL = 'https://backend.maeee.co.kr';
export const fetcher = (url: string) => axios.get(baseURL + url).then(res => res.data)