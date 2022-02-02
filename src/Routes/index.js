import React from 'react';
import { connect } from 'react-redux';

//import { Spinner } from "@blueprintjs/core";
import HeaderLinks from '../Components/HeaderLinks';
import Administration from '../Screens/Administration';
import Home from '../Screens/Home';


const Routes = ({ currentScreen }) => {
    //if (loading) return <div style={{ marginTop: 50 }} align="center"><Spinner intent="primary" size={100} /></div>;
    return (
        <div className="App">
            <HeaderLinks />
            {currentScreen === 'COMPANY_ADMIN' && <Administration />}
            {currentScreen === 'HOME' && <Home />}
        </div>
    );

}

const mapStateToProps = state => ({
    currentScreen: state.commun.currentScreen
})

export default connect(mapStateToProps)(Routes);;