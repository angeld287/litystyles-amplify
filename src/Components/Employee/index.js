import React from 'react';
import { ControlGroup, Button, Card, Elevation } from "@blueprintjs/core";


import useEmployee from './useEmployee';

const style = {
	//display:'block',
	height: 200,
	width: 300,
	borderRadius: '50%',
	fontSize: "50px",
	textAlign: "center",
	margin: 10,
}

const Employee = (props) => {
	const { requests, requestInProcess, FinishRequest, nextRequest, inProcessLoading, finishLoading } = useEmployee(props);

	const _requests = (requests !== null)?([].concat(requests)
		.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
		.map((item,i)=>
			(
				<tr key={i} className={item.state === "IN_PROCESS" ? "table-danger" : "table-light"}>
					<td>{i+1}</td>
					<td style={{width: 200}}>{item.customerName}</td>
					<td style={{width: 200}}>{item.state}</td>
				</tr>
			)
		)):(<td></td>)


	const _service = requests.length > 0 ? requests[0].service.items.length > 0 ? requests[0].service.items[0].service.name : "No Service"  : "No Request";
//(hasService ? requests[0].service.items[0].service.name : "No Service")
	const _inTurn = requests.length > 0 ? (
		<Card interactive={true} elevation={Elevation.FOUR}>
			<h5>Cliente En Turno / Proximo</h5>
			<p>Nombre: {requests[0].customerName}</p>
			<p>Servicio: {requests[0].service.items.length > 0 ? requests[0].service.items[0].service.name : ""}</p>
		</Card>
	) : (<div></div>);

	return (
		<div>
			<div><h3>{_service}</h3></div>
			<div>
				<ControlGroup style={{ margin: 20, marginBottom: 40}} vertical={true}>
					{requestInProcess && <div><Button intent="Danger" onClick={(e) => {e.preventDefault(); FinishRequest()}} style={style} loading={finishLoading}>FINALIZAR</Button></div>}
					{!requestInProcess && <div><Button intent="Primary" onClick={(e) => {e.preventDefault(); nextRequest()}} style={style} loading={inProcessLoading} disabled={requests.length === 0}>PROXIMO</Button></div>}
				</ControlGroup>
			</div>
			<div style={{margin: 10}}>
				{_inTurn}
			</div>
			<div style={{margin: 10}}>
				<Card interactive={true} elevation={Elevation.FOUR}>
					<table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col"><b>No.</b></th>
                                <th scope="col"><b>Cliente</b></th>
                                <th scope="col"><b>Estado</b></th>
                            </tr>
                        </thead>
                        <tbody>
                            {_requests}
                        </tbody>
                    </table>
				</Card>
			</div>
		</div>
	);
};

export default Employee;