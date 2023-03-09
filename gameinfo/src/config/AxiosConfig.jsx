import axios from "axios"
import useAuth from "../auth/useAuth"
import { useEffect } from 'react';
import backUrl from "./ApiUrl";



const useAxiosConfig = () => {
    const {auth} = useAuth();

    useEffect(() => {
        const requestIntercept = customAxios.interceptors.request.use(
            (config) => {
                if(!config.headers['authorization']) {
                    config.headers['authorization'] = auth.accessToken
                }
                return config
            }, (error) => Promise.reject(error)
        )

        const responseIntercept = customAxios.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config

            }
        )

        return () => {
            customAxios.interceptors.request.eject(requestIntercept)
            customAxios.interceptors.response.eject(responseIntercept)
        }
    }, [auth])
}

export default useAxiosConfig