import { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { listRequests } from '../../graphql/customQueries';
import { updateRequest } from '../../graphql/mutations';

import { onCreateRequest, onCreateRequestService } from '../../graphql/customSubscptions';

const useEmployee = (props) => {
    const [ requests, setRequests ] = useState([]);
    const [ requestInProcess, setRequestInProcess ] = useState(false);
	const [ loading, setLoading ] = useState(true);
	const [ error, setError ] = useState(false);
	const [ errorMessage, setErrorMessage ] = useState(false);

	const [ requestToFinish, setRequestToFinish ] = useState('');
	const [ finishLoading, setFinishLoading ] = useState(false);
	const [ finishError, setFinishError ] = useState(false);
	const [ finishErrorMessage, setFinishErrorMessage ] = useState(false);

	const [ inProcessLoading, setInProcessLoading ] = useState(false);
	const [ inProcessError, setInProcessError ] = useState(false);
	const [ inProcessErrorMessage, setInProcessErrorMessage ] = useState(false);

	
	useEffect(() => {
		let didCancel = false;

		const fetch = async () => {
            setLoading(true);
			var requestsApi = [];

			try {
                requestsApi = await API.graphql(graphqlOperation(listRequests, {limit: 400, filter:{ and: [ { or: [ {state: { eq: "ON_HOLD"} }, {state: { eq: "IN_PROCESS"} }]}, {resposibleName: { eq: props.state.username} }]}}));
			} catch (e) {
				setLoading(false);
				setError(true);
				setErrorMessage(e);
			}

			if (!didCancel) {
				if(requestsApi.data.listRequests.items.filter(e => e.state === "IN_PROCESS").length > 0){
					setRequestToFinish(requestsApi.data.listRequests.items.filter(e => e.state === "IN_PROCESS")[0].id)
					setRequestInProcess(true);
				}
				setRequests(requestsApi.data.listRequests.items.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)));
				setLoading(false);
			}
		};

		const subscribeRequest = async () => {
			await API.graphql(graphqlOperation(onCreateRequest, {resposibleName: props.state.username})).subscribe({
			  next: r => {
				setRequests(prevState => ([...prevState, r.value.data.onCreateRequest]));
			  }
			});
		};
	
		const subscribeRequestService = async () => {
			await API.graphql(graphqlOperation(onCreateRequestService, {resposibleName: props.state.username})).subscribe({
			  next: r => {
				setRequests(prevState => {
					//console.log(prevState);
					var _requests = prevState;
					var _edit = _requests[_requests.findIndex(e => e.id === r.value.data.onCreateRequestService.request.id)];
					_requests.splice(_requests.findIndex(e => e.id === r.value.data.onCreateRequestService.request.id), 1);
					
					if(_edit !== undefined) {
						_edit.service.items = [r.value.data.onCreateRequestService];
						_requests.push(_edit);
					}
					return (_requests)
				});
			  }
			});
		};

		fetch();
		subscribeRequest();
		subscribeRequestService();

		return () => {
			didCancel = true;
		};
	}, [props.state.username]);

	const nextRequest = () => {
		setInProcessLoading(true);
		API.graphql(graphqlOperation(updateRequest, { input: { id: requests[0].id, state: 'IN_PROCESS' } }))
		.then(r => {
			const editObject = requests[requests.findIndex(e => e.id === r.data.updateRequest.id)];
			requests.splice(requests.findIndex(e => e.id === r.data.updateRequest.id), 1);
			editObject.state = 'IN_PROCESS';
			requests.unshift(editObject);
			setRequestToFinish(requests[0].id);
			setRequestInProcess(true);
			setInProcessLoading(false);
		})
		.catch(e => {
			setInProcessError(true);
			setInProcessLoading(false)
			setInProcessErrorMessage(e);
		});
	}

	const FinishRequest = () => {
		setFinishLoading(true);
		API.graphql(graphqlOperation(updateRequest, { input: { id: requestToFinish, state: 'FINISHED' } }))
		.then(r => {
			requests.splice(requests.findIndex(e => e.id === requestToFinish), 1);
			setRequestInProcess(false);
			setFinishLoading(false);
		})
		.catch(e => {
			setFinishError(true);
			setFinishLoading(false)
			setFinishErrorMessage(e);
		});
	}

	return { requests, requestInProcess, finishLoading, finishError, finishErrorMessage, FinishRequest, nextRequest, loading, error, errorMessage, inProcessLoading, inProcessError, inProcessErrorMessage };
};

export default useEmployee;

