import React, { useState, useEffect, useCallback } from 'react';

import { Spinner } from "@blueprintjs/core";

import HeaderLinks from '../HeaderLinks/';

import { Routes } from '../Routes/';

import { listCompanys } from '../../graphql/customQueries';

import { Auth, API, graphqlOperation } from 'aws-amplify';

import { AuthState } from '@aws-amplify/ui-components';

import aws_exports from '../../aws-exports'; 

const App = (props) => {
  const [ loading, setLoading ] = useState(true);
  const [ company, setCompany] = useState(null);
  const [ error, setError ] = useState(false);
  const [ errorMessage, setErrorMessage ] = useState(false);
  const [ username, setUsername ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ phonenumber, setPhonenumber ] = useState("");
  const [ user_roles, setUser_rolls ] = useState([]);

  const addUserToGroup = useCallback( 
    async (username) => {
      try {
        const apiOptions = {};
        var roles = user_roles;

        apiOptions['headers'] = {
            'Content-Type': 'application/json'
        };
        
        apiOptions['body'] = {
          GroupName: 'customer',
          UserPoolId: aws_exports.aws_user_pools_id,
          Username: username
        };

        roles.push('customer');

        await API.post('apiForLambda', '/addUserToGroup', apiOptions);

        setUser_rolls(roles)
      } catch (e) {
        setError(true);
        setErrorMessage('Ha ocurrido un error al intentar agregar al usuario en el grupo "cliente"');
        console.log(e);
      }
    },
    []
  );

  const handleUserSignIn = useCallback(
    async () => {
      try {
        setLoading(true);

        var roles = user_roles;
        var companyApi = [];
        
        const user = await Auth.currentSession();

        roles = user.accessToken.payload['cognito:groups'] !== undefined ? user.accessToken.payload['cognito:groups'] : [];
      
        const hasOnlyGoogleRole = roles !== undefined && roles.length === 1 && roles[0].toUpperCase().includes("GOOGLE");

        if (hasOnlyGoogleRole) { addUserToGroup(user.accessToken.payload.username); }
        if (roles === undefined || roles.length === 0) { await addUserToGroup(user.accessToken.payload.username); }

        if(roles.indexOf('company_admin') !== -1){
          companyApi = await API.graphql(graphqlOperation(listCompanys));
          setCompany(companyApi.data.listCompanys.items[0]);
        }

        setUsername(user.accessToken.payload.username);
        setEmail(user.idToken.payload.email);
        setPhonenumber(user.idToken.payload.phone_number);
    
        setUser_rolls(roles);
        setLoading(false);

      } catch (e) {
        setError(true);
        console.log(e);
        setErrorMessage('appjs error');
        setLoading(false);
      }
    },
    [addUserToGroup]
  );
  
  useEffect(  () => { handleUserSignIn()}, [handleUserSignIn]);
  
  const handleUserLogOut = () => {
    //setIsLoggedIn(false);
  }; 

  const cp = {
    authState: props.authState,
    isLoggedIn: props.authState === AuthState.SignedIn,
    //onUserSignIn: handleUserSignIn,
    onUserLogOut: handleUserLogOut,
    state: {
      username: username,
      phonenumber: phonenumber,
      email: email,
      user_roles: user_roles,
      company: company,
      //se agrego este campo para no perder el dinamismo a la hora de seleccionar la oficina (o para que la oficina no este atada al objeto company)
      office: company !== null && company !== undefined ? company.offices.items[0] : {}
    }
  };

	if (loading) return <div style={{marginTop: 50}} align="center"><Spinner intent="primary" size={100} /></div> ;

  return (
    <div className="App">
      <HeaderLinks cp={cp}/>
      {error &&  <div align="center"> <h1>Ha ocurrido un error</h1><p>{errorMessage}</p> </div>}
      {!error && <Routes cp={cp} />}
    </div>
  );

}

export default App;