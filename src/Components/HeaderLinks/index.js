import React, { Component } from 'react';
import { Auth } from 'aws-amplify';

import {
    Alignment,
    Button,
    Navbar,
} from "@blueprintjs/core";

//import { Container } from 'aws-amplify-react';

export default class HeaderLinks extends Component {
	handlesignOut = () => {
		Auth.signOut().then((d) => {
			window.location.reload();
			//this.props.cp.onUserLogOut();
		});
    };
    
    //this.props.cp.state.user_roll

	redirectSignIn = () => {
		window.location.href = '/signin';
	};

	render() {

		return (
            <Navbar>
                <Navbar.Group align={Alignment.LEFT}>
                    <Navbar.Heading>Litty Style</Navbar.Heading>
                    <Navbar.Divider />
                    <Button className="bp3-minimal" icon="home"/>
                </Navbar.Group>
                <Navbar.Group align={Alignment.RIGHT}>
                    <Navbar.Divider />
                    {this.props.cp.isLoggedIn && ( <Button onClick={this.handlesignOut} className="bp3-minimal" text="Logout"/>)}
                    {!this.props.cp.isLoggedIn && (<Button onClick={this.redirectSignIn} className="bp3-minimal" text="Login" />)}
                </Navbar.Group>
            </Navbar>
		);
	}
}
