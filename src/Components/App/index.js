import React, { useState, useEffect } from 'react';

import HeaderLinks from '../HeaderLinks/';

import { Routes } from '../Routes/';

import { Auth } from 'aws-amplify';

const App = () => {
  const [ isLoggedIn, setIsLoggedIn ] = useState(false);
  const [ error, setError ] = useState(false);
  const [ errorMessage, setErrorMessage ] = useState(false);
  const [ username, setUsername ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ phonenumber, setPhonenumber ] = useState("");
  const [ user_roles, setUser_rolls ] = useState([]);


 /*  useEffect(() => {
      let didCancel = false;
      

      const fetchEvents = async () => {
          var user = {};
          var roles = [];

          try {
              user = await Auth.currentSession();
              user.accessToken.payload['cognito:groups'].forEach(e => {
                roles.push(e);
             });
          } catch (e) {
              setError(true);
              setErrorMessage(e);
          }

          if (!didCancel) {
             console.log("asdas");
             setUsername(user.accessToken.payload.username);
             setEmail(user.idToken.payload.email);
             setPhonenumber(user.idToken.payload.phone_number);
             console.log(roles);
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
    let roles = [];
    
    Auth.currentSession().then(user => {
      user.accessToken.payload['cognito:groups'].forEach(e => {
        roles.push(e);
      });
      setUsername(user.accessToken.payload.username);
      setEmail(user.idToken.payload.email);
      setPhonenumber(user.idToken.payload.phone_number);
      setUser_rolls(roles);

    }).catch(e => {
      setError(true);
      setErrorMessage(e);
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
    }
  };


  return (
    <div className="App">
      <HeaderLinks cp={cp}/>
      {error &&  <div align="center"> <h1>Ha ocurrido un error</h1><p>{errorMessage}</p> </div>}
      {!error && <Routes cp={cp} />}
    </div>
  );

}

export default App;