import React, { ElementType, ReactNode } from 'react'
import { Icon, Link, Text, LinkProps } from '@chakra-ui/react'

interface NavLinkProps extends LinkProps {
	children: ReactNode
	icon: ElementType
}

export const NavLink: React.FC<NavLinkProps> = ({ children, icon, ...rest }) => {
	return (
		<Link display="flex" align="center" {...rest}>
			<Icon as={icon} fontSize={25}/>
			<Text ml={4} fontWeight="medium">
				{children}
			</Text>
		</Link>
	)
}