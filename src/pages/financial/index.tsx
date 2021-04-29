import React from 'react'
import { Box, Button, Flex, Heading, HStack, Icon, IconButton, Table, Tbody, Td, Text, Th, Thead, Tooltip, Tr, useColorMode, useDisclosure } from '@chakra-ui/react'
import { Header, Sidebar } from '../../components'
import { RiAddLine, RiMoneyCnyBoxFill, RiPencilLine, RiTrainLine, RiWaterFlashLine } from 'react-icons/ri'
import { useFinancial } from '../../contexts/financial'
import { format, formatDistance, subDays } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR/index'
import { CreateFinancial } from './create'

export const FinancialList: React.FC = () => {
	const { items } = useFinancial()
	const { colorMode } = useColorMode()

	return (
		<Box>
				<Header />
				<Flex w="100%" my={6} maxW={1480} mx="auto" px={6}>
					<Sidebar />
					<Box flex={1} borderRadius={8} bg={colorMode === "light" ? "gray.50" : "gray.700"} p="8" pb={28}>
						<Flex mb={8} justify="space-between" align="center">
							<Heading size="sm" fontWeight="normal"></Heading>

							<CreateFinancial />
						</Flex>

						<Table>
							<Thead>
								<Tr>
									<Th>Descrição</Th>
									<Th>Data de cadastro</Th>
									<Th>Valor</Th>
								</Tr>
							</Thead>
							<Tbody>
								{items.map(item => (
									<Tr key={item.id}>
										<Td>
											<Box>
												<Text fontWeight="bold">{item.description}</Text>
												<Text fontSize="sm">{item.id}</Text>
											</Box>
										</Td>
										<Td>
											<Text fontWeight="bold">{format(new Date(item.dueDate), 'dd/MM/yyyy')}</Text>
											<Text fontSize="sm">{formatDistance(subDays(new Date(item.dueDate), 3), new Date(item.dueDate), { addSuffix: true, locale: ptBR})}</Text>
										</Td>
										<Td>{item.value}</Td>
									</Tr>
								))}
							</Tbody>
						</Table>
					</Box>
				</Flex>
		</Box>
	)
}