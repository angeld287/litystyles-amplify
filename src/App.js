import React from 'react';


import Amplify from 'aws-amplify';
import aws_exports from './aws-exports'; 

import App from './Components/App';
import CustomSignIn from './Components/Authentication/CustomSignIn';

import { withAuthenticator, AmplifyTheme, ConfirmSignIn, ConfirmSignUp, ForgotPassword, RequireNewPassword, SignUp, VerifyContact } from 'aws-amplify-react'

Amplify.configure(aws_exports); 

const authTheme = {
  ...AmplifyTheme,
  googleSignInButton: { backgroundColor: "red", borderColor: "red"},
  button: {
      ...AmplifyTheme.button,
      backgroundColor: "#0275d8"
  },
  buttonDisabled: {
      ...AmplifyTheme.button,
      backgroundColor: "#0275d8"
  },
  sectionFooterLink: {
    ...AmplifyTheme.sectionFooterLink,
    color: "#0275d8"
  },
  sectionFooterLinkDisabled: {
    ...AmplifyTheme.sectionFooterLink,
    color: "#0275d8"
  },
}


export default withAuthenticator(
  App, 
  false, 
  [
    <CustomSignIn/>,
    <ConfirmSignIn/>,
    <VerifyContact/>,
    <SignUp/>,
    <ConfirmSignUp/>,
    <ForgotPassword/>,
    <RequireNewPassword />
  ], 
  null, 
  authTheme, 
  {
    signUpConfig: {
      signUpFields: [
        { label: "Name", key: "name", required: true, type: "string" }
      ]
    }
  })



  
/* const AuthStateApp = () => {
  const [authState, setAuthState] = useState(AuthState.SignIn);
  const [user, setUser] = useState(null);


  useEffect(() => {
      return onAuthUIStateChange((nextAuthState, authData) => {
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
}*/

//export default AuthStateApp;