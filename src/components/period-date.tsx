import React, { useEffect, useState } from 'react'
import { Flex, Icon, IconButton, Text } from '@chakra-ui/react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import {
	format,
	startOfMonth,
	endOfMonth,
	addMonths,
	subMonths,
	getYear,
} from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR/index'

interface PeriodDateProps {
	onSelected(startDate: string, endDate: string): void
}

export const PeriodDate: React.FC<PeriodDateProps> = ({ onSelected }) => {
	const [period, setPeriod] = useState({
			start: startOfMonth(Date.now()),
			end: endOfMonth(Date.now()),
	})

	const Navigate = (startDate: Date) => {
			setPeriod({
					start: startOfMonth(startDate),
					end: endOfMonth(startDate),
			})
	}

	const handleDecMonth = () => {
			const date = subMonths(startOfMonth(new Date(period.start)), 1)
			Navigate(date)
	}

	const handleIncMonth = () => {
			const date = addMonths(startOfMonth(new Date(period.start)), 1)
			Navigate(date)
	}

	const convertDate = (date: Date) =>
			format(date, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")

	const selected = (): void =>
			onSelected(convertDate(period.start), convertDate(period.end))

	useEffect(() => {
			selected()
	}, [period])

	return (
		<Flex align="center">
			<IconButton bg="none" fontSize={20} onClick={handleDecMonth} aria-label="Light theme">{<Icon as={FiChevronLeft}/> }</IconButton>
			<Flex w={160} justify="center">
				<Text>
					{format(new Date(period.start), 'LLLL', {locale: ptBR}).toUpperCase()} {getYear(period.start) !== getYear(Date.now()) && ` | ${getYear(period.start)}`}
				</Text>
			</Flex>
			<IconButton bg="none" fontSize={20} onClick={handleIncMonth} aria-label="Light theme">{<Icon as={FiChevronRight}/> }</IconButton>
		</Flex>
	)
} 