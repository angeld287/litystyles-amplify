import React, { useEffect } from 'react';

import Amplify, { Auth } from 'aws-amplify';
import aws_exports from './aws-exports';

//import App from './Components/App';
import Routes from './Routes';
import CustomSignIn from './Components/Authentication/CustomSignIn';

import { withAuthenticator, AmplifyTheme, ConfirmSignIn, ConfirmSignUp, ForgotPassword, RequireNewPassword, SignUp, VerifyContact } from 'aws-amplify-react'
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions';
import { setLoadingScreen } from './redux/commun/commun.actions'

Amplify.configure(aws_exports);

const authTheme = {
  ...AmplifyTheme,
  googleSignInButton: { backgroundColor: "red", borderColor: "red" },
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

const authenticatorComponents = [
  <CustomSignIn />,
  <ConfirmSignIn />,
  <VerifyContact />,
  <SignUp />,
  <ConfirmSignUp />,
  <ForgotPassword />,
  <RequireNewPassword />
];

const signUpConfig = {
  signUpConfig: {
    signUpFields: [
      { label: "Name", key: "name", required: true, type: "string" }
    ]
  }
};

const Application = ({ setCurrentUser }) => {
  setLoadingScreen(true)
  useEffect(() => {
    let currentUserLS = JSON.parse(sessionStorage.getItem('CURRENT_USER_SESSION'));
    if (typeof currentUserLS !== 'object') {
      Auth.signOut().then((d) => {
        sessionStorage.setItem('CURRENT_USER_SESSION', null);
      });
    } else {
      setCurrentUser(currentUserLS)
    }
    //setLoadingScreen(false)
  });

  return <Routes />;
}

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
  setLoadingScreen: loading => dispatch(setLoadingScreen(loading)),
})

const connectApplication = connect(null, mapDispatchToProps)(Application)

export default withAuthenticator(connectApplication, false, authenticatorComponents, null, authTheme, signUpConfig)