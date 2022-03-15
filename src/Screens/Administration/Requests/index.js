import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { listRequests } from "../../../graphql/customQueries"
import { updateRequest } from "../../../graphql/customMutations"
import { getList, createUpdateItem } from "../../../services/AppSync"
import { QUERY_LIMIT, REQUESTS_QUERY_LIMIT } from "../../../utils/Constants"

import { connect } from 'react-redux';

import { setItemsFromStore as setRequestsItemsFromStore, setNextToken as setRequestsNextToken, removeRequest } from '../../../redux/requests/requests.actions'

import swal from 'sweetalert';
import CustomTable from '../../../Components/CustomTable';
import { Container } from 'react-bootstrap';

const Requests = ({ currentTab, company, setRequestsNextToken, setRequestsItemsFromStore, requests, requestsNextToken, removeRequest }) => {
    const [loading, setLoading] = useState(false);
    const [requestsItems, setRequestsItems] = useState([]);
    const [upBtnLoading, setUpBtnLoading] = useState("");
    useEffect(() => {
        let didCancel = false;
        var result = [];
        var _requests = requests;
        let parameters = {};
        let _requestsNextToken = requestsNextToken;

        const fetch = async () => {
            setLoading(true);

            try {

                //get requests only execute it if needed

                if (_requests.length === 0) {

                    const filter = {
                        and: [
                            { state: { ne: 'FINISHED' } },
                            { state: { ne: 'CANCELED' } },
                            { companyId: { eq: company.id } },
                            { deleted: { ne: true } },
                        ]
                    };

                    parameters = { limit: REQUESTS_QUERY_LIMIT, filter: filter };
                    result = await getList('listRequests', listRequests, parameters);
                    _requests = result.items;
                    _requestsNextToken = result.nextToken

                    while (_requests.length < QUERY_LIMIT && result.nextToken !== null) {
                        parameters.nextToken = result.nextToken;
                        result = await getList('listRequests', listRequests, parameters);
                        _requests = [..._requests, ...result.items];
                        _requestsNextToken = result.nextToken
                    }
                }
            } catch (e) {
                console.log(e)
                setLoading(false);
                throw new Error('CompanyServices - 01: ', e)
            }

            if (!didCancel) {

                if (requests.length === 0) {
                    setRequestsItemsFromStore(_requests);
                    setRequestsNextToken(_requestsNextToken);
                }

                setLoading(false);
            }
        };

        if (currentTab === "requests") {
            fetch();
        }
        return () => {
            didCancel = true;
            setLoading(false)
        };

    }, [currentTab, company, setRequestsNextToken, setRequestsItemsFromStore, requests, requestsNextToken])

    const getItemsNextToken = useCallback(async () => {
        setLoading(true);

        var result = [];
        var parameters = {};
        var token = requestsNextToken;
        var _requests = requests;

        if (requestsNextToken !== null) {
            try {
                const filter = {
                    and: [
                        { state: { ne: 'FINISHED' } },
                        { state: { ne: 'CANCELED' } },
                        { companyId: { eq: company.id } },
                        { deleted: { ne: true } },
                    ]
                };

                parameters = { limit: REQUESTS_QUERY_LIMIT, filter: filter };
                result = await getList('listRequests', listRequests, parameters);
                _requests = [..._requests, ...result.items];
                token = result.nextToken

                setRequestsItemsFromStore(_requests);

                setRequestsNextToken(token);
            } catch (e) {
                console.log(e)
                throw new Error('requsts - xx: ', e)
            }
        }

        setLoading(false);
    }, [requestsNextToken, company, setRequestsItemsFromStore, setRequestsNextToken, requests]);

    const handleCancel = useCallback(async (e) => {
        swal({
            title: "Segur@ que quieres anular la solicitud?",
            text: "Una vez anulada no se podra acceder a la misma.",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (willDelete) => {
                if (willDelete) {
                    try {
                        setUpBtnLoading(e.id);
                        const requestUpdate = { state: 'CANCELED', id: e.id };

                        let result = await createUpdateItem('updateRequest', updateRequest, requestUpdate);
                        if (result === false) {
                            setUpBtnLoading("");
                            swal("Ha occurrido un error en la anulacion de la solicitud!", {
                                icon: "error",
                            });
                        }
                        else {
                            removeRequest(e)
                            setUpBtnLoading("");
                            swal("La solicitud ha sido anulada correctamente!", {
                                icon: "success",
                            });
                        }
                    } catch (e) {
                        console.log(e)
                        setUpBtnLoading("");
                        swal("Ha occurrido un error en la anulacion de la solicitud!", {
                            icon: "error",
                        });
                    }
                } else {
                    swal("Ha cancelado la anulacion!");
                }
            });

    }, []);

    useEffect(() => {
        try {
            if (requests !== undefined) {
                setRequestsItems(requests.map(e => ({
                    cliente: e.customerName,
                    estado: e.state,
                    acciones: [
                        { id: e.id, color: 'red', icon: 'delete', onClick: () => { handleCancel(e) }, text: "Anular Solictud", loading: upBtnLoading === e.id, },
                    ],
                    id: e.id
                })))
            }
        } catch (error) {
            throw new Error('requests - xx: ', error)
        }
    }, [requests, upBtnLoading, handleCancel]);

    const tableHeaders = useMemo(() => ['Cliente', 'Estado', 'Acciones'], []);
    const tableItems = useMemo(() => requestsItems, [requestsItems]);

    return (
        <Container fluid style={{ margin: 30 }}>
            <CustomTable
                items={tableItems}
                headers={tableHeaders}
                getItemsNextToken={getItemsNextToken}
                itemsLoading={loading}
            />
        </Container>
    );
}

const mapStateToProps = state => ({
    requests: state.requests.requests,
    requestsNextToken: state.requests.nextToken,
    company: state.company.company
})

const mapDispatchToProps = dispatch => ({
    setRequestsItemsFromStore: data => dispatch(setRequestsItemsFromStore(data)),
    setRequestsNextToken: token => dispatch(setRequestsNextToken(token)),
    removeRequest: data => dispatch(removeRequest(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Requests);