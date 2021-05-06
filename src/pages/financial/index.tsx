import React, { useEffect, useState } from 'react'
import { Box, Flex, Heading, Table, Tbody, Td, Th, Thead, Tr, useColorMode, useToast } from '@chakra-ui/react'
import { Header, Sidebar } from '../../components'
import { useFinancial } from '../../contexts/financial'
import { FinancialCreate } from './components/create'
import { FinancialUpdate } from './components/update'
import { useAccount } from '../../contexts'
import { useHistory, useLocation, useParams } from 'react-router'
import { TableColumnDescription } from './components/table/colunms/description'
import { TableColumnDate } from './components/table/colunms/date'
import { TableColumnAmount } from './components/table/colunms/amount'
import { TableColumnNavbar } from './components/table/colunms/navbar'

interface PeriodProps {
	start: string
	end: string
}

export const FinancialList: React.FC = () => {
	const { pathname } = useLocation();
	const { items, exclude, getAll } = useFinancial()
	const { dragEnd } = useAccount()
	const toast = useToast()
	const { colorMode } = useColorMode()
	const [isCreate, setIsCreate] = useState<string>("undefined")
	const { id } = useParams<{ id: string }>()
  const { push } = useHistory();
	const [period, setPeriod] = useState<PeriodProps | undefined>({
		start: "2021-04-05T00:03:21.751Z",
		end: "2021-05-05T00:03:21.751Z"
	})
	const [pageIndex, setPageIndex] = useState(2)

	useEffect(() => {
		if (!period) return

		getAll({
				financialType: 0,
				StartDate: period.start,
				EndDate: period.end,
		})
	}, [period])

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

	useEffect(() => {
		
		if (pathname.split('/').includes('create')) {
			setIsCreate("create")
		} else if (pathname.split('/').includes('edit')) {
			setIsCreate("edit")
		} else {
			setIsCreate("undefined")
		}
		
		console.log('useEffect', 'pathname', pathname, isCreate)
	}, [pathname])

	return (
		<Box>
				<Header />
				<Flex w="100%" my={6} maxW={1480} mx="auto" px={6}>
					<Sidebar />
					<Box flex={1} borderRadius={8} bg={colorMode === "light" ? "gray.50" : "gray.700"} p="8" pb={28}>
						<Flex mb={8} justify="space-between" align="center">
							<Heading size="sm" fontWeight="normal"></Heading>

							<FinancialCreate />
							<FinancialUpdate />
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