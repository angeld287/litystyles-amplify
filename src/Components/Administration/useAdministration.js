import { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { listRequests } from './../../graphql/queries';
import { listRequestsPerDay } from './../../graphql/customQueries';
import { updateRequest } from '../../graphql/mutations';

import moment from "moment";

const useAdministration = () => {
    const [ requests, setRequests ] = useState([]);
    const [ requestsSearch, setRequestsSearch ] = useState([]);
	const [ date, setDate ] = useState('');
	
	const [ loading, setLoading ] = useState(true);
	const [ error, setError ] = useState(false);
	const [ errorMessage, setErrorMessage ] = useState('');

	const [ searchLoading, setSearchLoading ] = useState(false);
	const [ searchError, setSearchError ] = useState(false);
	const [ searcherrorMessage, setSearchErrorMessage ] = useState('');

	const [ requestToCancel, setRequestToCancel ] = useState('');
	const [ cancelOverlay, setCancelOverlay ] = useState(false);
	const [ cancelLoading, setCancelLoading ] = useState(false);
	const [ cancelerror, setCancelError ] = useState(false);
	const [ cancelerrorMessage, setCancelErrorMessage ] = useState(false);

	
	useEffect(() => {
		let didCancel = false;

		const fetch = async () => {
            setLoading(true);
			var requestsApi = [];

			try {
                requestsApi = await API.graphql(graphqlOperation(listRequests, { filter: {state: { eq: "ON_HOLD"}}}));
			} catch (e) {
				setLoading(false);
				setError(true);
				setErrorMessage(e);
			}

			if (!didCancel) {
                setRequests(requestsApi.data.listRequests.items);
				setLoading(false);
			}
		};

		fetch();

		return () => {
			didCancel = true;
		};
	}, []);

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

	return { requestsSearch, searchLoading, searchError, searcherrorMessage, setDate, getRequestsByDay, requests, cancelRequest, cancelOverlay, cancelLoading, cancelerror, cancelerrorMessage, confirmCancelRequest, setCancelOverlay, loading, error, errorMessage };
};

export default useAdministration;

