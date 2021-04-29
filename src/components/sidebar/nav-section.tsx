import React, { ReactNode } from 'react'
import { Box, Stack, Text } from '@chakra-ui/react'

interface NavSectionProps {
	title: string
	children: ReactNode
}

export const NavSection: React.FC<NavSectionProps> = ({ title, children }) => {
	return (
		<Box>
			<Text fontWeight="bold" fontSize="small">{title}</Text>
			<Stack spacing={4} mt={8} align="stretch">
				{children}
			</Stack>
		</Box>
	)
}