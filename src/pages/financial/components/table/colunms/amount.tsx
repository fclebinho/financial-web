import React from 'react'
import { Box, Flex, Text } from '@chakra-ui/react'
import { FinancialProps } from '../../../../../contexts/financial'

interface TableColumnAmountProps {
	item: FinancialProps
}

export const TableColumnAmount: React.FC<TableColumnAmountProps> = ({ item }) => {
	
	return (
		<>
			<Text fontWeight="bold">{item.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Text>
			<Text fontWeight="normal" fontSize={12}>
				<Flex justify="space-between">
					<Box>Valor pendente</Box> 
					<Box>{item.expectedValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Box>
				</Flex>
			</Text>
		</>
	)
}