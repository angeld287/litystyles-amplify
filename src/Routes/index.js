import React from 'react';

//import { Spinner } from "@blueprintjs/core";
import HeaderLinks from '../Components/HeaderLinks';


const Routes = () => {
    //if (loading) return <div style={{ marginTop: 50 }} align="center"><Spinner intent="primary" size={100} /></div>;
    return (
        <div className="App">
            <HeaderLinks />
            <h1>Routes</h1>
            <button>test</button>
        </div>
    );

}

export default Routes;