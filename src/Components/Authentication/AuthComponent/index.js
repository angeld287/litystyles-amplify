import React, { Component } from 'react';


import { Authenticator, RequireNewPassword, SignUp} from 'aws-amplify-react';

import CustomSignIn from '../SignIn';

import queryString from 'query-string';

export default class AuthComponent extends Component {
  constructor(props) {
    super(props);
  }
  
  handleStateChange = state => {
    const values = queryString.parse(this.props.location.search)
    if (state === 'signedIn') {
      this.props.onUserSignIn();
      if(this.props.location.search !== null && this.props.location.search !== ''){
        this.props.history.push(values.redirect);
      }else{
        this.props.history.push('/');
      }
    }else if (state === 'signIn') {
      this.props.onUserLogOut();
    }
  };

  render() {

    return (
      <div>
        <Authenticator 
          authState="signIn" 
          hideDefault={true}
          onStateChange={this.handleStateChange}
        >
          <CustomSignIn override={'SignIn'} cp={this.props}/> 
        </Authenticator>
      </div>
    );
  }
}