import React from 'react'
import { Text } from '@chakra-ui/react'
import { format, formatDistance, subDays } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR/index'
import { FinancialProps } from '../../../../../contexts/financial'

interface TableColumnDateProps {
	item: FinancialProps
}

export const TableColumnDate: React.FC<TableColumnDateProps> = ({ item }) => {
	
	return (
		<>
			<Text fontWeight="bold">{format(new Date(item.dueDate), 'dd/MM/yyyy')}</Text>
			<Text fontSize="sm">{formatDistance(subDays(new Date(item.dueDate), 3), new Date(item.dueDate), { addSuffix: true, locale: ptBR})}</Text>
		</>
	)
}