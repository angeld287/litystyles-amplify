import { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { listRequests } from '../../graphql/customQueries';
import { updateRequest } from '../../graphql/mutations';
import { onUpdateRequest } from '../../graphql/subscriptions';

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

	const [ tcPayLoading, setTcPayLoading ] = useState(false);
	const [ tcPayError, setTcPayError ] = useState(false);
	const [ tcPayErrorMessage, setTcPayErrorMessage ] = useState(false);

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
				//console.log(requestsApi.data.listRequests.items);
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
				setRequests(requestsApi.data.listRequests.items.sort((a, b) => new Date(a.date) - new Date(b.date)));
				setLoading(false);
			}
		};

		const subscribeRequest = async () => {
			await API.graphql(graphqlOperation(onCreateRequest, {resposibleName: props.state.username})).subscribe({
			  next: r => {
				setRequests(prevState => ([...prevState, r.value.data.onCreateRequest]));
			  }
			});

			await API.graphql(graphqlOperation(onUpdateRequest, {resposibleName: props.state.username})).subscribe({
				next: r => {
					var state = r.value.data.onUpdateRequest.state;
					if (state !== "ON_HOLD" && state !== "IN_PROCESS") {
						setRequests(p => ([...p.filter(e => e.id !== r.value.data.onUpdateRequest.id)]));
					}
				}
			});
		};
	
		const subscribeRequestService = async () => {
			await API.graphql(graphqlOperation(onCreateRequestService, {resposibleName: props.state.username})).subscribe({
			  next: r => {
				setRequests(prevState => {
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
	}, [props]);

	const sendNotifications = (object) => {
		fetch('https://fcm.googleapis.com/fcm/send', {
			method: 'POST',
			headers: {
			'Content-Type': 'application/json',
			'Authorization': 'key=AAAAd-I4wFI:APA91bGEnWMecuwzNUCeBUTde5HwEYP9eHEtXjhkHHgh7ivKX9yQnyQyxtaRcO5Ny_TLbyQFPoN5bYMEkUClfPr_ql8oDsK1OSw9yC0TCu7-Npjhn-871rJ-rfUW7JIti4EQwkkxu-3r'
			},
			body: JSON.stringify({
					to: object.to,
					priority: 'high',
					notification: {
						title: object.title,
						body: object.body,
						subtitle: object.body,
						sound: 'default',
						android_channel_id: 'littystyles_notification_channel_id'
					},
					data: {
						title: "Notification title",
    					message: "Notification message",
						naviateto: object.naviateto,
					}
				})
		}).then().catch((e) => { // Error response
			console.log(e);
		});
	}

	const notify = (item) => {
		const object = {
			to: item.customer.items[0].customer.phoneid,
			title: "Posicion 2 - Posible perdida de turno",
			body: "Usted se encuentra en el segundo lugar de la lista de turnos. De no llegar a tiempo, podria perder su turno.",
			sound: 'default',
			naviateto: "RequestInfo",
		}
		sendNotifications(object);
	}

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

	const setTCPayment = () => {
		setTcPayLoading(true);
		API.graphql(graphqlOperation(updateRequest, { input: { id: requestToFinish, paymentType: 'CARD' } }))
		.then(r => {
			var req = requests[requests.findIndex(e => e.id === requestToFinish)];
			req.paymentType = "CARD";
			setTcPayLoading(false);
		})
		.catch(e => {
			setTcPayError(true);
			setTcPayLoading(false)
			setTcPayErrorMessage(e);
		});
	}

	return { notify, tcPayLoading, tcPayError, tcPayErrorMessage, setTCPayment, requests, requestInProcess, finishLoading, finishError, finishErrorMessage, FinishRequest, nextRequest, loading, error, errorMessage, inProcessLoading, inProcessError, inProcessErrorMessage };
};

export default useEmployee;

