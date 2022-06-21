import axios from "axios";
// const baseURL = 'http://118.67.134.32:3000';
// export const baseURL = "https://backend.maeee.co.kr";
import { useRecoilValue } from "recoil";
import { userState } from "../recoil/atom";

export const baseURL = "http://localhost:5000";

export const fetcher = (url: string, authToken: string) =>
    axios
        .get(baseURL + url, {
            headers: {
                Authorization: authToken,
            },
        })
        .then((res) => res.data);

export const putter = (url: string, data: object, authToken: string) =>
    axios
        .put(baseURL + url, data, {
            headers: {
                Authorization: authToken,
            },
        })
        .then((res) => res.data);
