import { useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { listRequestsPerDay } from '../../graphql/customQueries';

import moment from "moment";

const useReports = () => {
    const [ requestsSearch, setRequestsSearch ] = useState([]);
	const [ date, setDate ] = useState('');

	const [ searchLoading, setSearchLoading ] = useState(false);
	const [ searchError, setSearchError ] = useState(false);
	const [ searcherrorMessage, setSearchErrorMessage ] = useState('');

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

	return { requestsSearch, searchLoading, searchError, searcherrorMessage, setDate, getRequestsByDay };
};

export default useReports;

