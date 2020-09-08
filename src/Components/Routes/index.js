import React from 'react';

import { Route, Switch, Redirect } from 'react-router-dom';

import Home from './../Home';

export const Routes = ({ childProps }) => (
	<Switch>
		<Route exact path="/" render={() => <Home />} />
		{/* <ProtectedRoutePriest exact path="/events/:id/details" render={DetailsEvent} props={childProps} />
		<ProppedRoute exact path="/signin" render={AuthComponent} props={childProps} /> */}
	</Switch>
);

export const ProtectedRouteClients = ({ render: C, props: childProps, ...rest }) => (
	<Route
		{...rest}
		render={(rProps) =>
			childProps.isLoggedIn ? childProps.state.user_roll === 'client' ? (
				<C {...rProps} {...childProps} />
			) : (
				<Redirect to="/modules" />
			) : (
				<Redirect to={`/signin?redirect=${rProps.location.pathname}${rProps.location.search}`} />
			)}
	/>
);

export const ProtectedRouteAdmin = ({ render: C, props: childProps, ...rest }) => (
	<Route
		{...rest}
		render={(rProps) =>
			childProps.isLoggedIn ? childProps.state.user_roll === 'admin' ? (
				<C {...rProps} {...childProps} />
			) : (
				<Redirect to="/" />
			) : (
				<Redirect to={`/signin?redirect=${rProps.location.pathname}${rProps.location.search}`} />
			)}
	/>
);

export const ProtectedRoutePriest = ({ render: C, props: childProps, ...rest }) => (
	<Route
		{...rest}
		render={(rProps) =>
			childProps.isLoggedIn ? childProps.state.user_roll === 'priest' ? (
				<C {...rProps} {...childProps} />
			) : (
				<Redirect to="/" />
			) : (
				<Redirect to={`/signin?redirect=${rProps.location.pathname}${rProps.location.search}`} />
			)}
	/>
);

export const ProtectedRoute = ({ render: C, props: childProps, ...rest }) => (
	<Route
		{...rest}
		render={(rProps) =>
			childProps.isLoggedIn ? (
				<C {...rProps} {...childProps} />
			) : (
				<Redirect to={`/signin?redirect=${rProps.location.pathname}${rProps.location.search}`} />
			)}
	/>
);

export const ProppedRoute = ({ render: C, props: childProps, ...rest }) => (
	<Route {...rest} render={(rProps) => <C {...rProps} {...childProps} />} />
);
