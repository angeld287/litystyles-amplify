import { useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { listRequestsPerDay } from '../../graphql/customQueries';
import { listRequests } from '../../graphql/queries';

import swal from 'sweetalert';

import moment from "moment";

const useReports = () => {
    const [ requestsSearch, setRequestsSearch ] = useState([]);
	const [ date, setDate ] = useState(new Date());
	const [ month, setMonth ] = useState('');
	const [ year, setYear ] = useState('');

	const [ results, setResults ] = useState([]); 

	const [ loading, setLoading ] = useState({
		type: '',
	});

	const [ searchLoading, setSearchLoading ] = useState(false);
	const [ searchError, setSearchError ] = useState(false);
	const [ searcherrorMessage, setSearchErrorMessage ] = useState('');

	const getRequestsByDay = async () => {

		try {
			setSearchLoading(true);
			const r = await API.graphql(graphqlOperation(listRequestsPerDay, {
				filter: {
				  and: [
					{createdAt: {gt: String(moment(date).format('YYYY-MM-DDT')+'00:00:00.000')}}, 
					{createdAt: {lt: String(moment(date).format('YYYY-MM-DDT')+'23:59:59.000')}},
				  ]
				},
				limit: 500
			}))
			
			setRequestsSearch(r.data.listRequests.items)
		} catch (e) {
			setSearchLoading(false);
			setSearchError(true);
			setSearchErrorMessage('Ha ocurrido un error interno en la busqueda');
			console.log(e);
		}
		
		setSearchLoading(false);
	}

	const requests = async (f) => await API.graphql(graphqlOperation(listRequests, { filter: f, limit: 1000 }));

	const getMonthResults = async () => {
		console.log(results)
		if(month === '' || year === '' || month === 'Seleccione el mes...' | year === 'Seleccione el año...')  {
			swal({ title: "Reportes!", text: "Debe seleccionar el año y el mes.", type: "error", timer: 2000 });
			return;
		}
		var _results = results;

		const start = year+"-"+month+"-01T00:00:00.000";
		const end = year+"-"+month+"-"+getLastDay(month)+"T23:59:59.000";

		var prior_request = _results[_results.findIndex(e => e.id === start)];

		if(prior_request !== undefined){

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

			setResults(_results);
		}
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

	const lineData = {
		labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
		datasets: [
		  {
			label: 'My First dataset',
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
			data: [65, 59, 80, 81, 56, 55, 40]
		  }
		]
	};

	const barData = {
		labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30' ],
		datasets: [
		  {
			label: 'Servicios Solicitados por Mes',
			backgroundColor: 'rgba(255,99,132,0.2)',
			borderColor: 'rgba(255,99,132,1)',
			borderWidth: 1,
			hoverBackgroundColor: 'rgba(255,99,132,0.4)',
			hoverBorderColor: 'rgba(255,99,132,1)',
			data: [65, 59, 80, 81, 56, 55, 40]
		  }
		]
	}

	const pieData = {
		labels: [
		  'Red',
		  'Green',
		  'Yellow'
		],
		datasets: [{
		  data: [300, 50, 100],
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
		}
	}

	return { rp, barData, pieData, lineData, requestsSearch, searchLoading, searchError, searcherrorMessage, setDate, getRequestsByDay };
};

export default useReports;

