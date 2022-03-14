import React, { useEffect } from 'react';

import Amplify, { Auth } from 'aws-amplify';
import aws_exports from './aws-exports';

//import App from './Components/App';
import Routes from './Routes';
import CustomSignIn from './Components/Authentication/CustomSignIn';

import { listCompanys } from "./graphql/customQueries";
import { getList } from "./services/AppSync";
import { QUERY_LIMIT } from "./utils/Constants"

import { withAuthenticator, AmplifyTheme, ConfirmSignIn, ConfirmSignUp, ForgotPassword, RequireNewPassword, SignUp, VerifyContact } from 'aws-amplify-react'
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions';
import { setLoadingScreen } from './redux/commun/commun.actions'
import { setCompany } from './redux/company/company.actions'

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

const Application = ({ setCurrentUser, setCompany, setLoadingScreen, company }) => {
  setLoadingScreen(true)

  const fetchCompany = async (currentUser) => {
    try {
      var result = [], _company = company, parameters = {}, token = "";

      //get products
      if (company === null) {

        parameters = { limit: QUERY_LIMIT, filter: { owner: { eq: currentUser.username }, deleted: { ne: true } } };
        result = await getList('listCompanys', listCompanys, parameters);
        _company = result.items;
        token = result.nextToken

        while (_company.length === 0 && result.nextToken !== null) {
          parameters.nextToken = result.nextToken;
          result = await getList('listCompanys', listCompanys, parameters);
          _company = [..._company, ...result.items];
          token = result.nextToken
        }

        if (_company.length !== 0) {
          setCompany(_company[0])
        }

      }
      setLoadingScreen(false)
    } catch (e) {
      console.log(e);
      setLoadingScreen(false)
    }
  }

  useEffect(() => {
    let currentUserLS = JSON.parse(sessionStorage.getItem('CURRENT_USER_SESSION'));
    if (typeof currentUserLS !== 'object') {
      Auth.signOut().then((d) => {
        sessionStorage.setItem('CURRENT_USER_SESSION', null);
      });
    } else {
      setCurrentUser(currentUserLS);
      fetchCompany(currentUserLS)
    }
  });

  return <Routes />;
}

const mapStateToProps = state => ({
  company: state.company.company,
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
  setLoadingScreen: loading => dispatch(setLoadingScreen(loading)),
  setCompany: company => dispatch(setCompany(company)),
})

const connectApplication = connect(mapStateToProps, mapDispatchToProps)(Application)

export default withAuthenticator(connectApplication, false, authenticatorComponents, null, authTheme, signUpConfig)