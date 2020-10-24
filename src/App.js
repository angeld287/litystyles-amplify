import React, {useState, useEffect} from 'react';

import { Spinner, Card, Elevation } from "@blueprintjs/core";

import {
  BrowserRouter as Router,
} from 'react-router-dom';

import Amplify, {Auth} from 'aws-amplify';
import aws_exports from './aws-exports'; 

import App from './Components/App';

import { AmplifyAuthenticator, /* AmplifySignOut, */ AmplifySignIn, AmplifySignUp } from '@aws-amplify/ui-react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';

import './app.css'


Amplify.configure(aws_exports); 

const AuthStateApp = () => {
  const [authState, setAuthState] = useState(AuthState.SignIn);
  const [user, setUser] = useState(null);


  useEffect(() => {
    console.log("ss")
      return onAuthUIStateChange((nextAuthState, authData) => {
          console.log(nextAuthState, authData)
          setAuthState(nextAuthState);
          setUser(authData);
      });
  }, []);
  
  const AppWithRouter = (props) => (<Router><App authState={props.authState}/></Router>);

  const googleFederated = () => {
    Auth.federatedSignIn({provider: "Google"});
  };

  if(authState === AuthState.SignedIn && user !== null) { return (<div><AppWithRouter authState={authState}/></div>)}
  
  if(authState === AuthState.SignIn || authState === AuthState.SignUp || authState === AuthState.ForgotPassword || authState === AuthState.SignedOut || authState === AuthState.ResetPassword
    || authState === AuthState.ResetPassword || authState === AuthState.ConfirmSignIn || authState === AuthState.ConfirmSignUp){
    return (
      <div style={{marginTop: 30}}>
        <div align="center" style={{width: 300, margin: 'auto'}}>
          <Card interactive={true} elevation={Elevation.TWO}>
            <button onClick={(e) => {e.preventDefault(); googleFederated();}} className="loginBtn loginBtn--google">
              Login with Google
            </button>
          </Card>
        </div>
        <br/>
        <br/>
        <AmplifyLogin/>
      </div>
    );
  } else {
      return <div style={{marginTop: 50}} align="center"><Spinner intent="primary" size={100} /></div> 
  };
}

const AmplifyLogin = () => {
  return (
    <div>
        <AmplifyAuthenticator federated>
          <AmplifySignIn 
            federated
            slot="sign-in"
            usernameAlias="email"
          />

          {<AmplifySignUp 
            federated
            slot="sign-up"
            usernameAlias="email"
            formFields={[
              { type: "email" },
              { type: "password" },
              { type: "name", label: "Name", placeholder: "Enter your full name", hint: null, required: true, },
              { type: "phone_number" },
            ]}
          />}

        </AmplifyAuthenticator>
    </div>
  )
}

export default AuthStateApp;