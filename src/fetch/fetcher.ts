import axios from "axios";
// const baseURL = 'http://118.67.134.32:3000';
export const baseURL = "https://backend.maeee.co.kr";
// export const baseURL = "http://localhost:5000";

export const fetcher = (url: string) =>
    axios
        .get(baseURL + url, {
            headers: {
                Authorization:
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQ4IiwidHlwZSI6InVzZXIifQ.rva6eLF1_3Pk7c29Sjo8K2_M-xkElaQDztFLdcu2XMY",
            },
        })
        .then((res) => res.data);

export const putter = (url: string, data: object) =>
    axios
        .put(baseURL + url, data, {
            headers: {
                Authorization:
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQ4IiwidHlwZSI6InVzZXIifQ.rva6eLF1_3Pk7c29Sjo8K2_M-xkElaQDztFLdcu2XMY",
            },
        })
        .then((res) => res.data);
