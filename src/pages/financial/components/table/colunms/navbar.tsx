import React, { useEffect, useState } from 'react'
import { Flex, Icon, IconButton, useToast } from '@chakra-ui/react'
import { useHistory, useLocation, useParams } from 'react-router'
import { FiTrash2, FiEdit3 } from 'react-icons/fi'
import { ConfirmButton } from '../../../../../components'
import { useFinancial } from '../../../../../contexts'
import { FinancialProps } from '../../../../../contexts/financial'

interface TableColumnNavbarProps {
	item: FinancialProps
}

export const TableColumnNavbar: React.FC<TableColumnNavbarProps> = ({ item }) => {
	const { push } = useHistory()
	const { pathname } = useLocation()
	const { id } = useParams<{ id: string }>()
	const { remove } = useFinancial()
	const toast = useToast()
	const [isDeleting, setIsDeleting] = useState(false)

	useEffect(() => {
		if (!pathname.split('/').includes('delete'))
			return

		if (item.id !== id) return

		console.log('useEffect', id)
		setIsDeleting(true)
		remove(id).then(data => {
		 	push('/financial')
		 	toast({
		 		 		title: `Lançamento removido com sucesso.`,
		 		 		position: "top",
		 		 		isClosable: true,
		 		 		status: "success",
		 	})
 
		}).finally(() => setIsDeleting(false))
	}, [pathname])

	return (
		<Flex justify="flex-end">
			<IconButton bg="none" onClick={() => push(`/financial/edit/${item.id}`)} aria-label="Light theme"><Icon as={FiEdit3}/></IconButton>
			<ConfirmButton isLoading={isDeleting && item.id === id} bg="none" aria-label="Light theme" onClick={() => push(`/financial/delete/${item.id}`)}>
				<Icon as={FiTrash2}/>
			</ConfirmButton>
		</Flex>
	)
}