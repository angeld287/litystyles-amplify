import React from 'react';
import { Container } from 'react-bootstrap'
import { Line as L } from 'react-chartjs-2';

const Line = (props) =>  {

  const { SelectMonth, rp } = props;

    return (
      <div>
        <Container>
          <h2>Ingresos Mensuales</h2>
          <SelectMonth rp={rp} />
          <L useRef="chart" data={props.data} />
          <div style={{marginTop: 20}}>
              <h5>Total de Ingresos: RD$ {rp.tgearnings}.00</h5>
          </div>
        </Container>
      </div>
    );
}

export default Line;