import React from 'react';
import { Button, Spinner, Callout, Alert, Icon } from "@blueprintjs/core";
import { Tabs, Tab, Table } from 'react-bootstrap';

import useAdministration from './useAdministration';
import Services from './Services';
import Products from './Products';
import Offices from './Offices';

const Administration = (props) => {

	const { ap, onSelectTab, requests, cancelRequest, confirmCancelRequest, setCancelOverlay, cancelOverlay, cancelLoading, cancelerror, cancelerrorMessage } = useAdministration(props);
	

	const _requests = (requests !== null)?([].concat(requests)
		//.sort((a, b) => a.name.localeCompare(b.name))
		.map((item,i)=>
			(
				<tr key={i}>
					<td>{i+1}</td>
					<td style={{width: 200}}>{item.customerName}</td>
					<td>{item.state}</td>
					<td><Button style={{marginRight: 1}} intent="Danger" icon="delete" onClick={e => { e.preventDefault(); cancelRequest(item.id)}}>Anular Solicitud</Button></td>
				</tr>
			)
		)):(<td></td>)
	
	return (
		<div align="center" style={{marginTop: 5}}>
			<Tabs defaultActiveKey="requests" id="uncontrolled-tab-example" onSelect={e => onSelectTab(e)}>
				<Tab eventKey="requests" title={<Icon icon="numbered-list" />}>
					<div style={{marginTop: 5}}>
						<h5>Solicitudes Activas</h5>
						{ap.load.loading.type !== 'requests' && 
							<div style={{marginTop:20}}>
								<Table striped bordered hover>
									<thead>
										<tr>
											<th>No.</th>
											<th>Cliente</th>
											<th>State</th>
											<th>Acciones</th>
										</tr>
									</thead>
									<tbody>
										{_requests}
									</tbody>
								</Table>
							</div>
						}
						{ap.load.loading.type === 'requests' &&
							<div style={{marginTop:20}}>
								<Spinner/>
							</div>
						}
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
				</Tab>
				<Tab eventKey="offices" title={<Icon icon="office" />}>
					<div style={{marginTop: 5}}>
						<h4>Esta parte esta en fase de construccion</h4>
						{/* <Offices ap={ap}/> */}
					</div>
				</Tab>
				<Tab eventKey="services" title={<Icon icon="cog" />}>
					<div style={{marginTop: 5}}>
						<Services ap={ap}/>
					</div>
				</Tab>
				<Tab eventKey="products" title={<Icon icon="shopping-cart" />}>
					<div style={{marginTop: 5}}>
						<Products ap={ap}/>
					</div>
				</Tab>
				<Tab eventKey="employees" title={<Icon icon="inherited-group" />}>
					<div style={{marginTop: 5}}>
						<h5>Empleados</h5>
					</div>
				</Tab>
			</Tabs>
        </div>
	);
};

export default Administration;