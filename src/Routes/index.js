import React from 'react';
import { connect } from 'react-redux';

import HeaderLinks from '../Components/HeaderLinks';
import Administration from '../Screens/Administration';
import Employee from '../Screens/Employee'
import Customer from '../Screens/Customer'
import Reports from '../Screens/Reports'
import Home from '../Screens/Home';
import CustomSpinner from '../Components/CustomSpinner';


const Routes = ({ currentScreen, loadingScreen }) => {

    if (loadingScreen) return <CustomSpinner />;

    return (
        <div className="App">
            <HeaderLinks />
            {currentScreen === 'HOME' && <Home />}
            {currentScreen === 'COMPANY_ADMIN' && <Administration />}
            {currentScreen === 'STYLIST' && <Employee />}
            {currentScreen === 'CUSTOMER' && <Customer />}
            {currentScreen === 'REPORTS' && <Reports />}
        </div>
    );

}

const mapStateToProps = state => ({
    currentScreen: state.commun.currentScreen,
    loadingScreen: state.commun.loadingScreen
})

export default connect(mapStateToProps)(Routes);;