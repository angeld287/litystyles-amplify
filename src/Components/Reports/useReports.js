import { useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { listRequestsPerDay } from '../../graphql/customQueries';

import swal from 'sweetalert';

import moment from "moment";

const useReports = () => {
    const [ requestsSearch, setRequestsSearch ] = useState([]);
	const [ date, setDate ] = useState(new Date());
	const [ month, setMonth ] = useState('');
	const [ year, setYear ] = useState('');

	const [ results, setResults ] = useState([]); 
	const [ dayResults, setDayResults ] = useState([]); 
	const [ gearnings, setEarnings ] = useState([]); 
	const [ grequests, setRequests ] = useState([]); 

	const [ gservicesn, setEargingByServicesn ] = useState([]); 
	const [ gservices, setEargingByServices ] = useState([]); 

	const [ loading, setLoading ] = useState({
		type: '',
	});

	const [ searchLoading, setSearchLoading ] = useState(false);
	const [ searchError, setSearchError ] = useState(false);
	const [ searcherrorMessage, setSearchErrorMessage ] = useState('');

	const getRequestsByDay = async () => {

		try {
			setSearchLoading(true);

			var _results = dayResults;
			var _date = String(moment(date).format('YYYY-MM-DDT')+'00:00:00.000');

			var prior_request = _results[_results.findIndex(e => e.id === _date)];

			if(prior_request !== undefined){
				setRequestsSearch(prior_request.data)
			}else{
				

				var result = {id: _date, data: []};

				const r = await API.graphql(graphqlOperation(listRequestsPerDay, {
					filter: {
					  and: [
						{createdAt: {gt: _date}}, 
						{createdAt: {lt: String(moment(date).format('YYYY-MM-DDT')+'23:59:59.000')}},
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
		if(month === '' || year === '' || month.match(/^[0-9]+$/) === null || year.match(/^[0-9]+$/) === null || month === 'Seleccione el mes...' | year === 'Seleccione el año...')  {
			swal({ title: "Reportes!", text: "Debe seleccionar el año y el mes.", type: "error", timer: 2000 });
			return;
		}

		const start = year+"-"+month+"-01T00:00:00.000";
		var _date = new Date(start); //dd-mm-YYYY
		
		var today = new Date();

		if(_date > today) {
			swal({ title: "Reportes!", text: "Debe seleccionar una fecha anterior a la fecha actual.", type: "error", timer: 2000 });
			return;
		}

		setLoading({type: 'getrequests'});
		var _results = results;

		const end = year+"-"+month+"-"+getLastDay(month)+"T23:59:59.000";

		var prior_request = _results[_results.findIndex(e => e.id === start)];

		if(prior_request !== undefined){
			setData(prior_request.data);

			setLoading({type: ''});
		}else{

			const filter = {
				and: [
					{createdAt: {gt: String(start)}}, 
					{createdAt: {lt: String(end)}},
					{state: {eq: 'FINISHED'}},
				]
			}
			
			var result = {id: start, data: []};

			const r = await requests(filter);

			result.data = r.data.listRequests.items;

			_results.push(result);

			setData(r.data.listRequests.items)

			setResults(_results);

			setLoading({type: ''});
		}
	}

	const setData = (data) => {
		var rresult = [];
		var eresult = [];
		var snresult = [];
		var sresult = [];

		for (let i = 0; i <= parseInt(getLastDay(month)); i++) {
			rresult.push(0);
			eresult.push(0);
		}
		
		data.forEach(e => {
			//console.log(e);
			var date = new Date(e.createdAt);
			var service = e.service.items[0].service.name;
			var cost = e.service.items[0].service.cost;
			
			if(snresult.findIndex(e => e === service) === -1){
				snresult.push(service);
				sresult.push(parseInt(cost));
			}else{
				sresult[snresult.findIndex(e => e === service)] = sresult[snresult.findIndex(e => e === service)] + parseInt(cost);
			}

			rresult[(date.getDate() - 1)] = rresult[(date.getDate() - 1)] + 1;
			eresult[(date.getDate() - 1)] = eresult[(date.getDate() - 1)] + parseInt(cost);
		});

		setRequests(rresult)
		setEarnings(eresult)
		setEargingByServicesn(snresult);
		setEargingByServices(sresult);
	} 

	const getLastDay = (m) => {
		if ( m === '01' || m === '03' || m === '05' || m === '07' || m === '08' || m === '10' || m === '12') {
			return '31'
		} else if(m === '04' || m === '06' || m === '09' || m === '11'){
			return '30'
		}else if(m === '02'){
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
			label: 'Ingresos por dia durante el mes '+month,
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
				monthsObjects.push({value: '0'+value, name: e});				
			} else {
				monthsObjects.push({value: value.toString(), name: e});
			}
		});

		return monthsObjects
	}


	const setInitialStates = () => {
		setEarnings([]);
		setRequests([]);
		setEargingByServices([]);
		setEargingByServicesn([]);
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
	}

	return { rp, barData, pieData, lineData, requestsSearch, searchLoading, searchError, searcherrorMessage, setDate, getRequestsByDay };
};

export default useReports;

