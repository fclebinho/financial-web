
import React, { createContext, useContext, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { getAllFinancial, removeFinancial, createFinancial, updateFinancial } from '../services'

export interface FilterProps {
	financialType: 0 | 1 | 2 | 3
	StartDate?: string
	EndDate?: string
	AccountId?: string
	PageIndex?: number
	PageSize?: number
	Search?: string
}

export type FinancialProps = {
	expectedValue: number
	value: number
	dueDate: string
	date: string
	financialType: number
	description: string
	id?: string
	createdAt?: string
}

interface FinancialContextProps {
	items: FinancialProps[]
	getById(id: string): void
	getAll(filters: FilterProps): Promise<any>
	create(financial: FinancialProps): Promise<void>
	update(financial: FinancialProps): Promise<any> 
	remove(id: string): Promise<void>
	exclude(id: string): Promise<void>
}

const context = createContext<FinancialContextProps>({} as FinancialContextProps)

export const FinancialProvider: React.FC = ({ children }) => {
	const [loading, setLoading] = useState(false)
	const [hasNextPage, setHasNextPage] = useState(false)
	const [items, setItems] = useState<FinancialProps[]>([
		{
			expectedValue: 58.09,
			value: 58.09,
			dueDate: "2021-04-24T00:20:21.288",
			date: "2021-04-24T00:20:21.288",
			financialType: 0,
			description: "Supermercado Condor",
			id: "f19f0f80-1b04-487e-8369-e3eade8e2b9f",
			createdAt: "2021-04-26T04:13:40.858077"
		},
		{
			expectedValue: 58.09,
			value: 58.09,
			dueDate: "2021-04-24T00:20:21.288",
			date: "2021-04-24T00:20:21.288",
			financialType: 0,
			description: "Shopping Estação",
			id: "6a9fb1a6-76c4-4784-b067-f127fd800031",
			createdAt: "2021-04-26T04:13:44.093099"
		},
		{
			expectedValue: 58.09,
			value: 58.09,
			dueDate: "2021-04-26T00:20:21.288",
			date: "2021-04-26T00:20:21.288",
			financialType: 0,
			description: "Coritiba Futebol Clube",
			id: "e90e8536-0fc6-432e-9d5b-f1748ccfa239",
			createdAt: "2021-04-26T04:13:47.405891"
		},
		{
			expectedValue: 9999866.87,
			value: 9999866.87,
			dueDate: "2021-04-29T00:20:21.288",
			date: "2021-04-29T00:20:21.288",
			financialType: 0,
			description: "Casa China",
			id: "ef1f135d-44bc-438b-aa7d-5b8c136da2cd",
			createdAt: "2021-04-26T04:13:50.629166"
		}
	])

	const getById = (id: string) => {}

	const getAll = (filters: FilterProps) => new Promise((resolve, reject) => {
		// setError(false)
		setLoading(true)

		if (!filters.PageIndex || filters.PageIndex === 1) setItems([])

		getAllFinancial(filters).then(({ data, status, statusText }) => {
				switch (status) {
						case 200:
								setItems((values) => [...values, ...data])
								setLoading(false)
								setHasNextPage(data.length > 0)
								resolve(data)
								break
						default:
								// enqueueSnackbar(statusText, {
								// 		variant: 'error',
								// })
								reject(statusText)
				}
		})
})

	const create = async (financial: FinancialProps): Promise<void> => {
		return new Promise<void>((resolve, reject) => {
			createFinancial(financial).then(response => {
				const { status, data } = response

				switch (status) {
					case 201: {
						console.log('create', data)
						setItems(items => [data, ...items])
						resolve()
						break
					}
					default: reject(response)
				}
			})
		})
	}

	const update = (financial: FinancialProps): Promise<any> => new Promise<void>((resolve, reject) => {
		updateFinancial(financial).then(response => {
			const { status, data } = response

			switch (status) {
				case 200: {
					console.log('update', data)
					setItems(items => items.map(item => item.id === data.id ? data : item))
					resolve(data)
					break
				}
				default: reject(response)
			}
		})
	})
	
	const remove = async (id: string): Promise<void> => {
		return new Promise<void>((resolve, reject) => removeFinancial(id)
			.then(response => {
				const { status } = response

				switch (status) {
					case 200: {

						exclude(id)
						resolve()
						break
					}
					default: reject(response)
				}
			})
		)
	}

	// Remove somente o registro local
	const exclude = async (id: string): Promise<void> => new Promise(resolve => resolve(setItems(items => items.filter(item => item.id !== id))))

	return (
		<context.Provider value={{ items, getById, getAll, create, update, remove, exclude }}>
			{children}
		</context.Provider>
	)
}

export const useFinancial = () => useContext(context)