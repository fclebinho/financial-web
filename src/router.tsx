import { Switch, Route } from 'react-router-dom'

import { SignIn, Dashboard, FinancialList } from './pages'

export const Routes = () => {
	return(
		<Switch>
			<Route path='/' exact component={FinancialList} />
			<Route path='/financial' exact component={FinancialList} />
			<Route path='/financial/create' component={FinancialList} />
			<Route path='/financial/edit/:id' component={FinancialList} />
			<Route path='/financial/delete/:id' component={FinancialList} />
			<Route path='/dashboard' exact component={Dashboard} />
			<Route path='/signin' exact component={SignIn} />
		</Switch>
	)
}