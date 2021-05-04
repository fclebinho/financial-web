import React, { useEffect, useState } from 'react'
import { Button } from '@chakra-ui/react';
import { useHistory, useParams } from 'react-router';
import { RiAddLine } from 'react-icons/ri';
import { FinancialForm } from './form';
import { useFinancial } from '../../../contexts';
import { FinancialProps } from '../../../contexts/financial';

interface CreateFinancialProps {
	open: boolean
}

const FINANCIAL = {
	expectedValue: 0,
	value: 0,
	dueDate: new Date().toISOString(),
	date: new Date().toISOString(),
	financialType: 0,
	description: ""
}

export const FinancialCreate: React.FC<CreateFinancialProps> = ({ open }) => {
  const { push } = useHistory();
	const { id } = useParams<{ id: string }>()
	const { create } = useFinancial()
	const [isLoading, setIsLoading] = useState(false)

	const handleOnClose = () => push('/financial')

	const handleConfirm = (financial: FinancialProps) => {
		setIsLoading(true)
		create(financial).then(() => {
			console.log('promise')
			push('/financial')
		}).finally(() => setIsLoading(false))
	}

	useEffect(() => console.log(id), [id])

	return (
		<>
			<Button leftIcon={<RiAddLine />} size="sm" colorScheme="red" onClick={() => {	push('/financial/create')}}>
      	Criar novo
      </Button>
			<FinancialForm isLoading={isLoading} financial={FINANCIAL} open={open} onClose={handleOnClose} onConfirm={handleConfirm}/>
		</>
	)
}