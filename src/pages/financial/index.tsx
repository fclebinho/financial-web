import React, { useEffect, useState } from 'react'
import { Box, Flex, Spinner, Table, Tbody, Td, Th, Thead, Tr, useColorMode, useToast } from '@chakra-ui/react'
import { Header, PeriodDate, Sidebar } from '../../components'
import { useFinancial } from '../../contexts/financial'
import { FinancialCreate } from './components/create'
import { FinancialUpdate } from './components/update'
import { useAccount } from '../../contexts'
import { useHistory, useLocation, useParams } from 'react-router'
import { TableColumnDescription } from './components/table/colunms/description'
import { TableColumnDate } from './components/table/colunms/date'
import { TableColumnAmount } from './components/table/colunms/amount'
import { TableColumnNavbar } from './components/table/colunms/navbar'
import useInfiniteScroll from 'react-infinite-scroll-hook'

interface PeriodProps {
	start: string
	end: string
}

export const FinancialList: React.FC = () => {
	const {  } = useFinancial()
	const { pathname } = useLocation();
	const { loading, items, hasNextPage, error, exclude, getAll} = useFinancial()
	const { dragEnd } = useAccount()
	const toast = useToast()
	const { colorMode } = useColorMode()
	const [isCreate, setIsCreate] = useState<string>("undefined")
	const { id } = useParams<{ id: string }>()
  const { push } = useHistory();
	const [period, setPeriod] = useState<PeriodProps | undefined>(undefined)
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

	const handleOnSelected = (startDate: string, endDate: string): void => {
		setPeriod({ start: startDate, end: endDate })
		console.log(period)
	}

	const handleOnClick = () => {
		if (!period) return

		setPageIndex((index) => index + 1)
		getAll({
				financialType: 0,
				StartDate: period.start,
				EndDate: period.end,
				PageIndex: pageIndex,
		})
	}
        
	const [sentryRef] = useInfiniteScroll({
		loading,
		hasNextPage,
		onLoadMore: handleOnClick,
		disabled: !!error,
		rootMargin: '0px 0px 400px 0px',
	})

	return (
		<Box>
				<Header />
				<Flex w="100%" my={6} maxW={1480} mx="auto" px={6}>
					<Sidebar />
					<Box flex={1} borderRadius={8} bg={colorMode === "light" ? "gray.50" : "gray.700"} p="8" pb={28}>
						<Flex mb={8} justify="space-between" align="center">
							<Box />
							<Box>
								<PeriodDate onSelected={handleOnSelected} />
							</Box>
							<Box>
								<FinancialCreate />
								<FinancialUpdate />
							</Box>
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

						{(loading || hasNextPage) && (
							<Flex ref={sentryRef} align="center" justify="center" m={6}>
								<Spinner
									thickness="4px"
									speed="0.65s"
									emptyColor="gray.200"
									color="red.500"
									size="lg"
								/>
							</Flex>
            )}
					</Box>
				</Flex>
		</Box>
	)
}