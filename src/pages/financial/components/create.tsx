import React, { useEffect, useState } from 'react'
import { Button } from '@chakra-ui/react';
import { useHistory, useLocation } from 'react-router';
import { RiAddLine } from 'react-icons/ri';
import { FinancialForm } from './form';
import { useFinancial } from '../../../contexts';
import { FinancialProps } from '../../../contexts/financial';

interface UpdateFinancialProps {}

const FINANCIAL = {
	expectedValue: 0,
	value: 0,
	dueDate: new Date().toISOString(),
	date: new Date().toISOString(),
	financialType: 0,
	description: ""
}

export const FinancialCreate: React.FC<UpdateFinancialProps> = () => {
  const { push } = useHistory();
	const { pathname } = useLocation()
	const { create } = useFinancial()
	const [isLoading, setIsLoading] = useState(false)
	const [financial, setFinancial] = useState<FinancialProps>(FINANCIAL)
	const [opened, setOpened] = useState(false)

	const handleOnClose = () => {
		setFinancial(FINANCIAL)
		push('/financial')
	}

	const handleConfirm = (financial: FinancialProps) => {
		setIsLoading(true)
		create(financial).then(() => {
			setFinancial(FINANCIAL)
			push('/financial')
		}).finally(() => setIsLoading(false))
	}

	useEffect(() => setOpened(pathname.split('/').includes('create')), [pathname])

	// useEffect(() => setFinancial(FINANCIAL), [open])

	return (
		<>
			<Button leftIcon={<RiAddLine />} size="sm" colorScheme="red" onClick={() => {	push('/financial/create')}}>
      	Criar novo
      </Button>
			{opened && <FinancialForm isLoading={isLoading} financial={financial} open={true} onClose={handleOnClose} onConfirm={handleConfirm}/>}
		</>
	)
}