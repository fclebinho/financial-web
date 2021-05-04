import React from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider } from '@chakra-ui/react'
import App from './App';
import {theme} from './styles/theme'
import { AuthProvider } from './contexts'

ReactDOM.render(
  <React.StrictMode>
			<ChakraProvider theme={theme}>
				<AuthProvider>
					<App />
				</AuthProvider>
			</ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);