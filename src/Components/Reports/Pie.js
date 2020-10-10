import { Pie as P} from 'react-chartjs-2';
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
    return(
      <div>
        <h2>Grafico de Pastel</h2>
        <P data={props.data} options={options}/>
      </div>
    );
}

export default Pie;