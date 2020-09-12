import { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { getCompanyProductsAndServices } from './../../graphql/customQueries';

const useCustomer = () => {
	const [ company, setCompany ] = useState([]);
	const [ products, setProducts ] = useState([]);
	const [ services, setServices ] = useState([]);
	const [ loading, setLoading ] = useState(true);
	const [ error, setError ] = useState(false);

	useEffect(() => {
		let didCancel = false;

		const fetch = async () => {
			var companyApi = [];

			try {
				companyApi = await API.graphql(graphqlOperation(getCompanyProductsAndServices, {id: "0e48b5bf-0255-4a2d-80f4-b7af8e90091a", limit: 400}));
			} catch (error) {
				setLoading(false);
				setError(true);
			}

			if (!didCancel) {
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
	}, []);

	return { company, products, services, error, loading };
};

export default useCustomer;

