import { Text, TextProps } from '@chakra-ui/react'
import React from 'react'

export const Logo: React.FC<TextProps> = (props) => {
	return (
		<Text fontSize="3xl" fontWeight="bold" letterSpacing="tight" {...props}>
			dashgo
			<Text as="span" color="red.500">.</Text>
		</Text>
	)
}