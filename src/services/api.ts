import axios from 'axios'
import { env } from 'node:process'

const CONSTS = {
    AUTH_USER: '@App:user',
    AUTH_TOKEN: '@App:token',
}

const ClearStorage = () => {
    sessionStorage.removeItem(CONSTS.AUTH_USER)
    sessionStorage.removeItem(CONSTS.AUTH_TOKEN)
}

export const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost',
    headers: { 'Content-Type': 'application/json' },
})

// Add a request interceptor
api.interceptors.request.use(
    (config) => {
        const storagedToken = sessionStorage.getItem(CONSTS.AUTH_TOKEN)

        if (storagedToken) return config

        // Do something before request is sent
        return {
            ...config,
            headers: {
                Authorization: `Bearer ${storagedToken}`,
                ...config.headers,
            },
        }
    },
    (error) => {
        // Do something with request error
        return Promise.reject(error)
    }
)

api.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        const response = { ...error.response }

        if (response.status === 401) ClearStorage()
        return Promise.resolve(response)
    }
)

export default api
