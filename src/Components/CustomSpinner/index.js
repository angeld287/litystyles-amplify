import React from 'react';
import { Spinner } from "@blueprintjs/core";

const CustomSpinner = () => {
    return <div style={{ marginTop: 50 }} align="center"><Spinner intent="primary" size={100} /></div>;
}

export default CustomSpinner;