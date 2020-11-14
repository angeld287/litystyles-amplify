import React, { useState, useEffect, useCallback } from 'react';

import { Spinner } from "@blueprintjs/core";

import HeaderLinks from '../HeaderLinks/';

//import { Routes } from '../Routes/';

import { listCompanys } from '../../graphql/customQueries';

import { Auth, API, graphqlOperation } from 'aws-amplify';

import aws_exports from '../../aws-exports'; 

import Home from './../Home';
import Administration from '../Administration';
import Customer from '../Customer';
import Employee from '../Employee';
import Reports from '../Reports';
import FirstSteps from '../FirstSteps';
import BillingDashboard from '../BillingDashboard';

const App = (props) => {
  const [ loading, setLoading ] = useState(true);
  const [ company, setCompany] = useState(null);
  const [ error, setError ] = useState(false);
  const [ errorMessage, setErrorMessage ] = useState(false);
  const [ username, setUsername ] = useState("");
  const [ name, setName ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ phonenumber, setPhonenumber ] = useState("");
  const [ user_roles, setUser_rolls ] = useState([]);
  const [ firstSteps, setFirstSteps] = useState(false);

  const [ page, setPage ] = useState('');

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

  const appStart = useCallback(
    async () => {
      try {
        setLoading(true);

        var roles = user_roles;
        var companyApi = [];
        
        const user = await Auth.currentSession();

        setName(user.idToken.payload.name);

        roles = user.accessToken.payload['cognito:groups'] !== undefined ? user.accessToken.payload['cognito:groups'] : [];
      
        const hasOnlyGoogleRole = roles !== undefined && roles.length === 1 && roles[0].toUpperCase().includes("GOOGLE");

        if (hasOnlyGoogleRole) { addUserToGroup(user.accessToken.payload.username); }
        if (roles === undefined || roles.length === 0) { await addUserToGroup(user.accessToken.payload.username); }

        if(roles.indexOf('company_admin') !== -1){
          companyApi = await API.graphql(graphqlOperation(listCompanys, {filter: {owner: {eq: user.accessToken.payload.username}}}));

          setCompany(companyApi.data.listCompanys.items[0]);

          if (companyApi.data.listCompanys.items.length === 0) {
            setFirstSteps(true);
          }
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
  
  useEffect(  () => { appStart()}, [appStart]);
  
  const handleUserLogOut = () => {
    console.log("sesion cerrada")
  }; 

  const cp = {
    setPage,
    firstSteps: firstSteps,
    onUserLogOut: handleUserLogOut,
    state: {
      name: name,
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
  
  var anyPage = (page === '' || page === 'COMPANY_ADMIN' || page === 'STYLIST' || page === 'CUSTOMER' || page === 'REPORTS');

  return (
    <div className="App">
      <HeaderLinks cp={cp}/>
      {error &&  <div align="center"> <h1>Ha ocurrido un error</h1><p>{errorMessage}</p> </div>}
      {/* {!error && <Routes cp={cp} />} se tuvo que cambiar de Router a Single Page por problemas con el login */}
      { !error && page === '' && !firstSteps && <Home {...cp} /> }
      { !error && page === 'COMPANY_ADMIN' && !firstSteps && <Administration {...cp} /> }
      { !error && page === 'STYLIST' && !firstSteps && <Employee {...cp} /> }
      { !error && page === 'CUSTOMER' && !firstSteps && <Customer {...cp} /> }
      { !error && page === 'REPORTS' && !firstSteps && <Reports {...cp} /> }
      { !error && page === 'BILLINGDASHBOARD' && !firstSteps && <BillingDashboard {...cp} /> }
      { !error && anyPage && firstSteps && <FirstSteps {...cp} /> }
    </div>
  );

}

export default App;