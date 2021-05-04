import React, { useEffect, useState } from 'react'
import { Box, Flex, Heading, Table, Tbody, Td, Th, Thead, Tr, useColorMode, useToast } from '@chakra-ui/react'
import { Header, Sidebar } from '../../components'
import { useFinancial } from '../../contexts/financial'
import { FinancialCreate } from './components/create'
import { useAccount } from '../../contexts'
import { useHistory, useLocation, useParams } from 'react-router'
import { TableColumnDescription } from './components/table/colunms/description'
import { TableColumnDate } from './components/table/colunms/date'
import { TableColumnAmount } from './components/table/colunms/amount'
import { TableColumnNavbar } from './components/table/colunms/navbar'

export const FinancialList: React.FC = () => {
	const { pathname } = useLocation();
	const { items, exclude, remove } = useFinancial()
	const { dragEnd } = useAccount()
	const toast = useToast()
	const { colorMode } = useColorMode()
	const [isCreate, setIsCreate] = useState(false)
	const { id } = useParams<{ id: string }>()
  const { push } = useHistory();

	useEffect(() => {
		if (dragEnd) {
			const { over, active: { id } } = dragEnd
			id && exclude(id).then(() => {
				if (over && over.data && over.data.current) {
					const { data: { current: { description } } } = over

					toast({
						title: `Lançamento movido para conta ${description.toLowerCase()}.`,
						position: "top",
						isClosable: true,
					})
				}

			})
		}
	}, [dragEnd])

	useEffect(() => setIsCreate(pathname.split('/').includes('create') || pathname.split('/').includes('edit')), [pathname])

	return (
		<Box>
				<Header />
				<Flex w="100%" my={6} maxW={1480} mx="auto" px={6}>
					<Sidebar />
					<Box flex={1} borderRadius={8} bg={colorMode === "light" ? "gray.50" : "gray.700"} p="8" pb={28}>
						<Flex mb={8} justify="space-between" align="center">
							<Heading size="sm" fontWeight="normal"></Heading>

							<FinancialCreate open={isCreate} />
						</Flex>

						<Table>
							<Thead>
								<Tr>
									<Th>Descrição</Th>
									<Th>Data de cadastro</Th>
									<Th>Valor</Th>
									<Th></Th>
								</Tr>
							</Thead>
							<Tbody>
								{items.map(item => (
									<>
										<Tr key={item.id}>
											<Td>
												<TableColumnDescription item={item} />
											</Td>
											<Td>
												<TableColumnDate item={item} />
											</Td>
											<Td textAlign="end">
												<TableColumnAmount item={item} />
											</Td>
											<Td>
												<TableColumnNavbar item={item} />
											</Td>
										</Tr>
									</>
								))}
							</Tbody>
						</Table>
					</Box>
				</Flex>
		</Box>
	)
}