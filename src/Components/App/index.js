import React, { useEffect, useState } from 'react';

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
  const [ user_rolls, setUser_rolls ] = useState([]);

  useEffect(
		() => {
      let didCancel = false;
      
			/* const fetchEvent = async () => {
        let user = {};
        let roles = [];

				try {
          const data = await Auth.currentSession();

          data.accessToken.payload['cognito:groups'].forEach(e => {
            roles.push(e);
          });
          user = data;

				} catch (e) {
          setError(true);
          setErrorMessage(e);
				}

				if (!didCancel) {
          if (user.accessToken === undefined) {
            setIsLoggedIn(false);
          }else{
            setUsername(user.accessToken.payload.username);
            setEmail(user.idToken.payload.email);
            setPhonenumber(user.idToken.payload.phone_number);
            setUser_rolls(roles);
          }
				}

				return () => {
					didCancel = true;
				};
			};

			fetchEvent(); */
		}
  );
  
  const handleUserSignIn = async () => {
    let roles = [];
    setIsLoggedIn(true);

    try {
      Auth.currentSession().then(user => {
        user.accessToken.payload['cognito:groups'].forEach(e => {
          roles.push(e);
        });
        console.log("asdas");
        setUsername(user.accessToken.payload.username);
        setEmail(user.idToken.payload.email);
        setPhonenumber(user.idToken.payload.phone_number);
        setUser_rolls(roles);

      }).catch(e => {
        setError(true);
        setErrorMessage(e);
      });

    } catch (e) {
      setError(true);
      setErrorMessage(e);
    }
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
      user_rolls: user_rolls,
    }
  };


  return (
    <div className="App">
      <HeaderLinks cp={cp}/>
      <Routes cp={cp} />
    </div>
  );

}

export default App;