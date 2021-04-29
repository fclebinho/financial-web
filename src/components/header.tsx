import React from 'react'
import { Flex } from '@chakra-ui/react'
import { Logo } from './logo'
import { Profile } from './profile'
import { NavNotification } from './nav-notification'

export const Header: React.FC = () => {
	return (
		<Flex as="header" w="100%" maxW={1480} h={20} mx="auto" mt={4} px={6} align="center">
			<Logo w={64} />

			<Flex align="center" ml="auto">
				<NavNotification />
				<Profile />
			</Flex>
		</Flex>
	)
}