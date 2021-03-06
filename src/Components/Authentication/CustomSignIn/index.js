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
    { name: 'username', leftIcon: 'person', placeholder: 'Nombre de Usuario o Email', validationmessage: 'Digita tu Nombre de Usuario o Email' },
    { name: 'password', type: 'password', leftIcon: 'lock', placeholder: 'Password', validationmessage: 'Digita tu Password' }
  ], []);

  const newPasswordFields = useMemo(() => [
    { name: 'password', type: 'password', leftIcon: 'lock', placeholder: 'new Password', validationmessage: 'Digita tu nuevo Password' }
  ], []);

  const buttons = useMemo(() => [{ name: 'login', text: "Login" }], []);

  const changePasswordButtons = useMemo(() => [{ name: 'changepass', text: "Cambiar Password" }], []);

  return (
    <div key="div_container" align="center" style={{ width: 400, margin: 'auto' }}>
      {props.authState === 'signIn' &&
        <div key="div_login" style={{ marginTop: 30 }}>
          <div key="div_login_google" className="row">
            <div className="col-md-12">
              <CustomButton intent={Intent.DANGER} onClick={(e) => { e.preventDefault(); googleFederated() }}>Inicia Sesion con <b>Google</b></CustomButton>
            </div>
          </div>
          <br></br>
          <div key="div_login_divider" className="or-container">
            <div className="line-separator"></div>
            <div className="or-label">o</div>
            <div className="line-separator"></div>
          </div>
          <br></br>
          <div key="div_login_form" align="center" style={{ marginLeft: 20 }}>
            <CustomForm verticalButtons={true} onSubmit={onSubmit} error={error} errorMessage={errorMessage} fields={fields} buttons={buttons} />
          </div>
        </div>

      }
      <div key="div_overlay">
        <CustomOverlay isOpen={newPassword} onSubmit={nponSubmit} fields={newPasswordFields} button={changePasswordButtons} error={nperror} errorMessage={nperrorMessage} />
      </div>
    </div>
  );
}

export default CustomSignIn;