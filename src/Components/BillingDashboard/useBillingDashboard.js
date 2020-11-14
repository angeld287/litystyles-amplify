import { useState, useCallback, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { listRequestsPerDay } from '../../graphql/customQueries';

import moment from "moment";

const useBillingDashboard = (props) => {
	
	const [ requests, setRequests ] = useState(0); 

    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState(false);
    const [ errorMessage, setErrorMessage ] = useState(false);


    const setData = useCallback(
        (data) => {
            var rresult = 0;
            
            data.forEach(e => {
                rresult = rresult + 1;
            });

            setRequests(rresult)
        },
        []
    );
    
    const getBiilingData = useCallback(
        async () => {

            try {
                setLoading(true);

                var date = new Date();
                var start = moment(new Date(date.getFullYear(), date.getMonth(), 1)).format('YYYY-MM-DDT00:00:00.000');
                var end = moment(new Date()).format('YYYY-MM-DDT00:00:00.000');

                const filter = {
                    and: [
                        {createdAt: {gt: String(start)}}, 
                        {createdAt: {lt: String(end)}},
                        {companyId: {eq: props.state.company.id}},
                    ]
                };

                const api = await API.graphql(graphqlOperation(listRequestsPerDay, { filter: filter, limit: 1000 }));

                setData(api.data.listRequests.items)

                setLoading(false);

            } catch (e) {
                setError(true);
                console.log(e);
                setErrorMessage('appjs error');
                setLoading(false);
            }

        },
        [props, setData]
    );

    const barData = {
		labels: ["Canditad de Solicitudes", "Costo Actual"],
		datasets: [
		  {
			label: 'Costo del Servicio',
			backgroundColor: 'rgba(255,99,132,0.2)',
			borderColor: 'rgba(255,99,132,1)',
			borderWidth: 2,
			hoverBackgroundColor: 'rgba(255,99,132,0.4)',
			hoverBorderColor: 'rgba(255,99,132,1)',
			data: [requests, (requests * 2), 0]
		  }
		]
	}

    useEffect(() => {
        getBiilingData();
    }, [getBiilingData]);

	

	return { barData, requests, loading, error, errorMessage };
};

export default useBillingDashboard;

