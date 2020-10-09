import React, { useState } from 'react';

import { Spinner } from "@blueprintjs/core";

import HeaderLinks from '../HeaderLinks/';

import { Routes } from '../Routes/';

import { listCompanys } from '../../graphql/customQueries';

import { Auth, API, graphqlOperation } from 'aws-amplify';

const App = () => {
  const [ loading, setLoading ] = useState(false);
  const [ isLoggedIn, setIsLoggedIn ] = useState(false);
  const [ company, setCompany] = useState(null);
  const [ error, setError ] = useState(false);
  const [ errorMessage, setErrorMessage ] = useState(false);
  const [ username, setUsername ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ phonenumber, setPhonenumber ] = useState("");
  const [ user_roles, setUser_rolls ] = useState([]);


 /*  useEffect(() => {
      let didCancel = false;
      

      const fetchEvents = async () => {
          //var user = {};
          //var roles = [];
    			var companyApi = [];


          try {
            setLoading(true);

            if (isLoggedIn) {
				      companyApi = await API.graphql(graphqlOperation(listCompanys));
              
            }
              user = await Auth.currentSession();
              user.accessToken.payload['cognito:groups'].forEach(e => {
                roles.push(e);
             });
             setLoading(false);

          } catch (e) {
              setError(true);
              setErrorMessage(e);
              setLoading(false);
          }

          if (!didCancel) {
            setCompany(companyApi.data.listCompanys.items[0]);
            setLoading(false);
             //setUsername(user.accessToken.payload.username);
             //setEmail(user.idToken.payload.email);
             //setPhonenumber(user.idToken.payload.phone_number);
             //setUser_rolls(roles);
          }
      };

      if (isLoggedIn) {fetchEvents();}

      return () => {
          didCancel = true;
      };
  }, [isLoggedIn]); */
  
  const handleUserSignIn = () => {
    setIsLoggedIn(true);
    setLoading(true);

    let roles = [];
    var companyApi = [];
    
    Auth.currentSession().then(async (user) => {
      user.accessToken.payload['cognito:groups'].forEach(e => {
        roles.push(e);
      });

      companyApi = await API.graphql(graphqlOperation(listCompanys));

      setUsername(user.accessToken.payload.username);
      setEmail(user.idToken.payload.email);
      setPhonenumber(user.idToken.payload.phone_number);
      setUser_rolls(roles);

      setCompany(companyApi.data.listCompanys.items[0]);
      setLoading(false);

    }).catch(e => {
      setError(true);
      setErrorMessage('appjs error');
      setLoading(false);
    });
  };

  const handleUserLogOut = () => {
    setIsLoggedIn(false);
  }; 

  const cp = {
    isLoggedIn: isLoggedIn,
    onUserSignIn: handleUserSignIn,
    onUserLogOut: handleUserLogOut,
    state: {
      username: username,
      phonenumber: phonenumber,
      email: email,
      user_roles: user_roles,
      company: company,
      //se agrego este campo para no perder el dinamismo a la hora de seleccionar la oficina (o para que la oficina no este atada al objeto company)
      office: company !== null ? company.offices.items[0] : {}
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