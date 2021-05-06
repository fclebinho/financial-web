import React from 'react'
import { Box, HStack, Icon, Text } from '@chakra-ui/react'
import { useDraggable } from '@dnd-kit/core'
import { FiMousePointer } from 'react-icons/fi'
import { FinancialProps } from '../../../../../contexts/financial'

interface TableColumnDescriptionProps {
	item: FinancialProps
}

export const TableColumnDescription: React.FC<TableColumnDescriptionProps> = ({ item }) => {
	const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: item.id || '',
		data: {
      supports: ['account'],
    },
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

	return (
		<Box ref={setNodeRef}>
			<HStack spacing={2} style={style} {...listeners} {...attributes}>
				<Text fontWeight="bold" >
						{item.description}
				</Text>
				<Icon fontSize={12} fontWeight="normal" color="gray.500" as={FiMousePointer}/>
			</HStack>
			<Text fontSize="sm">{item.id}</Text>
		</Box>
	)
}