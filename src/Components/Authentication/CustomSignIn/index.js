import React, { useState, useMemo } from "react";
import { Auth } from "aws-amplify";
import CustomButton from "../../CustomButton";
import CustomForm from "../../CustomForm"
import CustomOverlay from "../../CustomOverlay";


import { Intent } from "@blueprintjs/core";

const CustomSignIn = (props) => {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [nperror, npsetError] = useState(false);
  const [nperrorMessage, npsetErrorMessage] = useState("");
  const [newPassword, setNewPassword] = useState(false);
  const [user, setUser] = useState({});


  const googleFederated = () => {
    Auth.federatedSignIn({ provider: "Google" });
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
        //props.cp.onUserSignIn();
        sessionStorage.setItem('CURRENT_USER_SESSION', JSON.stringify(user));
        props.onStateChange('signedIn', {});
      }

    } catch (e) {
      setError(true);
      if (e.code === "UserNotConfirmedException") {
        setErrorMessage("Usuario no Confirmado");
      } else if (e.code === "PasswordResetRequiredException") {
        setErrorMessage("Se requiere cambio de contraseña");
        console.log(props)
      } else if (e.code === "UserNotFoundException") {
        setErrorMessage("El usuario no existe");
      } else if (e.code === "NotAuthorizedException") {
        setErrorMessage("Contraseña incorrecta");
      } else {
        setErrorMessage(e.message);
        console.log(e.message);
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

  const fields = useMemo(() => [
    { name: 'username', icon: 'person', placeholder: 'Nombre de Usuario o Email', validationMessage: 'Digita tu Nombre de Usuario o Email' },
    { name: 'password', type: 'password', icon: 'lock', placeholder: 'Password', validationMessage: 'Digita tu Password' }
  ], []);

  const newPasswordFields = useMemo(() => [
    { name: 'password', type: 'password', icon: 'lock', placeholder: 'new Password', validationMessage: 'Digita tu nuevo Password' }
  ], []);

  const button = useMemo(() => {
    return ({ text: "Login" })
  }, []);

  const changePasswordButton = useMemo(() => {
    return ({ text: "Cambiar Password" })
  }, []);

  return (
    <div align="center" style={{ width: 400, margin: 'auto' }}>
      {props.authState === 'signIn' &&
        <div style={{ marginTop: 30 }}>
          <div className="row">
            <div className="col-md-12">
              <CustomButton intent={Intent.DANGER} onClick={(e) => { e.preventDefault(); googleFederated() }}>Inicia Sesion con <b>Google</b></CustomButton>
            </div>
          </div>
          <br></br>
          <div className="or-container">
            <div className="line-separator"></div>
            <div className="or-label">o</div>
            <div className="line-separator"></div>
          </div>
          <br></br>
          <div align="center" style={{ marginLeft: 20 }}>
            <CustomForm onSubmit={onSubmit} error={error} errorMessage={errorMessage} fields={fields} button={button} />
          </div>
        </div>

      }
      <div>
        <CustomOverlay isOpen={newPassword} onSubmit={nponSubmit} fields={newPasswordFields} button={changePasswordButton} error={nperror} errorMessage={nperrorMessage} />
      </div>
    </div>
  );
}

export default CustomSignIn;