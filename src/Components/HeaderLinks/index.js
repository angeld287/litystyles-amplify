import React, { Component } from 'react';
import { Auth } from 'aws-amplify';

import {
    Alignment,
    Button,
    Navbar,
    Popover,
    Menu,
    MenuItem,
    Position,
} from "@blueprintjs/core";

import { AuthState } from '@aws-amplify/ui-components';

export default class HeaderLinks extends Component {

	handlesignOut = () => {
		Auth.signOut().then((d) => {
			//window.location.reload();
		});
    };
    
    redirect = (path) => {
        window.location.href = path;
	};

	render() {

        const userMenu = (
            <Menu>
                <MenuItem text={this.props.cp.state.name} />
                <MenuItem icon="log-out" text="LogOut" onClick={ (e) => { e.preventDefault(); this.handlesignOut();}} />
            </Menu>
        );

		return (
            <Navbar>
                <Navbar.Group align={Alignment.LEFT}>
                    <Navbar.Heading>Litty Style</Navbar.Heading>
                    <Navbar.Divider />
                    <Button className="bp3-minimal" onClick={(e) => {e.preventDefault(); this.redirect('/')}} icon="home"/>
                    {(this.props.cp.isLoggedIn && this.props.cp.state.user_roles.indexOf('company_admin') !== -1) && <Button className="bp3-minimal" onClick={(e) => {e.preventDefault(); this.redirect('/administration')}} icon="wrench"/>}
                    {(this.props.cp.isLoggedIn && this.props.cp.state.user_roles.indexOf('employee') !== -1) && <Button className="bp3-minimal" onClick={(e) => {e.preventDefault(); this.redirect('/stylist')}} icon="cut"/>}
                    {(this.props.cp.isLoggedIn && this.props.cp.state.user_roles.indexOf('company_admin') !== -1) && <Button className="bp3-minimal" onClick={(e) => {e.preventDefault(); this.redirect('/customer')}} icon="people"/>}
                    {(this.props.cp.isLoggedIn && this.props.cp.state.user_roles.indexOf('company_admin') !== -1) && <Button className="bp3-minimal" onClick={(e) => {e.preventDefault(); this.redirect('/reports')}} icon="chart"/>}
                </Navbar.Group>
                <Navbar.Group align={Alignment.RIGHT}>
                    <Navbar.Divider />
                    {this.props.cp.authState === AuthState.SignedIn && ( 
                        <Popover content={userMenu} position={Position.BOTTOM}>
                            <Button icon="user" text=""/>
                        </Popover>
                    )}
                </Navbar.Group>
            </Navbar>
		);
	}
}
