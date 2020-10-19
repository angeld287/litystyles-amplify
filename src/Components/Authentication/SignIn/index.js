import React, { useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import { useForm } from 'react-hook-form';
import { Redirect } from 'react-router-dom';


import {
  ControlGroup,
  InputGroup,
  Button,
  Classes,
  Intent,
  Callout,
  Overlay,
} from "@blueprintjs/core";

const CustomSignIn = (props) => {
  const [ error, setError ] = useState(false);
  const [ errorMessage, setErrorMessage ] = useState("");
  const [ nperror, npsetError ] = useState(false);
  const [ nperrorMessage, npsetErrorMessage ] = useState("");
  const [ newPassword, setNewPassword ] = useState(false);
  const [ user, setUser ] = useState({});
  const { register, handleSubmit, errors, formState } = useForm();

  //isLoggedIn

  useEffect(() => {

    
    console.log(props.authState);
    console.log(Auth.user);

		if(props.cp.isLoggedIn){
      console.log(props.cp.isLoggedIn);
    }

		return () => {
		};
	}, []);

  const googleFederated = () => {
    Auth.federatedSignIn({provider: "Google"});
  };

  const onSubmit = async (input) => {

    try {
      const user = await Auth.signIn(input.username, input.password);

      if (user.challengeName === "SMS_MFA" || user.challengeName === "SOFTWARE_TOKEN_MFA") {
        //this.changeState("confirmSignIn", user);
      } else if (user.challengeName === "NEW_PASSWORD_REQUIRED") {
        setUser(user);
        setNewPassword(true);
      } else if (user.challengeName === "MFA_SETUP") {
        //this.changeState("TOTPSetup", user);
      } else {
        props.cp.onUserSignIn();
        props.onStateChange('signedIn',{});
      }

    } catch (e) {
      setError(true);
      if (e.code === "UserNotConfirmedException") {
        setErrorMessage("Usuario no Confirmado");
      } else if (e.code === "PasswordResetRequiredException") {
        setErrorMessage("Se requiere cambio de contraseña");
      } else if (e.code === "UserNotFoundException") {
        setErrorMessage("El usuario no existe");
      } else if (e.code === "NotAuthorizedException") {
        setErrorMessage("Contraseña incorrecta");
      } else {
        setErrorMessage(e.message);
      }

    }
    
  }

  const nponSubmit = async (input) => {
    try {
      await Auth.completeNewPassword(user, input.password);
    } catch (e) {
      npsetError(true);
      npsetErrorMessage(e.message);
    }
    
  }

    return (
      <div align="center" style={{width: 400, margin: 'auto'}}>
         { props.authState === 'signIn' && 
          <div style={{marginTop: 30}}>
            <div class="row">
                <div class="col-md-12"> 
                  <Button className={Classes.LARGE} intent={Intent.DANGER} onClick={(e) => { e.preventDefault(); googleFederated()}}> {props.authState} Inicia Sesion con <b>Google</b></Button>
                </div>
            </div> 
            <br></br>
            <div class="or-container">
                <div class="line-separator"></div>
                <div class="or-label">o</div>
                <div class="line-separator"></div>
            </div>
            <br></br>
            <div align="center" style={{marginLeft:20}}>
              <form onSubmit={handleSubmit(onSubmit)}>
                  <ControlGroup vertical style={{ marginTop: 15}}>
                      <InputGroup name="username" className={Classes.LARGE} leftIcon="person" placeholder="Username" style={{marginBottom: 10}} 
                          inputRef={register({ required: { message: 'Digita tu Username o Email', value: true }})}/>
                          <div style={{marginBottom: 10}}>
                            {errors.username && <Callout intent="danger">{errors.username.message}</Callout>}
                          </div>
                      <InputGroup name="password" type="password" className={Classes.LARGE} leftIcon="lock" placeholder="Password" style={{ marginBottom: 10}}
                          inputRef={register({ required: { message: 'Digita tu Password', value: true }})}/>
                          <div style={{marginBottom: 10}}>
                            {errors.password && <Callout intent="danger">{errors.password.message}</Callout>}
                          </div>
                      <Button className={Classes.LARGE} intent={Intent.PRIMARY} text="Login" type="submit" loading={formState.isSubmitting} />
                      <div style={{marginBottom: 10}}>
                        {error && <Callout intent="danger">{errorMessage}</Callout>}
                      </div>
                  </ControlGroup>
              </form>
            </div>
            {/* <div hidden={!formState.isSubmitting}><Spinner intent="primary" size={55} /></div> */}
          </div>

          }
          {/* {props.authState !== 'signIn' && props.authState !== '' &&
            <Redirect to="/" />
          } */}
          <div>
              <Overlay isOpen={newPassword} >
                <div style={{width: 400, margin: 'auto'}}>
                  <form onSubmit={handleSubmit(nponSubmit)}>
                      <ControlGroup vertical style={{ margin: 20}}>
                          <InputGroup name="password" type="password" className={Classes.LARGE} leftIcon="lock" placeholder="Password" style={{ marginBottom: 10}}
                              inputRef={register({ required: { message: 'Digita tu nuevo Password', value: true }})}/>
                              <div style={{marginBottom: 10}}>
                                {errors.password && <Callout intent="danger">{errors.password.message}</Callout>}
                              </div>
                          <Button className={Classes.LARGE} intent={Intent.PRIMARY} text="Cambiar Password" type="submit" disabled={formState.isSubmitting} />
                          <div style={{marginBottom: 10}}>
                            {nperror && <Callout intent="danger">{nperrorMessage}</Callout>}
                          </div>
                      </ControlGroup>
                  </form>
                </div>
              </Overlay>
          </div>
      </div>
    );
  }

export default CustomSignIn;