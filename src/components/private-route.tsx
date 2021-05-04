import React from 'react'
import { Redirect, Route, RouteProps } from 'react-router'
import { useAuth } from '../contexts/auth'

interface PrivateRouteProps extends RouteProps {
	component: any;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, ...rest }) => {
	const { signed } = useAuth()

	return <Route {...rest} render={(props) => signed ? <Component {...props} /> : <Redirect to={{ pathname:"/signin", state: { from: props.location } }} />}/>
}