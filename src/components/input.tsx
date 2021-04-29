import React from 'react'
import { FormControl, FormErrorMessage, FormLabel, Input as InputChakra, InputProps as InputChakraProps, useColorMode } from '@chakra-ui/react'
import { FieldError } from 'react-hook-form'

export interface InputProps extends InputChakraProps {
	name: string
	label?: string
	error?: FieldError
}

export const Input: React.FC<InputProps> = ({name, label, error = null, ...rest}) => {
  const { colorMode } = useColorMode()

	return (
		<FormControl isInvalid={!!error}>
			{ !!label && <FormLabel htmlFor={name}>{label}</FormLabel> }
			<InputChakra name={name} id={name} focusBorderColor="red.500" bg={colorMode === "light" ? "gray.300" : "gray.900"} variant="filled" _hover={{bg: colorMode === "light" ? "gray.300" : "gray.900"}} {...rest}/>
			{!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
		</FormControl>
	)
}