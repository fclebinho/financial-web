import React from 'react'
import { Box, Stack, Text } from '@chakra-ui/react'
import { NavSection } from './nav-section'
import { NavLink } from './nav-link'
import { AiOutlineSnippets, AiOutlineWallet } from 'react-icons/ai'
import { useAccount } from '../../contexts/account'
import { BiArchive } from 'react-icons/bi'

export const Sidebar: React.FC = () => {
	const { items } = useAccount();

	return (
		<Box as="aside" w={64} mr={8}>
			<Stack spacing={12} align="flex-start">
				<NavSection title="GERAL">
					<NavLink icon={AiOutlineSnippets}>
						<Text>Receitas</Text>
					</NavLink>
					<NavLink icon={AiOutlineSnippets}>
						<Text>Despesas</Text>
					</NavLink>
				</NavSection>

				<NavSection title="CARTEIRAS">
					{items.filter(item => item.accountType === 0).map(item => (
						<NavLink icon={AiOutlineWallet}>
							<Text>{item.description}</Text>
						</NavLink>
					))}
				</NavSection>

				<NavSection title="OUTRAS CONTAS">
					{items.filter(item => item.accountType !== 0).map(item => (
						<NavLink icon={BiArchive}>
							<Text>{item.description}</Text>
						</NavLink>
					))}
				</NavSection>
			</Stack>
		</Box>
	)
}