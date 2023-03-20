import axios from "axios";
import { useNavigate } from 'react-router-dom';

export const backUrl = "https://gameinfo.momoon.kro.kr/api";

const customAxios = axios.create({
    baseURL: backUrl,
    withCredentials: true
})

async function refreshAccessToken() {

    let token = null

    customAxios.post("/auth/reissue-token")
    .then(response => {
        localStorage.removeItem('gameinfo')
        localStorage.setItem('gameinfo', JSON.stringify(response.data))
        token = response.data.accessToken
    })
    .catch(error => {
        localStorage.removeItem('gameinfo')
    })

    return token
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
        const original = error.config
        const response = error.response
        

        if((response.status === 401 || response.status === 403) && !original._retry) {
            
            original._retry = true

            const token = await refreshAccessToken();

            original.headers.Authorization = token

            return axios(original)
        }
        const navigate = useNavigate()
        localStorage.removeItem('gameinfo')
        alert('다시 로그인 후 시도해주세요')
        navigate('/login')

        return Promise.reject(error)
    }
)

export default customAxios;