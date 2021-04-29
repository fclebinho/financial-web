import { Flex } from '@chakra-ui/layout'
import React from 'react'
import { Header, Sidebar } from '../components'

export const Dashboard: React.FC = () => {
	return(
		<Flex direction="column" h="100vh">
			<Header />
			<Flex w="100%" my={6} maxW={1480} mx="auto" px={6}>
				<Sidebar />
			</Flex>
		</Flex>
	)
}