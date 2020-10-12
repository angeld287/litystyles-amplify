import React from 'react';
import { Button, Alert, FormGroup, Icon } from "@blueprintjs/core";
import { Tabs, Tab, Table } from 'react-bootstrap';

import { DateInput } from "@blueprintjs/datetime";
import moment from "moment";

import useReports from './useReports';
import Line from './Line';
import Bar from './Bar';
import Pie from './Pie';

import SelectMonth from './SelectMonth';

const Reports = () => {

	const { rp, barData, pieData, lineData, requestsSearch, searchLoading, searchError, searcherrorMessage, setDate, getRequestsByDay, } = useReports();
	
	const getMomentFormatter = (format) => {
		// note that locale argument comes from locale prop and may be undefined
		return {
			formatDate: (date, locale) => moment(date).locale(locale).format(format),
			parseDate: (str, locale) => moment(str, format).locale(locale).toDate(),
			placeholder: format,
		}
	};

	const _requestsSearch = (requestsSearch !== null)?([].concat(requestsSearch)
		//.sort((a, b) => a.name.localeCompare(b.name))
		.map((item,i)=>
			(
				<tr key={i} className={item.product.items.length > 0 ? "table-danger" : "none"}>
					<td>{i+1}</td>
					<td>{item.customerName}</td>
					<td>{item.service.items.length > 0 ? item.service.items[0].service.name : item.product.items.length > 0 ? item.product.items[0].product.name : "n/a"}</td>
					{/* <td>{item.service.items.length > 0 ? item.service.items[0].service.cost : item.product.items.length > 0 ? item.product.items[0].product.cost : "n/a"}</td> */}
					<td>{item.service.items.length > 0 ? item.service.items[0].cost : item.product.items.length > 0 ? item.product.items[0].cost : "n/a"}</td>
				</tr>
			)
		)):(<td></td>)
	
	return (
		<div align="center" style={{marginTop: 20}}>
			<Tabs defaultActiveKey="registers" id="uncontrolled-tab-example">
				<Tab eventKey="registers" title={<Icon icon="list"/>}>
					<div style={{marginTop:20}}>
						<FormGroup>
							<DateInput onChange={e => setDate(e)} {...getMomentFormatter("LL")} locale="de" />
							<Button onClick={(e) => { e.preventDefault(); getRequestsByDay();}} variant="primary" loading={searchLoading}>Buscar</Button>
						</FormGroup>
						<div className="m-2">
							{searchError &&
								<Alert variant="danger">
									{searcherrorMessage}
								</Alert>	
							}
						</div>
						<Table striped bordered hover>
							<thead>
								<tr>
									<th>No.</th>
									<th>Cliente</th>
									<th>Servicio / Producto</th>
									<th>Costo</th>
									{/* <th>Costo</th> */}
								</tr>
							</thead>
							<tbody>
								{_requestsSearch}
							</tbody>
						</Table>
					</div>
				</Tab>
				<Tab eventKey="timeline-line-chart" title={<Icon icon="timeline-line-chart"/>}>
					<Line rp={rp} data={lineData} SelectMonth={SelectMonth}/>
				</Tab>
				<Tab eventKey="timeline-bar-chart" title={<Icon icon="timeline-bar-chart"/>}>
					<Bar rp={rp} data={barData} SelectMonth={SelectMonth}/>
				</Tab>
				<Tab eventKey="pie-chart" title={<Icon icon="pie-chart"/>}>
					<Pie rp={rp} data={pieData} SelectMonth={SelectMonth}/>
				</Tab>
			</Tabs>
        </div>
	);
};

export default Reports;