import { useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { listRequestsPerDay } from '../../graphql/customQueries';
import { updateRequest } from '../../graphql/mutations';

import swal from 'sweetalert';

import moment from "moment";

import * as alasql from 'alasql';
var XLSX = require('xlsx')
alasql.setXLSX(XLSX);

const useReports = (props) => {

	const [requestsSearch, setRequestsSearch] = useState([]);
	const [date, setDate] = useState(new Date());
	const [month, setMonth] = useState('');
	const [year, setYear] = useState('');

	const [results, setResults] = useState([]);
	const [currentData, setCurrentData] = useState([]);
	const [dayResults, setDayResults] = useState([]);
	const [gearnings, setEarnings] = useState([]);
	const [tgearnings, setTotalEarnings] = useState(0);
	const [grequests, setRequests] = useState([]);
	const [tgrequests, setTotalRequests] = useState(0);

	const [gservicesn, setEargingByServicesn] = useState([]);
	const [gservices, setEargingByServices] = useState([]);

	const [tableData, setTableData] = useState([]);

	const [loading, setLoading] = useState({
		type: '',
	});

	const [searchLoading, setSearchLoading] = useState(false);
	const [searchError, setSearchError] = useState(false);
	const [searcherrorMessage, setSearchErrorMessage] = useState('');

	const getRequestsByDay = async () => {

		try {
			setSearchLoading(true);

			var _results = dayResults;
			var _date = String(moment(date).format('YYYY-MM-DDT') + '00:00:00.000');

			var prior_request = _results[_results.findIndex(e => e.id === _date)];

			if (prior_request !== undefined) {
				setRequestsSearch(prior_request.data)
			} else {

				var result = { id: _date, data: [] };

				const r = await API.graphql(graphqlOperation(listRequestsPerDay, {
					filter: {
						and: [
							{ date: { gt: _date } },
							{ date: { lt: String(moment(date).format('YYYY-MM-DDT') + '23:59:59.000') } },
							{ companyId: { eq: props.state.company.id } },
							{ state: { eq: 'FINISHED' } },
						]
					},
					limit: 1000
				}))

				result.data = r.data.listRequests.items;

				_results.push(result);

				setDayResults(_results);

				setRequestsSearch(r.data.listRequests.items)
			}
		} catch (e) {
			setSearchLoading(false);
			setSearchError(true);
			setSearchErrorMessage('Ha ocurrido un error interno en la busqueda');
			console.log(e);
		}

		setSearchLoading(false);
	}

	const requests = async (f) => await API.graphql(graphqlOperation(listRequestsPerDay, { filter: f, limit: 1000 }));

	const getMonthResults = async () => {
		if (month === '' || year === '' || month.match(/^[0-9]+$/) === null || year.match(/^[0-9]+$/) === null || month === 'Seleccione el mes...' | year === 'Seleccione el año...') {
			swal({ title: "Reportes!", text: "Debe seleccionar el año y el mes.", icon: "error", timer: 2000 });
			return;
		}

		const start = year + "-" + month + "-01T00:00:00.000";
		var _date = new Date(start); //dd-mm-YYYY

		var today = new Date();

		if (_date > today) {
			swal({ title: "Reportes!", text: "Debe seleccionar una fecha anterior a la fecha actual.", icon: "error", timer: 2000 });
			return;
		}

		setLoading({ type: 'getrequests' });
		var _results = results;

		const end = year + "-" + month + "-" + getLastDay(month) + "T23:59:59.000";

		var prior_request = _results[_results.findIndex(e => e.id === start)];

		if (prior_request !== undefined) {
			setData(prior_request.data);
			setCurrentData(prior_request.data);

			setLoading({ type: '' });
		} else {

			const filter = {
				and: [
					{ date: { gt: String(start) } },
					{ date: { lt: String(end) } },
					{ state: { eq: 'FINISHED' } },
					{ companyId: { eq: props.state.company.id } },
				]
			}

			var result = { id: start, data: [] };

			const r = await requests(filter);

			result.data = r.data.listRequests.items;

			//result.data.forEach(e => {
			//	if(e.date === null){
			//		console.log(e);
			//		API.graphql(graphqlOperation(updateRequest, { input: {id: e.id, date: e.createdAt} }));
			//	}
			//});

			_results.push(result);

			setData(r.data.listRequests.items)
			setCurrentData(r.data.listRequests.items)

			setResults(_results);

			setLoading({ type: '' });
		}
	}

	const setData = (data) => {
		var rresult = [];
		var eresult = [];
		var snresult = [];
		var sresult = [];
		var totalR = data.length;
		var totalE = 0;
		var tableD = [];

		for (let i = 0; i <= parseInt(getLastDay(month)); i++) {
			rresult.push(0);
			eresult.push(0);
		}

		data.forEach(e => {
			var date = new Date(e.date);
			if (e.service.items.length === 0) {
				console.log(e.id);
			}
			var service = e.service.items.length !== 0 ? e.service.items[0].service.name : 'n/a';
			var cost = e.service.items.length !== 0 ? (e.service.items[0].cost === null ? e.service.items[0].service.cost : e.service.items[0].cost) : "n/a";
			var tableItem = {
				client: e.customerName,
				service: service,
				price: cost,
				date: moment(e.date).format('DD-MM-YY')
			};

			totalE = parseInt(cost) + parseInt(totalE);

			if (snresult.findIndex(e => e === service) === -1) {
				snresult.push(service);
				sresult.push(parseInt(cost));
			} else {
				sresult[snresult.findIndex(e => e === service)] = sresult[snresult.findIndex(e => e === service)] + parseInt(cost);
			}

			tableD.push(tableItem)
			rresult[(date.getDate())] = rresult[(date.getDate())] + 1;
			eresult[(date.getDate())] = eresult[(date.getDate())] + parseInt(cost);
		});

		setTableData(tableD);
		setRequests(rresult);
		setEarnings(eresult);
		setEargingByServicesn(snresult);
		setEargingByServices(sresult);
		setTotalEarnings(totalE);
		setTotalRequests(totalR);
	}

	const getLastDay = (m) => {
		if (m === '01' || m === '03' || m === '05' || m === '07' || m === '08' || m === '10' || m === '12') {
			return '31'
		} else if (m === '04' || m === '06' || m === '09' || m === '11') {
			return '30'
		} else if (m === '02') {
			return '28'
		}
	}

	const daysArray = (m) => {
		var days = [];
		var mds = getLastDay(m);
		for (let i = 0; i <= parseInt(mds); i++) {
			days.push(i.toString());
		}
		return days;
	}

	const lineData = {
		labels: daysArray(month),
		datasets: [
			{
				label: 'Ingresos por dia durante el mes ' + month,
				fill: false,
				lineTension: 0.1,
				backgroundColor: 'rgba(75,192,192,0.4)',
				borderColor: 'rgba(75,192,192,1)',
				borderCapStyle: 'butt',
				borderDash: [],
				borderDashOffset: 0.0,
				borderJoinStyle: 'miter',
				pointBorderColor: 'rgba(75,192,192,1)',
				pointBackgroundColor: '#fff',
				pointBorderWidth: 1,
				pointHoverRadius: 5,
				pointHoverBackgroundColor: 'rgba(75,192,192,1)',
				pointHoverBorderColor: 'rgba(220,220,220,1)',
				pointHoverBorderWidth: 2,
				pointRadius: 1,
				pointHitRadius: 10,
				data: gearnings
			}
		]
	};

	const barData = {
		labels: daysArray(month),
		datasets: [
			{
				label: 'Solicitudes de Servicios por Mes',
				backgroundColor: 'rgba(255,99,132,0.2)',
				borderColor: 'rgba(255,99,132,1)',
				borderWidth: 1,
				hoverBackgroundColor: 'rgba(255,99,132,0.4)',
				hoverBorderColor: 'rgba(255,99,132,1)',
				data: grequests
			}
		]
	}

	const pieData = {
		labels: gservicesn,
		datasets: [{
			data: gservices,
			backgroundColor: [
				'#FF6384',
				'#36A2EB',
				'#FFCE56'
			],
			hoverBackgroundColor: [
				'#FF6384',
				'#36A2EB',
				'#FFCE56'
			]
		}]
	};

	const getYears = () => {
		var max = new Date().getFullYear();
		var years = [];

		for (var i = max; i >= 2020; i--) {
			years.push(i.toString())
		}

		return years
	}

	const getMonths = () => {
		var months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
		var monthsObjects = [];
		var value = 0;

		months.forEach(e => {
			value = value + 1;
			if (value < 10) {
				monthsObjects.push({ value: '0' + value, name: e });
			} else {
				monthsObjects.push({ value: value.toString(), name: e });
			}
		});

		return monthsObjects
	}

	const setInitialStates = () => {
		setEarnings([]);
		setRequests([]);
		setEargingByServices([]);
		setEargingByServicesn([]);
		setTotalEarnings(0);
		setTotalRequests(0);
	}

	function downloadExcel() {
		var companyName = (props.state.company.name).replace(" ", "_");

		var reportName = "FORMATO_607_DGII_" + companyName + "_" + month + "_" + year;

		var sheet_data = [];

		currentData.forEach(e => {
			//console.log(e);
			sheet_data.push({
				//1-Digite el “RNC / Cédula o Pasaporte” de la persona que adquirió el servicios.
				RNC_Ceedula_Pasaporte: "40224126819",
				//2-En “Tipo Identificación” 2. Si se registra una Cédula
				Tipo_Identificación: 2,
				//3-En “Número Comprobante Fiscal” NCF "B0100000000000000000"
				Número_Comprobante_Fiscal: "B0100000000000000000",
				//4-En “Número Comprobante Fiscal Modificado” nota debito o credito B0300000000000000000 o B0400000000000000000
				Número_Comprobante_Fiscal_Modificado: "B0300000000000000000",
				//5-En “Tipo de Ingreso”  siempre "1" Ingreso por operaciones
				Tipo_Ingreso: "1",
				//6-En “Fecha Comprobante” Fecha en la que se realizó la venta. formato: YYYYMMDD.
				Fecha_Comprobante: moment(e.date).format('YYYYMMDD'),
				//7-En “Fecha de Retención” deje el espacio en blanco. (opcional)
				Fecha_Retención: "",
				//8-En “Monto Facturado” registre el valor de la venta del bien o servicio, sin incluir impuestos. (se pone el costo del servicio)
				Monto_Facturado: e.service.items[0].cost === null ? e.service.items[0].service.cost : e.service.items[0].cost,

				//9-En “ITBIS Facturado” digite el valor del ITBIS facturado en el comprobante, sin incluir otros impuestos.
				ITBIS_Facturado: "0",
				//10-En “ITBIS Retenido por Terceros” en blanco
				ITBIS_Retenido_Terceros: "",
				//11-En “ITBIS Percibido”* En blanco
				ITBIS_Percibido: "",
				//12-En “Retención Renta por Terceros” En blanco
				Retención_Renta_Terceros: "",
				//13-En “ISR Percibido”* en blanco
				ISR_Percibido: "",
				//14-En “Impuesto Selectivo al Consumo” Monto correspondiente al Impuesto Selectivo al Consumo producto de una venta gravada con este impuesto.
				Impuesto_Selectivo_Consumo: "0",
				//15-En “Otros Impuestos/Tasas” Monto de cualquier otro impuesto o tasa no especificado en el formato de envío y que formen parte del valor del comprobante fiscal.
				Otros_Impuestos_Tasas: "0",
				//16-En “Monto Propina Legal” coloque el monto de la propina establecida por la Ley 54-32 (10%).
				Monto_Propina_Legal: "0",

				//17-En "Efectivo" coloque el monto correspondiente a la proporción del pago de la venta recibida en efectivo. (Costo del servicio)
				Efectivo: e.service.items[0].cost === null ? e.service.items[0].service.cost : e.service.items[0].cost,
				//18-En "Cheque/Transferencia/Depósito" 0.
				Cheque_Transferencia_Depoosito: "",

				//19-En "Tarjeta Débito/Crédito" 0 debe agregarse el costo en caso de haber realizado el pago con tarjeta
				Tarjeta_Débito_Crédito: e.paymentType === "CARD" ? e.service.items[0].cost === null ? e.service.items[0].service.cost : e.service.items[0].cost : 0,
				//20-En "Venta a Crédito" 0
				Venta_Crédito: "0",
				//21-En "Bonos o Certificados de Regalo" 0
				Bonos_Certificados_Regalo: "0",
				//22-En "Permuta"* 0
				Permuta: "0",
				//23-En "Otras Formas de Ventas" 0
				Otras_Formas_de_Ventas: "0",
			});
		});

		var opts = [{ sheetid: '607', header: true }];

		alasql('SELECT * INTO XLSX("' + reportName + '",?) FROM ?', [opts, [sheet_data]]);
	}

	const rp = {
		date: {
			setDate,
			setYear,
			years: getYears(),
			setMonth,
			months: getMonths(),
		},
		getMonthResults,
		load: {
			loading,
			setLoading
		},
		setInitialStates,
		tgearnings,
		tgrequests,
		downloadExcel
	}

	return { downloadExcel, rp, tableData, barData, pieData, lineData, requestsSearch, searchLoading, searchError, searcherrorMessage, setDate, getRequestsByDay };
};

export default useReports;

