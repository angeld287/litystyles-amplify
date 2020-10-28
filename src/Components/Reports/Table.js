import { Container } from 'react-bootstrap'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { Button } from "@blueprintjs/core";
import React from 'react';


const Table = (props) => {
  const { SelectMonth, rp, data } = props;


    return(
      <Container>
        <h2>Detalle de Ingresos</h2>
        <SelectMonth rp={rp} />
        { (data.length !== 0) && <Button icon="download" onClick={e => { e.preventDefault(); rp.downloadExcel();}}>Desargar Reporte DGII</Button>}
        <div style={{marginTop: 20}}>
            <BootstrapTable data={ data } pagination>
                <TableHeaderColumn dataField='client' isKey>Cliente</TableHeaderColumn>
                <TableHeaderColumn dataField='service'>Servicio</TableHeaderColumn>
                <TableHeaderColumn dataField='price'>Costo</TableHeaderColumn>
                <TableHeaderColumn dataField='date'>Fecha</TableHeaderColumn>
            </BootstrapTable>
            <h5>Total de Ingresos: RD$ {rp.tgearnings}.00</h5>
        </div>
      </Container>
    );
}

export default Table;