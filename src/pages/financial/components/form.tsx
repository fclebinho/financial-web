import React, { useEffect, useState } from 'react'
import { Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, FormLabel, Input, Stack } from '@chakra-ui/react'
import { FinancialProps } from '../../../contexts/financial'
import { useForm } from 'react-hook-form'

interface FinancialFormProps {
	open: boolean
	financial: FinancialProps
	isLoading: boolean
	onClose(): void
	onConfirm(financial: FinancialProps): void
}

export const FinancialForm: React.FC<FinancialFormProps> = ({ open, financial, isLoading, onClose, onConfirm }) => {
	const [opened, setOpened] = useState(false)
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
	
	const onSubmit = (data: FinancialProps) => onConfirm(data);

	const handleClose = () => {
		setOpened(open => !open)
		onClose()
	}

	useEffect(() => setOpened(open), [open])

  return (
		<Drawer
			isOpen={opened}
			placement="right"
			onClose={handleClose}
			colorScheme="red"
		>
			<form onSubmit={handleSubmit(onSubmit)}>
			<DrawerOverlay>
				<DrawerContent>
					<DrawerCloseButton onClick={handleClose}/>
					<DrawerHeader borderBottomWidth="1px">
						Create
					</DrawerHeader>

					<DrawerBody>
						<Stack spacing="24px">
							<Box>
								<FormLabel htmlFor="description">description</FormLabel>
								<Input
									size="sm"
									id="description"
									placeholder="Please enter user name"
									defaultValue={financial.description}
									{...register("description")}
								/>
							</Box>

							<Box>
								<FormLabel htmlFor="value">value</FormLabel>
								<Input
									size="sm"
									id="value"
									placeholder="Please enter user name"
									defaultValue={financial.value}
									{...register("value")}
								/>
							</Box>

							<Box>
								<FormLabel htmlFor="expectedValue">expectedValue</FormLabel>
								<Input
									size="sm"
									id="expectedValue"
									placeholder="Please enter user name"
									defaultValue={financial.expectedValue}
									{...register("expectedValue")}
								/>
							</Box>

							<Box>
								<FormLabel htmlFor="dueDate">dueDate</FormLabel>
								<Input
									size="sm"
									id="dueDate"
									placeholder="Please enter user name"
									defaultValue={financial.dueDate}
									{...register("dueDate")}
								/>
							</Box>

							<Box>
								<FormLabel htmlFor="date">date</FormLabel>
								<Input
									size="sm"
									id="date"
									placeholder="Please enter user name"
									defaultValue={financial.date}
									{...register("date")}
								/>
							</Box>

							<Box>
								<FormLabel htmlFor="financialType">financialType</FormLabel>
								<Input
									size="sm"
									id="financialType"
									placeholder="Please enter user name"
									defaultValue={financial.financialType}
									{...register("financialType")}
								/>
							</Box>

						</Stack>
					</DrawerBody>

					<DrawerFooter borderTopWidth="1px">
						<Button size="sm" variant="outline" mr={3} onClick={handleClose} fontWeight="normal">
							Cancelar
						</Button>
						<Button type="submit" isLoading={isLoading} size="sm" colorScheme="red" fontWeight="normal">Confirmar</Button>
					</DrawerFooter>
				</DrawerContent>
			</DrawerOverlay>
			</form>
		</Drawer>
  )
}