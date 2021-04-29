
import React, { createContext, useContext, useState } from 'react'

export type FinancialProps = {
	expectedValue: number
	value: number
	dueDate: string
	date: string
	financialType: 0 | 1 | 2 | 3
	description: string
	id: string
	createdAt: string
}

interface FinancialContextProps {
	items: FinancialProps[]
}

const context = createContext<FinancialContextProps>({} as FinancialContextProps)

export const FinancialProvider: React.FC = ({ children }) => {
	const [items, setItems] = useState<FinancialProps[]>([
		{
			expectedValue: 58.09,
			value: 58.09,
			dueDate: "2021-04-24T00:20:21.288",
			date: "2021-04-24T00:20:21.288",
			financialType: 0,
			description: "Example 3",
			id: "f19f0f80-1b04-487e-8369-e3eade8e2b9f",
			createdAt: "2021-04-26T04:13:40.858077"
		},
		{
			expectedValue: 58.09,
			value: 58.09,
			dueDate: "2021-04-24T00:20:21.288",
			date: "2021-04-24T00:20:21.288",
			financialType: 0,
			description: "Example 4",
			id: "6a9fb1a6-76c4-4784-b067-f127fd800031",
			createdAt: "2021-04-26T04:13:44.093099"
		},
		{
			expectedValue: 58.09,
			value: 58.09,
			dueDate: "2021-04-24T00:20:21.288",
			date: "2021-04-24T00:20:21.288",
			financialType: 0,
			description: "Example 5",
			id: "e90e8536-0fc6-432e-9d5b-f1748ccfa239",
			createdAt: "2021-04-26T04:13:47.405891"
		},
		{
			expectedValue: 58.09,
			value: 58.09,
			dueDate: "2021-04-24T00:20:21.288",
			date: "2021-04-24T00:20:21.288",
			financialType: 0,
			description: "Example 6",
			id: "ef1f135d-44bc-438b-aa7d-5b8c136da2cd",
			createdAt: "2021-04-26T04:13:50.629166"
		}
	])

	return (
		<context.Provider value={{ items }}>
			{children}
		</context.Provider>
	)
}

export const useFinancial = () => useContext(context)