import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import { Routes } from './router'
import { FinancialProvider, AccountProvider } from './contexts'

function App() {
  return (
		<BrowserRouter>
			<AccountProvider>
				<FinancialProvider>
					<Routes />
				</FinancialProvider>
			</AccountProvider>
		</BrowserRouter>
  );
}

export default App;
