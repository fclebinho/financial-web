
import React, { createContext, useContext, useState } from 'react'

export type AccountProps = {
	description: string
	accountType: number
	id: string
	createdAt: string
}

interface AccountContextProps {
	items: AccountProps[]
}

const context = createContext<AccountContextProps>({} as AccountContextProps)

export const AccountProvider: React.FC = ({ children }) => {
	const [items, setItems] = useState<AccountProps[]>([
		{
			description: "Carteira de bolso",
			accountType: 0,
			id: "f28dcdb2-d2f9-4f4d-a910-2e957c4e100b",
			createdAt: "2021-04-29T15:09:22.993548"
		},
		{
			description: "NuBank",
			accountType: 1,
			id: "f28dcdb2-d2f9-4f4d-a910-2e957c4e100b",
			createdAt: "2021-04-29T15:09:22.993548"
		},
		{
			description: "Santander",
			accountType: 1,
			id: "d1f17b48-dd27-4c02-add9-f5a9d90a518f",
			createdAt: "2021-04-29T15:09:40.416627"
		}
	])

	return (
		<context.Provider value={{ items }}>
			{children}
		</context.Provider>
	)
}

export const useAccount = () => useContext(context)