import React, { useEffect, useState } from 'react'
import { Button } from '@chakra-ui/react';
import { useHistory, useLocation, useParams } from 'react-router';
import { RiAddLine } from 'react-icons/ri';
import { FinancialForm } from './form';
import { useFinancial } from '../../../contexts';
import { FinancialProps } from '../../../contexts/financial';
import { getByIdFinancial } from '../../../services';

export const FinancialUpdate: React.FC= () => {
  const { push } = useHistory();
	const { pathname } = useLocation()
	const { id } = useParams<{ id: string }>()
	const { update } = useFinancial()
	const [isLoading, setIsLoading] = useState(false)
	const [localFinancial, setLocalFinancial] = useState<FinancialProps | undefined>(undefined)
	const [opened, setOpened] = useState(false)

	const handleOnClose = () => push('/financial')

	const handleConfirm = (financial: FinancialProps) => {
		setIsLoading(true)
		
		const updated = localFinancial || financial
		Object.assign(updated, financial)
		
		update(updated).then((response) => {
			push('/financial')
		}).finally(() => setIsLoading(false))
	}

	useEffect(() => {
		id && getByIdFinancial(id).then(response => {
			const { status, data } = response
			switch (status) {
				case 200: {
					console.log('getByIdFinancial', data)
					setLocalFinancial(data)
					break
				}
			}
		})
	}, [id])

	useEffect(() => setOpened(pathname.split('/').includes('edit')), [pathname])

	return opened ? <FinancialForm isLoading={isLoading} financial={localFinancial} open={true} onClose={handleOnClose} onConfirm={handleConfirm}/> : <></>
}