import React, { useEffect, useState } from 'react'
import { IconButton, IconButtonProps } from '@chakra-ui/react'
import { FiInfo } from 'react-icons/fi'

export const ConfirmButton: React.FC<IconButtonProps> = ({ children, onClick, ...rest}) => {
	const [clicked, setClicked] = useState(false)

	const handleClick = (event: any) => {
		clicked && onClick ? onClick(event) : setClicked(!clicked)
	}

	useEffect(() => {
		clicked && setTimeout(() => setClicked(false), 3000)
	}, [clicked])

	return (
		<IconButton {...rest} onClick={handleClick} color={clicked ? "red.500" : "none"} >
			{clicked ? <FiInfo /> : children}
		</IconButton>
	)
}
