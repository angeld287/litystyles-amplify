import React from 'react';
import { Container } from 'react-bootstrap'
import { Line as L } from 'react-chartjs-2';

const Line = (props) =>  {

  const { SelectMonth, rp } = props;

    return (
      <div>
        <Container>
          <h2>Grafico de Lineas</h2>
          <SelectMonth rp={rp} />
          <L useRef="chart" data={props.data} />
        </Container>
      </div>
    );
}

export default Line;