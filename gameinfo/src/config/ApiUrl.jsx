import axios from "axios";

export const backUrl = "https://gameinfo.momoon.kro.kr/api";

const customAxios = axios.create({
    baseURL: backUrl,
    withCredentials: true
})

export default customAxios;