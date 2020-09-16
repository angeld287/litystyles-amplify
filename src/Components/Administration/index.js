import React from 'react';
import { ControlGroup, Button, Spinner, Callout, Alert } from "@blueprintjs/core";

import useAdministration from './useAdministration';

const Administration = () => {

	const { requests, cancelRequest, confirmCancelRequest, setCancelOverlay, cancelOverlay, cancelLoading, cancelerror, cancelerrorMessage } = useAdministration();
	const _requests = (requests !== null)?([].concat(requests)
		//.sort((a, b) => a.name.localeCompare(b.name))
		.map((item,i)=>
			(
				<tr key={i}>
					<td>{i+1}</td>
					<td style={{width: 200}}>{item.customerName}</td>
					<td><Button intent="Danger" icon="delete" onClick={e => { e.preventDefault(); cancelRequest(item.id)}}>Anular Solicitud</Button></td>
				</tr>
			)
		)):(<td></td>)
	
	return (
		<div align="center">
			<h1>Administration</h1>
			<ControlGroup style={{ margin: 20}}>
				<table className="bp3-html-table bp3-html-table-striped">
					<thead>
						<tr>
							<th>No.</th>
							<th>Cliente</th>
							<th>Acciones</th>
						</tr>
					</thead>
					<tbody>
						{_requests}
					</tbody>
				</table>
			</ControlGroup>
			<div>
              <Alert isOpen={cancelOverlay} align="center" canOutsideClickCancel={true} onClose={e => {setCancelOverlay(e)}} cancelButtonText="Cancelar"
			  		 confirmButtonText="Confirmar" onConfirm={confirmCancelRequest}>
                   		Deseas Cancelar La Solicitud?
						<div style={{marginBottom: 10}}>
							{cancelerror && <Callout intent="danger">{cancelerrorMessage}</Callout>}
						</div>
						<div hidden={!cancelLoading}><Spinner intent="primary" size={30} /></div> 
              </Alert>
          </div>
        </div>
	);
};

export default Administration;