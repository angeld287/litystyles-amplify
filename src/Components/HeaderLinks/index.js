import React, { useMemo, useState } from 'react';
import { Auth } from 'aws-amplify';
import { connect } from 'react-redux';
import { setCurrentUser } from '../../redux/user/user.actions';
import { setCurrentScreen } from '../../redux/commun/commun.actions';

import {
    Alignment,
    Button,
    Navbar
} from "@blueprintjs/core";

const HeaderLinks = ({ setCurrentUser, setCurrentScreen, currentUser }) => {
    const [userRoles, setUserRoles] = useState(null);
    const [userName, setUserName] = useState(null);

    const handlesignOut = () => {
        Auth.signOut().then((d) => {
            setCurrentUser(null)
            sessionStorage.setItem('CURRENT_USER_SESSION', null);
        });
    };

    useMemo(() => {
        if (currentUser !== null && currentUser !== undefined) {
            setUserRoles(currentUser.signInUserSession.accessToken.payload["cognito:groups"]);
            setUserName(currentUser.attributes.name);
        }
    }, [currentUser]);

    return (
        <Navbar>
            <Navbar.Group align={Alignment.LEFT} key={'navigation_actions'}>
                <Navbar.Heading>Litty Style</Navbar.Heading>
                <Navbar.Divider />
                <Button className="bp3-minimal" onClick={(e) => { e.preventDefault(); setCurrentScreen('HOME') }} icon="home" />
                {userRoles !== null && userRoles.indexOf('company_admin') !== -1 && <Button className="bp3-minimal" onClick={(e) => { e.preventDefault(); setCurrentScreen('COMPANY_ADMIN') }} icon="wrench" />}
                {userRoles !== null && userRoles.indexOf('employee') !== -1 && <Button className="bp3-minimal" onClick={(e) => { e.preventDefault(); setCurrentScreen('STYLIST') }} icon="cut" />}
                {userRoles !== null && (userRoles.indexOf('company_admin') !== -1 && userRoles.indexOf('supplier') === -1) && <Button className="bp3-minimal" onClick={(e) => { e.preventDefault(); setCurrentScreen('CUSTOMER') }} icon="people" />}
                {userRoles !== null && userRoles.indexOf('company_admin') !== -1 && <Button className="bp3-minimal" onClick={(e) => { e.preventDefault(); setCurrentScreen('REPORTS') }} icon="chart" />}
            </Navbar.Group>
            <Navbar.Group align={Alignment.RIGHT} key={'user_actions'}>
                <Navbar.Divider />
                <Button readOnly className="bp3-minimal" text={userName !== null ? userName : ""} />
                {/* {(userRoles.indexOf('company_admin') !== -1) && <MenuItem icon="dollar" text="Panel de Facturación" onClick={(e) => { e.preventDefault(); setCurrentScreen('BILLINGDASHBOARD'); }} />} */}
                <Button className="bp3-minimal" text="Logout" icon="log-out" onClick={(e) => { e.preventDefault(); handlesignOut(); }} />
            </Navbar.Group>
        </Navbar>
    );
}

const mapStateToProps = state => ({
    currentUser: state.user.currentUser
})
const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user)),
    setCurrentScreen: screen => dispatch(setCurrentScreen(screen))
})

export default connect(mapStateToProps, mapDispatchToProps)(HeaderLinks);