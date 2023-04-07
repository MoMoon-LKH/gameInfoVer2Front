import axios from "axios";
import { useNavigate } from 'react-router-dom';

export const backUrl = "https://gameinfo.momoon.kro.kr/api";
//export const backUrl = "http://localhost:8080/api";

export const customAxios = axios.create({
    baseURL: backUrl,
})

async function refreshAccessToken() {

    try {
        const memberId = JSON.parse(localStorage.getItem('gameinfo')).member.id
        const response = await customAxios.post("/auth/reissue-token", {id: memberId}, {
            withCredentials: true
        })
        localStorage.removeItem('gameinfo')
        localStorage.setItem('gameinfo', JSON.stringify(response.data))
        return response.data.accessToken
    } catch (error) {
        localStorage.removeItem('gameinfo')
        throw error
    }

}

customAxios.interceptors.request.use(
    async (config) => {
        const token = JSON.parse(localStorage.getItem('gameinfo'))

        if(token) {
            config.headers.Authorization = token.accessToken
        }

        return config;
    },
    async (error) => {
        
        return Promise.reject(error)
    }
)

customAxios.interceptors.response.use(
    async (response) => {
        return response
    },
    async (error) => {
        const response = error.response

        if((response.status === 401 || response.status === 403) && !error.config._retry) {
            
            error.config._retry = true

            let token = await refreshAccessToken();

            error.config.headers.Authorization = token

            return axios(error.config)
        }
        
        const navigate = useNavigate()
        localStorage.removeItem('gameinfo')
        alert('다시 로그인 후 시도해주세요')
        navigate('/login')

        return Promise.reject(error)
    }
)

export default customAxios;