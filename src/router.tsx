import { Switch, Route } from 'react-router-dom'
import { PrivateRoute } from './components/private-route'

import { SignIn, Dashboard, FinancialList } from './pages'

export const Routes = () => {
	return(
		<Switch>
			<PrivateRoute path='/' exact component={FinancialList} />

			<PrivateRoute path='/financial' exact component={FinancialList} />

			<PrivateRoute path='/financial/create' component={FinancialList} />

			<PrivateRoute path='/financial/edit/:id' component={FinancialList} />

			<PrivateRoute path='/financial/delete/:id' component={FinancialList}/>

			<PrivateRoute path='/dashboard' component={Dashboard} />

			<Route path='/signin' exact>
				<SignIn />
			</Route>
		</Switch>
	)
}