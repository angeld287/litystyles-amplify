import { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { listRequests } from './../../graphql/queries';
import { updateRequest } from '../../graphql/mutations';

const useAdministration = () => {
    const [ requests, setRequests ] = useState([]);
	const [ loading, setLoading ] = useState(true);
	const [ error, setError ] = useState(false);
	const [ errorMessage, setErrorMessage ] = useState(false);

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
			setCancelLoading(false)
			setCancelErrorMessage(e);
		});
	}

	return { requests, cancelRequest, cancelOverlay, cancelLoading, cancelerror, cancelerrorMessage, confirmCancelRequest, setCancelOverlay, loading, error, errorMessage };
};

export default useAdministration;

