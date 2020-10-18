import React from 'react';

import { Route, Switch, Redirect } from 'react-router-dom';

import Home from './../Home';
import Administration from '../Administration';
import Customer from '../Customer';
import Employee from '../Employee';
import Reports from '../Reports';
//import AuthComponent from './../Authentication/AuthComponent';

export const Routes = ({ cp }) => (
	<Switch>
		<ProtectedRoute exact path="/" render={Home} props={cp} />
		<ProtectedRouteAdmin exact path="/administration" render={Administration} props={cp} />
		<ProtectedRouteAdmin exact path="/reports" render={Reports} props={cp} />
		<ProtectedRouteEmployee exact path="/stylist" render={Employee} props={cp} />
		<ProtectedRouteCustomer exact path="/customer" render={Customer} props={cp} />
		{/* <ProppedRoute exact path="/signin" render={AuthComponent} props={cp} /> */}
	</Switch>
);

export const ProtectedRouteAdmin = ({ render: C, props: cp, ...rest }) => 
(
	<Route
		{...rest}
		render={
			(rProps) =>
				cp.isLoggedIn && cp.state.user_roles.length !== 0 ? 
				(
					cp.state.user_roles.indexOf('company_admin') !== -1 ? (
						<C {...rProps} {...cp} />
					) : (
						<Redirect to="/" />
					)
				) : (
					<Redirect to={`/signin?redirect=${rProps.location.pathname}${rProps.location.search}`} />
				)
			}
	/>
);

export const ProtectedRouteEmployee = ({ render: C, props: cp, ...rest }) => 
(
	<Route
		{...rest}
		render={
			(rProps) =>
				cp.isLoggedIn && cp.state.user_roles.length !== 0 ? 
				(
					cp.state.user_roles.indexOf('employee') !== -1 ? (
						<C {...rProps} {...cp} />
					) : (
						<Redirect to="/" />
					)
				) : (
					<Redirect to={`/signin?redirect=${rProps.location.pathname}${rProps.location.search}`} />
				)
			}
	/>
);

export const ProtectedRouteCustomer = ({ render: C, props: cp, ...rest }) => 
(
	<Route
		{...rest}
		render={
			(rProps) =>
				cp.isLoggedIn && cp.state.user_roles.length !== 0 ? 
				(
					cp.state.user_roles.indexOf('customer') !== -1 ? (
						<C {...rProps} {...cp} />
					) : (
						<Redirect to="/" />
					)
				) : (
					<Redirect to={`/signin?redirect=${rProps.location.pathname}${rProps.location.search}`} />
				)
			}
	/>
);

export const ProtectedRoute = ({ render: C, props: cp, ...rest }) => (
	<Route
		{...rest}
		render={(rProps) =>
			cp.isLoggedIn ? (
				<C {...rProps} {...cp} />
			) : (
				<Redirect to={`/signin?redirect=${rProps.location.pathname}${rProps.location.search}`} />
			)}
	/>
);

export const ProppedRoute = ({ render: C, props: cp, ...rest }) => (
	<Route {...rest} render={(rProps) => <C {...rProps} {...cp} />} />
);
