import React from 'react';

import { Route, Switch, Redirect } from 'react-router-dom';

import Home from './../Home';
import AuthComponent from './../Authentication/AuthComponent';

export const Routes = ({ cp }) => (
	<Switch>
		<ProtectedRoute exact path="/" render={Home} props={cp} />
		{/* <ProtectedRoutePriest exact path="/events/:id/details" render={DetailsEvent} props={cp} /> */}
		<ProppedRoute exact path="/signin" render={AuthComponent} props={cp} />
	</Switch>
);

export const ProtectedRouteAdmin = ({ render: C, props: cp, ...rest }) => (
	<Route
		{...rest}
		render={(rProps) =>
			cp.isLoggedIn ? cp.state.user_roll === 'admin' ? (
				<C {...rProps} {...cp} />
			) : (
				<Redirect to="/" />
			) : (
				<Redirect to={`/signin?redirect=${rProps.location.pathname}${rProps.location.search}`} />
			)}
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
