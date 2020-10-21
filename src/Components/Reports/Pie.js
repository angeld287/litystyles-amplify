import { Pie as P} from 'react-chartjs-2';
import { Container } from 'react-bootstrap'
import React from 'react';

const options = {
  maintainAspectRatio: false,
  responsive: false,
  legend: {
    position: 'left',
    labels: {
      boxWidth: 10
    }
  }
}

const Pie = (props) => {
  const { SelectMonth, rp } = props;

    return(
      <Container>
        <h2>Ingresos por Servicio</h2>
        <SelectMonth rp={rp} />
        <P data={props.data} options={options}/>
        <div style={{marginTop: 20}}>
              <h5>Total de Ingresos: RD$ {rp.tgearnings}.00</h5>
        </div>
      </Container>
    );
}

export default Pie;