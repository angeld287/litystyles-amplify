import { useState, useEffect, useCallback } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { updateRequest } from '../../graphql/customMutations';
import { getCompanyOfficesProductsAndServices/* , listOffices */ } from '../../graphql/customQueries';
import { listCategorys, listServices, listProducts, listRequests, /* listEmployees */} from '../../graphql/queries';

const useAdministration = (props) => {
    const [ requests, setRequests ] = useState([]);
    const [ requested, setRequested ] = useState(false);
    const [ companyServices, setCompanyServices ] = useState([]);
    const [ companyProducts, setCompanyProducts ] = useState([]);
    const [ offices, setOffices ] = useState([]);
    const [ services, setServices ] = useState([]);
    const [ products, setProducts ] = useState([]);
    const [ employees, setEmployees ] = useState([]);
    const [ categories, setCategories ] = useState([]);
	
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

	const _requests = useCallback(
		async () => {

		try {
			const filter = {
				and: [
					{state: {ne: 'FINISHED'}},
					{state: {ne: 'CANCELED'}},
					{companyId: {eq: props.state.company.id}},
				]
			}

			if(requests.length === 0 && !requested){
				setLoading({type: 'requests'})
				const api = await API.graphql(graphqlOperation(listRequests, { filter: filter, limit: 1000 } ));
				setRequests(api.data.listRequests.items);
				setRequested(true);
				setLoading({type: ''})
			}
		} catch (e) {
			setError({
				type: 'requests',
				message: 'Error al buscar las solicitudes'
			})
			setLoading({type: ''})
		}
	},
	[requests, props, requested]
	);

	useEffect(() => { _requests()}, [_requests]);

	const onSelectTab = (e) => {
		switch (e) {
			case 'requests':
				//_requests();
				break;
			case 'offices':
				_getCategories();
				_getCompanyData('offices');
				break;
			case 'services':
				_getCompanyData(e);
				_services();
				break;
			case 'products':
				_getCompanyData(e);
				_products();
				break;
		
			default:
				break;
		}
	}

	//solo se podra llamar cuando se necesite crear o editar un servicio de la compania
	const _services = async () => {
		try {
			if(services.length === 0){
				setLoading({type: 'services'})
				const api = await API.graphql(graphqlOperation(listServices, {filter: {deleted: {ne: true}}}));
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
				const api = await API.graphql(graphqlOperation(listProducts, {filter: {deleted: {ne: true}}}));
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

	const _getCategories = async () => {
		try {
			if(categories.length === 0){
				setLoading({type: 'categories'})
				const api = await API.graphql(graphqlOperation(listCategorys, {filter: {typeName: {eq: "Office"}}}));
				setCategories(api.data.listCategorys.items);
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
			if(companyProducts.length === 0 || companyServices.length === 0 || offices.length === 0){
				setLoading({type: type})
				const api = await API.graphql(graphqlOperation(getCompanyOfficesProductsAndServices, {id: props.state.company.id}));
				setCompanyProducts(api.data.getCompany.products.items.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)));
				setCompanyServices(api.data.getCompany.services.items.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)));
				setOffices(api.data.getCompany.offices.items);
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
		cat: {
			categories,
			setCategories
		},
		emp: {
			employees,
			setEmployees
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
		},
		state: props.state,
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
			console.log(e)
			setCancelErrorMessage('Ha ocurrido un error al cancelar la solicitud');
		});
	}

	return { ap, onSelectTab, requests, cancelRequest, cancelOverlay, cancelLoading, cancelerror, cancelerrorMessage, confirmCancelRequest, setCancelOverlay };
};

export default useAdministration;