//barchart.js
import React from 'react';
import { Container } from 'react-bootstrap'
import { Bar as B } from 'react-chartjs-2';

const Bar = (props) => {
  const { SelectMonth, rp } = props;

    return (
        <Container>
            <h2>Grafico de Barras</h2>
            <SelectMonth rp={rp} />
            <B data={props.data} />
        </Container>
    );
}

export default Bar;