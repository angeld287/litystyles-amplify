import React from 'react';
import useBillingDashboard from './useBillingDashboard'
import { Bar as B} from 'react-chartjs-2';

const BillingDashboard = (props) => {

    const { barData, requests } = useBillingDashboard(props);

  return (
    <div>
      <p>Reporte de Gastos</p>
      <div style={{marginTop: 20}}>
          <h5>{requests} solicitudes realizadas este mes</h5>
          <h5>RD$ {(requests * 2)}</h5>
      </div>
      <B data={barData} />
    </div>
  );
}

export default BillingDashboard;