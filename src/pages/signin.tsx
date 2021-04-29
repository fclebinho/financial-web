import React from 'react'
import { Box, Button, Flex, Stack, Text, useColorMode } from '@chakra-ui/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Input, Logo } from '../components'


type SigninFormData = {
	email: string,
	password: string
}

const schema = yup.object().shape({
	email: yup.string().email('E-mail inválido').required('E-mail deve ser preenchido'),
	password: yup.string().required('Senha deve ser preenchida')
});

export const SignIn: React.FC = () => {
  const { colorMode } = useColorMode()
	const { register, handleSubmit, formState } = useForm({
		resolver: yupResolver(schema)
	})

	const handleSignin: SubmitHandler<SigninFormData> = async (values) => {
		await new Promise(resolve => setTimeout(resolve, 2000))

		console.log(values)
	}

	return(
		<Flex w="100vw" h="100vh" align="center" justify="center">
			<Flex as="form" w="100%" maxW={360} bg={colorMode === "light" ? "gray.200" : "gray.800"} p={10} pb={20} borderRadius={8} direction="column" onSubmit={handleSubmit(handleSignin)}>
				<Box justify="center" align="center" my={16}>
					<Logo />
					<Text align="center" color={colorMode === "light" ? "gray.600" : "gray.400"} mx={10} my={2}>A simplicidade de um dashboard.</Text>
				</Box>
				<Stack spacing={4}>
					<Input type="email" placeholder="E-mail" {...register("email")} error={formState.errors.email}/>	
					<Input type="password" placeholder="Senha" {...register("password")} error={formState.errors.password}/>
				</Stack>

				<Button type="submit" mt={6} colorScheme="red" isLoading={formState.isSubmitting}>Entrar</Button>
			</Flex>
		</Flex>
	)
}