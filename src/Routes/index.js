import React from 'react';
import { connect } from 'react-redux';

import HeaderLinks from '../Components/HeaderLinks';
import Administration from '../Screens/Administration';
import Customer from '../Screens/Customer';
import Home from '../Screens/Home';
import CustomSpinner from '../Components/CustomSpinner';
import ErrorBoundary from '../Components/ErrorBoundary';


const Routes = ({ currentScreen, loadingScreen }) => {

    if (loadingScreen) return <CustomSpinner />;

    return (
        <div className="App">
            <HeaderLinks />
            {currentScreen === 'HOME' && <ErrorBoundary><Home /></ErrorBoundary>}
            {currentScreen === 'COMPANY_ADMIN' && <ErrorBoundary><Administration /></ErrorBoundary>}
            {currentScreen === 'CUSTOMER' && <ErrorBoundary><Customer /></ErrorBoundary>}
        </div>
    );

}

const mapStateToProps = state => ({
    currentScreen: state.commun.currentScreen,
    loadingScreen: state.commun.loadingScreen
})

export default connect(mapStateToProps)(Routes);