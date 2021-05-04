
import React, { createContext, useContext, useState } from 'react'
import {DndContext, DragEndEvent} from '@dnd-kit/core';

export type AccountProps = {
	description: string
	accountType: number
	id: string
	createdAt: string
}

interface AccountContextProps {
	items: AccountProps[]
	dragEnd: DragEndEvent | null
	getById(id: string): void
	getAll(): void
	create(account: AccountProps): void
	update(account: AccountProps): void
	remove(id: string): void
}

const context = createContext<AccountContextProps>({} as AccountContextProps)

export const AccountProvider: React.FC = ({ children }) => {
	const [dragEnd, setDragEnd] = useState<DragEndEvent | null>(null)
	const [items, setItems] = useState<AccountProps[]>([
		{
			description: "Carteira de bolso",
			accountType: 0,
			id: "g29dcdb2-d2f9-4f4d-a910-2e957c4e200c",
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

	const onDragEnd = (event: DragEndEvent): void => {
		const {active, over} = event;

    if (over && over.data && over.data.current && active && active.data && active.data.current && active.data.current.supports.includes(over.data.current.type)) {
			setDragEnd(event)
			console.log(event)
    }
	}

	const getById = (id: string) => {}

	const getAll = () => {}

	const create = (account: AccountProps) => {}

	const update = (account: AccountProps) => {}
	
	const remove = (id: string) => {}

	return (
		<context.Provider value={{ items, dragEnd, getById, getAll, create, update, remove }}>
			<DndContext onDragEnd={onDragEnd}>
				{children}
			</DndContext>
		</context.Provider>
	)
}

export const useAccount = () => useContext(context)