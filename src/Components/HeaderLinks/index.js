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
			//this.props.childProps.onUserLogOut();
		});
    };
    
    //this.props.childProps.state.user_roll

	redirectSignIn = () => {
		window.location.href = '/signin';
	};

	render() {
		const username =
			this.props.childProps.state.username !== '' ? this.props.childProps.state.username : 'Ingresar';

		return (
            <Navbar>
                <Navbar.Group align={Alignment.LEFT}>
                    <Navbar.Heading>Blueprint {username}</Navbar.Heading>
                    <Navbar.Divider />
                    <Button className="bp3-minimal" icon="home" text="Home" />
                    <Button className="bp3-minimal" icon="document" text="Files" />
                    {this.props.childProps.isLoggedIn && ( <Button className="bp3-minimal" icon="document" text="logout" />)}
                    {!this.props.childProps.isLoggedIn && (<Button className="bp3-minimal" icon="document" text="login" />)}
                </Navbar.Group>
            </Navbar>
		);
	}
}
