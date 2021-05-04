import api from './api'
import { CredentialProps } from '../contexts/auth'
import { AxiosResponse } from 'axios'

export const consts = {
	AUTH_USER: '@app:user',
	AUTH_TOKEN: '@app:token',
}

export interface AuthAxiosResponseProps<T = any> extends AxiosResponse {
	email: string
	id: string
}

export interface StorageDataProps {
	email: string
	id: string
	token: string
}

export interface ProfileProps {
	email: string
	id: string
}

export const login = (
	credentials: CredentialProps
): Promise<AuthAxiosResponseProps<any>> => new Promise<AuthAxiosResponseProps<any>>((resolve, reject) => api.post('/api/identity/login', credentials).then(response => {
	const { data:token, status } = response
	switch (status) {
		case 200: {
			const [userEmail, id] = JSON.parse(atob(token.split('.')[1])).unique_name

			localStorage.setItem(consts.AUTH_USER, JSON.stringify({ email: userEmail, id }))
			localStorage.setItem(consts.AUTH_TOKEN, token)

			api.defaults.headers.Authorization = `Bearer ${token}`

			Object.assign(response, { email: userEmail, id, token })
			resolve(response as AuthAxiosResponseProps)
			break
		}
		default: reject(response)
	}
}))

export const logout = () => {
	localStorage.removeItem(consts.AUTH_USER)
	localStorage.removeItem(consts.AUTH_TOKEN)
}

export const token = (): string  => {
	const storagedToken = localStorage.getItem(consts.AUTH_TOKEN)
	return storagedToken ? storagedToken : '' 
}

export const profile = () => new Promise<ProfileProps | null>((resolve, reject) => {
	const storagedUser = localStorage.getItem(consts.AUTH_USER)
  
	if (storagedUser) {
		resolve(JSON.parse(storagedUser) as ProfileProps) 
	}
		
	reject(null) 
}) 