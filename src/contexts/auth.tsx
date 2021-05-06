import React, { createContext, useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { loginAuth, logoutAuth, tokenAuth } from '../services'

export interface CredentialProps {
    email: string
    password: string
}

interface AuthContextData {
    loading: boolean
		login(credentials: CredentialProps): Promise<any>
    logout(): void
		signed: boolean
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider: React.FC = ({ children }) => {
    const [loading, setLoading] = useState(false)

		const login = async (credentials: CredentialProps) => new Promise<any>((resolve, reject) => {
			setLoading(true)
			loginAuth(credentials).then(response => {
				const { status } = response

				switch (status) {
					case 200: {
						// setUser({ email, id })
						resolve(response)
						break
					}
					default: reject(response)
				}
			}).finally(() => setLoading(false))
		})

    const logout = () => {
			logoutAuth()
    }

    return (
        <AuthContext.Provider
            value={{ loading, login, logout, signed: Boolean(tokenAuth()) }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = (): AuthContextData => useContext(AuthContext)

export default AuthContext
