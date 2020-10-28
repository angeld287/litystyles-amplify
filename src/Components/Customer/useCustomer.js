import { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { getCompanyOfficesProductsAndServices } from './../../graphql/customQueries';
import { createRequest, createRequestService, createRequestEmployee, createRequestProduct } from '../../graphql/mutations';

import moment from "moment";

const useCustomer = (props, finishRequest, setStep) => {
	const [ company, setCompany ] = useState([]);
	const [ products, setProducts ] = useState({});
	const [ services, setServices ] = useState({});
	const [ employees, setEmployees ] = useState({});
	const [ loading, setLoading ] = useState(true);
	const [ error, setError ] = useState(false);
	const [ errorMessage, setErrorMessage ] = useState(false);
	const [ finish, setFinish ] = useState(false);


	useEffect(() => {
		let didCancel = false;

		const fetch = async () => {
			var companyApi = [];

			try {
				companyApi = await API.graphql(graphqlOperation(getCompanyOfficesProductsAndServices, {id: props.state.company.id, limit: 500}));
			} catch (e) {
				setLoading(false);
				setError(true);
				setErrorMessage(e);
			}

			if (!didCancel) {
				var officeId = props.state.office.id;
				var office = companyApi.data.getCompany.offices.items.filter(e => e.id === officeId)[0];
				setEmployees(office.employees.items)
                setCompany(companyApi.data.getCompany);
                setProducts(companyApi.data.getCompany.products.items);
				setServices(companyApi.data.getCompany.services.items);
				setLoading(false);
			}
		};

		fetch();

		return () => {
			didCancel = true;
		};
	}, [props.state.company.id, props.state.office.id]);

	const _createRequest = async (ri, rei, rsi, rpi, isService) => {
		try {
			setLoading(true);
			var request = {};
			ri.createdAt = moment(new Date()).format('YYYY-MM-DDTHH:mm:ss.SSS')+'Z';
			request = await API.graphql(graphqlOperation(createRequest, {input: ri}));

			if (isService) {
				rei.requestEmployeeRequestId = request.data.createRequest.id;
				rsi.requestServiceRequestId = request.data.createRequest.id;
				rpi.createdAt = moment(new Date()).format('YYYY-MM-DDTHH:mm:ss.SSS')+'Z';
				rsi.resposibleName = ri.resposibleName;
				await API.graphql(graphqlOperation(createRequestEmployee, {input: rei}));
				await API.graphql(graphqlOperation(createRequestService, {input: rsi}));
			} else {
				rpi.requestProductRequestId = request.data.createRequest.id;
				rpi.createdAt = moment(new Date()).format('YYYY-MM-DDTHH:mm:ss.SSS')+'Z';
				await API.graphql(graphqlOperation(createRequestProduct, {input: rpi}));
			}

			setLoading(false);
			setStep(5);
			createdMessage();

		} catch (e) {
			setLoading(false);
			setError(true);
			setErrorMessage(e);
		}		
	}

	const sleep = (milliseconds) => {
		return new Promise(resolve => setTimeout(resolve, milliseconds))
	}

	const createdMessage = async () =>{
		setFinish(true);
		await sleep(5000);
		setFinish(false);
		finishRequest();
	}

	return { employees, company, products, services, error, loading, _createRequest, errorMessage, finish };
};

export default useCustomer;

