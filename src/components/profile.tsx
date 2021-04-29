import React from 'react'
import { Avatar, Box, Flex, Text } from '@chakra-ui/react'

export const Profile: React.FC = () => {
	return (
		<Flex align="center">
			<Box mr={4} textAlign="right">
				<Text>Cleber Gomes</Text>
				<Text fontSize="small">fclebinho@gmail.com</Text>
			</Box>

			<Avatar size="md" name="Cleber Gomes" />
		</Flex>
	)
}