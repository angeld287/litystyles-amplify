import { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { updateRequest } from '../../graphql/mutations';
import { getCompanyProductsAndServices } from '../../graphql/customQueries';
import { listServices, listProducts, listOffices, listRequests, listEmployees} from '../../graphql/queries';

const useAdministration = (props) => {
    const [ requests, setRequests ] = useState([]);
    const [ companyServices, setCompanyServices ] = useState([]);
    const [ companyProducts, setCompanyProducts ] = useState([]);
    const [ offices, setOffices ] = useState([]);
    const [ services, setServices ] = useState([]);
    const [ products, setProducts ] = useState([]);
    const [ employees, setEmployees ] = useState([]);
	
	const [ loading, setLoading ] = useState({
		type: ''
	});
	const [ error, setError ] = useState({
		type: '',
		message: ''
	});

	const [ requestToCancel, setRequestToCancel ] = useState('');
	const [ cancelOverlay, setCancelOverlay ] = useState(false);
	const [ cancelLoading, setCancelLoading ] = useState(false);
	const [ cancelerror, setCancelError ] = useState(false);
	const [ cancelerrorMessage, setCancelErrorMessage ] = useState(false);

	
	useEffect(() => {
		let didCancel = false;

		

		return () => {
			didCancel = true;
		};
	}, []);

	const onSelectTab = (e) => {
		switch (e) {
			case 'requests':
				_requests();
				break;
			case 'offices':
				_offices();
				break;
			case 'services':
				_getCompanyData(e);
				_services();
				break;
			case 'products':
				_getCompanyData(e);
				break;
			case 'employees':
				_employees();
				break;
		
			default:
				break;
		}
	}

	//solo se podra llamar cuando se necesite crear o editar un servicio de la compania
	const _services = async () => {
		try {
			if(services.length === 0){
				//setLoading({type: 'services'})
				const api = await API.graphql(graphqlOperation(listServices));
				setServices(api.data.listServices.items);
				setLoading({type: ''})
			}
		} catch (e) {
			setError({
				type: 'services',
				message: 'Error al buscar los servicios'
			})
			setLoading({type: ''})
		}
	}

	const _products = async () => {
		try {
			if(products.length === 0){
				setLoading({type: 'products'})
				const api = await API.graphql(graphqlOperation(listProducts));
				setProducts(api.data.listProducts.items);
				setLoading({type: ''})
			}
		} catch (e) {
			setError({
				type: 'products',
				message: 'Error al buscar los productos'
			})
			setLoading({type: ''})
		}
	}

	const _requests = async () => {
		try {
			if(requests.length === 0){
				setLoading({type: 'requests'})
				const api = await API.graphql(graphqlOperation(listRequests));
				setRequests(api.data.listRequests.items);
				setLoading({type: ''})
			}
		} catch (e) {
			setError({
				type: 'requests',
				message: 'Error al buscar las solicitudes'
			})
			setLoading({type: ''})
		}
	}

	const _offices = async () => {
		try {
			if(offices.length === 0){
				setLoading({type: 'offices'})
				const api = await API.graphql(graphqlOperation(listOffices));
				setOffices(api.data.listOffices.items);
				setLoading({type: ''})
			}
		} catch (e) {
			setError({
				type: 'offices',
				message: 'Error al buscar las oficinas'
			})
			setLoading({type: ''})
		}
	}

	const _getCompanyData = async (type) => {
		try {
			if(companyProducts.length === 0 || companyServices.length === 0){
				setLoading({type: type})
				const api = await API.graphql(graphqlOperation(getCompanyProductsAndServices, {id: props.state.company.id}));
				setCompanyProducts(api.data.getCompany.products.items);
				setCompanyServices(api.data.getCompany.services.items);
				setLoading({type: ''})
			}
		} catch (e) {
			console.log(e);
			setError({
				type: type,
				message: 'Error al buscar los datos de la compania'
			})
			setLoading({type: ''})
		}

	}

	const _employees = async () => {
		try {
			if(employees.length === 0){
				setLoading({type: 'employees'})
				const api = await API.graphql(graphqlOperation(listEmployees));
				setEmployees(api.data.listEmployees.items);
				setLoading({type: ''})
			}
		} catch (e) {
			setError({
				type: 'employees',
				message: 'Error al buscar los empleados'
			})
			setLoading({type: ''})
		}
	}


	const ap = {
		req: {
			requests,
			setRequests
		},
		cser: {
			companyServices,
			setCompanyServices,
			_services
		},
		cpro: {
			companyProducts,
			setCompanyProducts,
			_products
		},
		off: {
			offices,
			setOffices
		},
		ser: {
			services,
			setServices,
		},
		pro: {
			products,
			setProducts
		},
		load: {
			loading,
			setLoading
		},
		err: {
			error,
			setError
		}
	};


	const cancelRequest = (id) => {
		setRequestToCancel(id);
		setCancelOverlay(true);
	}

	const confirmCancelRequest = () => {
		setCancelLoading(true);
		API.graphql(graphqlOperation(updateRequest, { input: { id: requestToCancel, state: 'CANCELED' } }))
		.then(r => {
			requests.splice(requests.findIndex(e => e.id === requestToCancel), 1);
			setCancelOverlay(false);
			setCancelLoading(false);
		})
		.catch(e => {
			setCancelError(true);
			setCancelLoading(false);
			setCancelErrorMessage(e);
		});
	}

	return { ap, onSelectTab, requests, cancelRequest, cancelOverlay, cancelLoading, cancelerror, cancelerrorMessage, confirmCancelRequest, setCancelOverlay };
};

export default useAdministration;

