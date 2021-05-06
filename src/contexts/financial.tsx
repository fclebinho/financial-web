
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
	loading: boolean
	items: FinancialProps[]
	hasNextPage: boolean
	error: boolean
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
	const [error, setError] = useState(false)
	const [items, setItems] = useState<FinancialProps[]>([])

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
		}).finally(() => setLoading(false))
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
		<context.Provider value={{ loading, items, hasNextPage, error, getById, getAll, create, update, remove, exclude }}>
			{children}
		</context.Provider>
	)
}

export const useFinancial = () => useContext(context)