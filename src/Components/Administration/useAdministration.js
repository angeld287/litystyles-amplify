import { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { updateRequest } from '../../graphql/mutations';
import { listServices, listProducts, listOffices, listRequests, listEmployees} from '../../graphql/queries';

const useAdministration = (props) => {
    const [ requests, setRequests ] = useState([]);
    const [ companyServices, setCompanyServices ] = useState([]);
    const [ companyProducts, setCompanyProducts ] = useState([]);
    const [ offices, setOffices ] = useState([]);
    const [ services, setServices ] = useState([]);
    const [ products, setProducts ] = useState([]);
	
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
				_companyServices();
				break;
			case 'products':
				_companyProducts();
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
			setLoading({type: 'services'})
			const api = await API.graphql(graphqlOperation(listServices));
			setServices(api.data.listServices.items);
			setLoading({type: ''})
		} catch (e) {
			setError({
				type: 'services',
				message: 'Error al buscar los servicios'
			})
			setLoading({type: ''})
		}
	}

	const _products = async () => {

	}

	const _requests = async () => {

	}

	const _offices = async () => {

	}

	const _companyServices = async () => {

	}

	const _companyProducts = async () => {

	}

	const _employees = async () => {

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

	return { ap, onSelectTab, requests, cancelRequest, cancelOverlay, cancelLoading, cancelerror, cancelerrorMessage, confirmCancelRequest, setCancelOverlay, loading, errorMessage };
};

export default useAdministration;

