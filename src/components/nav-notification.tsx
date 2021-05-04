import React from 'react'
import Icon from '@chakra-ui/icon'
import { HStack, IconButton, useColorMode } from '@chakra-ui/react'
import { RiNotificationLine, RiUserAddLine } from 'react-icons/ri'
import { FiLogOut } from 'react-icons/fi'
import { BiMoon, BiSun } from 'react-icons/bi'
import { useAuth } from '../contexts'
import { useHistory } from 'react-router'

export const NavNotification: React.FC = () => {
	const { colorMode, toggleColorMode } = useColorMode()
	const { push } = useHistory()
	const { logout } = useAuth()

	const handleLogout = () => {
		logout()
		push('/signin')
	}

	return (
		<HStack spacing={8} mx={8} pr={8} py={1} borderRightWidth={2}>
			<Icon as={RiNotificationLine} fontSize={20}/>
			<Icon as={RiUserAddLine} fontSize={20}/>
			<IconButton bg="none" fontSize={20} onClick={toggleColorMode} aria-label="Light theme">{colorMode === "light" ? <Icon as={BiMoon}/> : <Icon as={BiSun}/>}</IconButton>
			<IconButton bg="none" fontSize={20} onClick={handleLogout} aria-label="Light theme">{<Icon as={FiLogOut}/> }</IconButton>
		</HStack>
	)
}