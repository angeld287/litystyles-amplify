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
                {(this.props.cp.state.user_roles.indexOf('company_admin') !== -1) && <MenuItem icon="dollar" text="Panel de Facturación" onClick={ (e) => { e.preventDefault(); this.props.cp.setPage('BILLINGDASHBOARD');}} />}
                <MenuItem icon="log-out" text="LogOut" onClick={ (e) => { e.preventDefault(); this.handlesignOut();}} />
            </Menu>
        );

		return (
            <Navbar>
                <Navbar.Group align={Alignment.LEFT}>
                    <Navbar.Heading>Litty Style</Navbar.Heading>
                    <Navbar.Divider />
                    {/* this.redirect('/') */}
                    <Button className="bp3-minimal" onClick={(e) => {e.preventDefault(); this.props.cp.setPage('')}} icon="home"/>
                    {this.props.cp.state.user_roles.indexOf('company_admin') !== -1 && <Button className="bp3-minimal" onClick={(e) => {e.preventDefault(); this.props.cp.setPage('COMPANY_ADMIN')}} icon="wrench"/>}
                    {this.props.cp.state.user_roles.indexOf('employee') !== -1 && <Button className="bp3-minimal" onClick={(e) => {e.preventDefault(); this.props.cp.setPage('STYLIST')}} icon="cut"/>}
                    {this.props.cp.state.user_roles.indexOf('company_admin') !== -1 && <Button className="bp3-minimal" onClick={(e) => {e.preventDefault(); this.props.cp.setPage('CUSTOMER')}} icon="people"/>}
                    {this.props.cp.state.user_roles.indexOf('company_admin') !== -1 && <Button className="bp3-minimal" onClick={(e) => {e.preventDefault(); this.props.cp.setPage('REPORTS')}} icon="chart"/>}
                </Navbar.Group>
                <Navbar.Group align={Alignment.RIGHT}>
                    <Navbar.Divider />
                    <Popover content={userMenu} position={Position.BOTTOM}>
                        <Button icon="user" text=""/>
                    </Popover>
                </Navbar.Group>
            </Navbar>
		);
	}
}
