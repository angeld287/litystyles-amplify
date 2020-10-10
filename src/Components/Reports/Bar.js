//barchart.js
import React from 'react';
import { Bar as B } from 'react-chartjs-2';

const Bar = (props) => {
    return (
        <div style ={{margin: 20}}>
            <h2>Grafico de Barras</h2>
            <B data={props.data} />
        </div>
    );
}

export default Bar;