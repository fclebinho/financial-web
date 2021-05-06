import axios from 'axios'
import { env } from 'node:process'
import { consts } from './auth'

const ClearStorage = () => {
    localStorage.removeItem(consts.AUTH_USER)
    localStorage.removeItem(consts.AUTH_TOKEN)
}

export const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost',
    headers: { 'Content-Type': 'application/json' },
})

// Add a request interceptor
api.interceptors.request.use(
    (config) => {
        const storagedToken = localStorage.getItem(consts.AUTH_TOKEN)

				console.log('pi.interceptors.request.use', 'antes', storagedToken)
        if (!!!storagedToken) return config
				console.log('pi.interceptors.request.use', 'depois')

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
