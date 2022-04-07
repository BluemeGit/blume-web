import axios from "axios";
// const baseURL = 'http://118.67.134.32:3000';
const baseURL = "https://backend.maeee.co.kr";
// const baseURL = "http://localhost:5000";
export const fetcher = (url: string) => axios.get(baseURL + url).then((res) => res.data);

