import React, { useState, useMemo, useEffect, useCallback } from 'react';
import CustomButton from '../../../Components/CustomButton';
import CustomModal from '../../../Components/CustomModal';
import CustomSelect from '../../../Components/CustomSelect';
import CustomTable from '../../../Components/CustomTable';

import { listServices, getCompanyServices } from "../../../graphql/customQueries"
import { getList, getItemById } from "../../../services/AppSync"

import { QUERY_LIMIT } from '../../../utils/Constants'

import { connect } from 'react-redux';
import { setCompanyService, removeCompanyService, setItemsFromStore, setNextToken } from '../../../redux/services/services.actions'

import swal from 'sweetalert';

import { Container, Row, Col } from 'react-bootstrap';

const Services = ({ _companyServices, services, setCompanyService, removeCompanyService, setItemsFromStore, setNextToken, company, companyServicesNextToken, servicesNextToken }) => {
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [service, setService] = useState('0');
    const [companyServices, setCompanyServices] = useState([]);
    const [dlBtnLoading, setDlBtnLoading] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let didCancel = false;
        const fetch = async () => {
            setLoading(true);

            var result = [];
            var _services = [];
            var __companyServices = [];
            let parameters = {};
            let tokens = {};

            try {

                //get services
                parameters = { limit: QUERY_LIMIT, filter: { deleted: { ne: true } } };
                result = await getList('listServices', listServices, parameters);
                _services = result.items;
                tokens.servicesNextToken = result.nextToken
                while (_services.length < QUERY_LIMIT && result.nextToken !== null) {
                    parameters.nextToken = result.nextToken;
                    result = await getList('listServices', listServices, parameters);
                    _services = [..._services, ...result.items];
                    tokens.servicesNextToken = result.nextToken
                }

                //get companyServices
                parameters = { id: company.id, limit: QUERY_LIMIT };
                result = await getItemById('getCompany', getCompanyServices, parameters);
                __companyServices = result.services.items;
                tokens.companyServicesNextToken = result.services.nextToken
                while (__companyServices.length < QUERY_LIMIT && result.services.nextToken !== null) {
                    parameters.nextToken = result.services.nextToken;
                    result = await getItemById('getCompany', getCompanyServices, parameters);
                    __companyServices = [...__companyServices, ...result.services.items];
                    tokens.companyServicesNextToken = result.services.nextToken
                }

            } catch (e) {
                console.log(e)
                setLoading(false);
            }

            if (!didCancel) {
                setItemsFromStore({
                    services: _services,
                    companyServices: __companyServices
                });

                setNextToken(tokens);
                setLoading(false);
            }
        };

        fetch();
        return () => {
            didCancel = true;
            setLoading(false)
        };

    }, [setNextToken, setItemsFromStore, company])

    const getItemsNextToken = useCallback(async () => {
        setLoading(true);

        var result = [];
        var parameters = {};
        var tokens = { servicesNextToken, companyServicesNextToken }
        var __companyServices = [];

        if (companyServicesNextToken !== null) {
            try {
                parameters = { id: company.id, limit: QUERY_LIMIT, nextToken: companyServicesNextToken };
                result = await getItemById('getCompany', getCompanyServices, parameters);
                __companyServices = result.services.items;
                tokens.companyServicesNextToken = result.services.nextToken

                setItemsFromStore({
                    services: services,
                    companyServices: [..._companyServices, ...__companyServices]
                });

                setNextToken(tokens);
            } catch (e) {
                console.log(e)
            }
        }

        setLoading(false);
    }, [servicesNextToken, companyServicesNextToken, company, services, setItemsFromStore, setNextToken, _companyServices]);

    const getCompanyServiceById = useCallback(async (id) => {
        let _service = _companyServices.find(e => e.service.id === id);

        if (_service === undefined && companyServicesNextToken !== null) {

            let result = [];
            let __companyServices = [];
            let parameters = { id: company.id };
            let tokens = {};

            result = await getItemById('getCompany', getCompanyServices, parameters);
            __companyServices = result.services.items;

            tokens.servicesNextToken = servicesNextToken;
            tokens.companyServicesNextToken = result.services.nextToken;

            _service = __companyServices.find(e => e.service.id === id);

            while (_service === undefined && result.services.nextToken !== null) {
                parameters.nextToken = result.services.nextToken;
                result = await getItemById('getCompany', getCompanyServices, parameters);
                __companyServices = [...__companyServices, ...result.services.items];
                tokens.companyServicesNextToken = result.services.nextToken
                _service = __companyServices.find(e => e.service.id === id);
            }

            setItemsFromStore({
                services: services,
                companyServices: __companyServices
            });

            setNextToken(tokens);
        }

        return _service;

    }, [company, _companyServices, companyServicesNextToken, servicesNextToken, services]);

    const getItemsNextTokenSelect = useCallback(async () => {

        var result = [];
        var parameters = {};
        var tokens = { servicesNextToken, companyServicesNextToken }
        var _services = [];

        if (servicesNextToken !== null) {
            try {

                parameters = { limit: QUERY_LIMIT, filter: { deleted: { ne: true } }, nextToken: servicesNextToken };
                result = await getList('listServices', listServices, parameters);
                _services = result.items;
                tokens.servicesNextToken = result.nextToken

                setItemsFromStore({
                    services: [...services, ..._services],
                    companyServices: _companyServices,
                });

                setNextToken(tokens);
            } catch (e) {
                console.log(e)
            }
        }
    }, [servicesNextToken, companyServicesNextToken, services, setItemsFromStore, setNextToken, _companyServices]);



    const handleDelete = useCallback(() => async (e) => {
        swal({ title: "Esta seguro que desea eliminar el servicio?", icon: "warning", buttons: true, dangerMode: true })
            .then(async (willDelete) => {
                if (willDelete) {

                    try {
                        removeCompanyService(e)

                    } catch (e) {
                        console.log(e);
                    }

                    swal({ title: "El registro ha sido eliminado!", text: "Se ha eliminado el servicio correctamente.", type: "sucess", timer: 2000 });

                } else {
                    swal({ title: "Eliminacion Cancelada!", text: "Se ha cancelado la eliminacion del servicio.", type: "error", timer: 2000 });
                }
            });
    }, [removeCompanyService]);

    useEffect(() => {
        try {
            if (_companyServices !== undefined) {
                setCompanyServices(_companyServices.map(e => ({
                    servicio: e.service.name,
                    costo: e.service.cost,
                    acciones: [
                        { id: e.id, color: 'blue', icon: 'edit', onClick: () => { console.log(e) }, text: "Editar" },
                        { id: e.id, color: 'red', icon: 'trash', onClick: () => { handleDelete(e) }, loading: dlBtnLoading === e.id, text: "Remover" }
                    ],
                    id: e.id
                })))
            }
        } catch (error) {
            throw new Error('CompanyServices - xx: ', error)
        }
    }, [_companyServices, dlBtnLoading, handleDelete]);

    const handleShowModal = () => {
        if (!showModal && service === '0') {
            swal({ title: "Agregar Servicio!", text: "Debe seleccionar un servicio.", type: "error", timer: 2000 });
            return null;
        }

        setShowModal(!showModal);
    }

    const onSubmitModal = async (e) => {

        try {
            if (service === '0') {
                swal({ title: "Agregar Servicio!", text: "Debe seleccionar un servicio.", type: "error", timer: 2000 });
                return;
            }

            if (e.cost.match(/^[0-9]+$/) === null) {
                swal({ title: "Agregar Servicio!", text: "El campo costo debe ser un numero.", type: "error", timer: 2000 });
                return;
            }

            const result = await getCompanyServiceById(service);

            if (result !== undefined) {
                swal({ title: "Agregar Servicio!", text: "Este servicio ya existe en su empresa!", type: "error", timer: 2000 });
                return;
            }

            //setCompanyService({ name: serviceObj.name, cost: e.cost, id: serviceObj.id })
            handleShowModal();
        } catch (error) {
            setError(true);
            setErrorMessage('CompanyServices - xx');
        }
    }

    const serviceObj = useMemo(() => {
        const obj = services.find(_ => _.id === service);
        if (obj !== undefined) {
            return services.find(_ => _.id === service);
        } else {
            return { id: '0', name: 'no item selected', cost: '0' }
        }
    }, [services, service]);

    const modalFields = useMemo(() => {
        return [
            { name: 'name', placeholder: 'Nombre de Servicio', validationmessage: 'Digita el Nombre de Servicio', disabled: true, defaultValue: serviceObj.name },
            { name: 'cost', placeholder: 'Costo de Servicio', validationmessage: 'Digita el Costo de Servicio', defaultValue: serviceObj.cost }
        ];
    }, [serviceObj]);

    const tableHeaders = useMemo(() => ['Servicio', 'Costo', 'Acciones'], []);
    const tableItems = useMemo(() => companyServices, [companyServices]);

    return (
        <Container fluid>
            <Row>
                <Col sm={4}>
                    <CustomSelect id="services" dataTestId="select-services" onChange={e => setService(e)} items={services} placeHolder="selecciona un nuevo servicio para agregar" getItemsNextToken={getItemsNextTokenSelect} />
                </Col>
                <Col sm={2}><CustomButton loading={false} onClick={handleShowModal} icon="add"></CustomButton></Col>
            </Row>
            <CustomModal title="Agregar Servicio" saveButtonText={'Guardar'} show={showModal} onSubmit={onSubmitModal} handleClose={handleShowModal} fields={modalFields} error={error} errorMessage={errorMessage} />
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
    _companyServices: state.services.companyServices,
    services: state.services.services,
    servicesNextToken: state.services.nextToken.servicesNextToken,
    companyServicesNextToken: state.services.nextToken.companyServicesNextToken,
    company: state.company.company,
})

const mapDispatchToProps = dispatch => ({
    setCompanyService: companyService => dispatch(setCompanyService(companyService)),
    removeCompanyService: companyService => dispatch(removeCompanyService(companyService)),
    setItemsFromStore: data => dispatch(setItemsFromStore(data)),
    setNextToken: token => dispatch(setNextToken(token)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Services)