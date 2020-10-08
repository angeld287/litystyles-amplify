import { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { updateRequest } from '../../../graphql/mutations';

const useServices = (props) => {
    //const [ requests, setRequests ] = useState([]);
	
	useEffect(() => {
		let didCancel = false;

		const fetch = async () => {

			try {
			} catch (e) {
			}

			if (!didCancel) {
			}
		};

		fetch();

		return () => {
			didCancel = true;
		};
	}, []);


	return {  };
};

export default useServices;

