import React from 'react';
import { Auth } from 'aws-amplify';
import { connect } from 'react-redux';
import { setCurrentUser } from '../../redux/user/user.actions';

import {
    Alignment,
    Button,
    Navbar,
    Popover,
    Menu,
    MenuItem,
    Position,
} from "@blueprintjs/core";

const HeaderLinks = ({ setCurrentUser, currentUser }) => {

    const handlesignOut = () => {
        Auth.signOut().then((d) => {
            setCurrentUser(null)
            sessionStorage.setItem('CURRENT_USER_SESSION', null);
        });
    };

    console.log(currentUser)

    const userMenu = (
        <Menu>
            <MenuItem text={'props.cp.state.name'} />
            {/* {(props.cp.state.user_roles.indexOf('company_admin') !== -1) && <MenuItem icon="dollar" text="Panel de Facturación" onClick={(e) => { e.preventDefault(); props.cp.setPage('BILLINGDASHBOARD'); }} />} */}
            <MenuItem icon="log-out" text="LogOut" onClick={(e) => { e.preventDefault(); handlesignOut(); }} />
        </Menu>
    );

    return (
        <Navbar>
            <Navbar.Group align={Alignment.LEFT}>
                <Navbar.Heading>Litty Style</Navbar.Heading>
                <Navbar.Divider />
                <Button className="bp3-minimal" onClick={(e) => { e.preventDefault() }} icon="home" />
                {/* {props.cp.state.user_roles.indexOf('company_admin') !== -1 && <Button className="bp3-minimal" onClick={(e) => { e.preventDefault(); props.cp.setPage('COMPANY_ADMIN') }} icon="wrench" />}
                {props.cp.state.user_roles.indexOf('employee') !== -1 && <Button className="bp3-minimal" onClick={(e) => { e.preventDefault(); props.cp.setPage('STYLIST') }} icon="cut" />}
                {(props.cp.state.user_roles.indexOf('company_admin') !== -1 && props.cp.state.user_roles.indexOf('supplier') === -1) && <Button className="bp3-minimal" onClick={(e) => { e.preventDefault(); props.cp.setPage('CUSTOMER') }} icon="people" />}
                {props.cp.state.user_roles.indexOf('company_admin') !== -1 && <Button className="bp3-minimal" onClick={(e) => { e.preventDefault(); props.cp.setPage('REPORTS') }} icon="chart" />} */}
            </Navbar.Group>
            <Navbar.Group align={Alignment.RIGHT}>
                <Navbar.Divider />
                <Popover content={userMenu} position={Position.BOTTOM}>
                    <Button icon="user" text="" />
                </Popover>
            </Navbar.Group>
        </Navbar>
    );
}

const mapStateToProps = state => ({
    currentUser: state.user.currentUser
})
const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(HeaderLinks);