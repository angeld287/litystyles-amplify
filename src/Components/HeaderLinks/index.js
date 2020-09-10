import React, { Component } from 'react';
import { Auth } from 'aws-amplify';

import {
    Alignment,
    Button,
    Navbar,
} from "@blueprintjs/core";

export default class HeaderLinks extends Component {
	handlesignOut = () => {
		Auth.signOut().then((d) => {
			window.location.reload();
		});
    };
    
    redirect = (path) => {
        window.location.href = path;
	};

	render() {

		return (
            <Navbar>
                <Navbar.Group align={Alignment.LEFT}>
                    <Navbar.Heading>Litty Style</Navbar.Heading>
                    <Navbar.Divider />
                    <Button className="bp3-minimal" onClick={(e) => {e.preventDefault(); this.redirect('/')}} icon="home"/>
                    <Button className="bp3-minimal" onClick={(e) => {e.preventDefault(); this.redirect('/administration')}} icon="wrench"/>
                    <Button className="bp3-minimal" onClick={(e) => {e.preventDefault(); this.redirect('/stylist/'+this.props.cp.state.username)}} icon="cut"/>
                    <Button className="bp3-minimal" onClick={(e) => {e.preventDefault(); this.redirect('/customer')}} icon="user"/>
                </Navbar.Group>
                <Navbar.Group align={Alignment.RIGHT}>
                    <Navbar.Divider />
                    {this.props.cp.isLoggedIn && ( <Button onClick={this.handlesignOut} className="bp3-minimal" text="Logout"/>)}
                    {!this.props.cp.isLoggedIn && (<Button onClick={(e) => {e.preventDefault(); this.redirect('/signin')}} className="bp3-minimal" text="Login" />)}
                </Navbar.Group>
            </Navbar>
		);
	}
}
