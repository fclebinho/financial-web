import React from 'react'
import { Box, Stack, Text } from '@chakra-ui/react'
import { NavSection } from './nav-section'
import { NavLink } from './nav-link'
import { AiOutlineSnippets, AiOutlineWallet } from 'react-icons/ai'
import { useAccount } from '../../contexts/account'
import { BiArchive } from 'react-icons/bi'
import { Droppable } from '../dndkit/ droppable'

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
						<Droppable id={item.id} description={item.description}>
							<NavLink icon={AiOutlineWallet}>
								<Text>{item.description}</Text>
							</NavLink>
						</Droppable>
					))}
				</NavSection>

				<NavSection title="OUTRAS CONTAS">
					{items.filter(item => item.accountType !== 0).map(item => (
						<Droppable id={item.id} description={item.description}>
							<NavLink icon={BiArchive}>
								<Text>{item.description}</Text>
							</NavLink>
						</Droppable>
					))}
				</NavSection>
			</Stack>
		</Box>
	)
}