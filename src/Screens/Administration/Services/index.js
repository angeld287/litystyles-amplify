import React, { useState, useMemo, useEffect, useCallback } from 'react';
import CustomButton from '../../../Components/CustomButton';
import CustomModal from '../../../Components/CustomModal';
import CustomSelect from '../../../Components/CustomSelect';
import CustomTable from '../../../Components/CustomTable';

import { listServices } from "../../../graphql/customQueries"
import { getList } from "../../../services/AppSync"


import { connect } from 'react-redux';
import { setCompanyService, removeCompanyService, setItemsFromStore, setNextToken } from '../../../redux/services/services.actions'
import { setLoadingScreen } from '../../../redux/commun/commun.actions'

import swal from 'sweetalert';

import { Container, Row, Col } from 'react-bootstrap';

const Services = ({ _companyServices, services, setCompanyService, removeCompanyService, setItemsFromStore, setNextToken, setLoadingScreen }) => {
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [service, setService] = useState('0');
    const [companyServices, setCompanyServices] = useState([]);
    const [dlBtnLoading, setDlBtnLoading] = useState('');

    useEffect(() => {
        let didCancel = false;
        setLoadingScreen(true);
        const fetch = async () => {
            var result = [];
            var _items = [];

            try {
                result = await getList('listServices', listServices, { filter: { deleted: { ne: true } } });
                _items = result.items;
                while (_items.length < 10 && result.nextToken !== null) {
                    result = await getList('listServices', listServices, { filter: { deleted: { ne: true } }, nextToken: result.nextToken });
                    _items = [..._items, ...result.items];
                }

            } catch (e) {
                console.log(e)
            }

            if (!didCancel) {
                setItemsFromStore({
                    services: _items,
                    companyServices: []
                });

                setNextToken(result.nextToken);
            }
        };

        fetch();
        setLoadingScreen(false)
        return () => {
            didCancel = true;
            setLoadingScreen(false)
        };

    }, [setLoadingScreen, setNextToken, setItemsFromStore])

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
                    servicio: e.name,
                    costo: e.cost,
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

    const onSubmitModal = (e) => {

        try {
            if (service === '0') {
                swal({ title: "Agregar Servicio!", text: "Debe seleccionar un servicio.", type: "error", timer: 2000 });
                return;
            }

            if (e.cost.match(/^[0-9]+$/) === null) {
                swal({ title: "Agregar Servicio!", text: "El campo costo debe ser un numero.", type: "error", timer: 2000 });
                return;
            }

            // if (_companyServices[list.findIndex(e => e.service.id === service)] !== undefined) {
            //     swal({ title: "Agregar Servicio!", text: "Este servicio ya existe!", type: "error", timer: 2000 });
            //     return;
            // }

            setCompanyService({ name: serviceObj.name, cost: e.cost, id: serviceObj.id })
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
            return { id: '0', name: 'no item selected' }
        }
    }, [services, service]);

    const modalFields = useMemo(() => {
        return [
            { name: 'name', placeholder: 'Nombre de Servicio', validationmessage: 'Digita el Nombre de Servicio', disabled: true, defaultValue: serviceObj.name },
            { name: 'cost', placeholder: 'Costo de Servicio', validationmessage: 'Digita el Costo de Servicio', defaultValue: '0' }
        ];
    }, [serviceObj]);

    const getItemsNextToken = (e) => { console.log(e) }

    const tableHeaders = useMemo(() => ['Servicio', 'Costo', 'Acciones'], []);
    const tableItems = useMemo(() => companyServices, [companyServices]);

    return (
        <Container fluid>
            <Row>
                <Col sm={4}>
                    <CustomSelect id="services" onChange={e => setService(e.target.value)} items={services} />
                </Col>
                <Col sm={2}><CustomButton loading={false} onClick={handleShowModal} icon="add"></CustomButton></Col>
            </Row>
            <CustomModal title="Agregar Servicio" saveButtonText={'Guardar'} show={showModal} onSubmit={onSubmitModal} handleClose={handleShowModal} fields={modalFields} error={error} errorMessage={errorMessage} />
            <CustomTable
                items={tableItems}
                headers={tableHeaders}
                getItemsNextToken={getItemsNextToken}
                itemsLoading={false}
            />
        </Container>
    );
}

const mapStateToProps = state => ({
    _companyServices: state.services.companyServices,
    services: state.services.services,
})

const mapDispatchToProps = dispatch => ({
    setCompanyService: companyService => dispatch(setCompanyService(companyService)),
    removeCompanyService: companyService => dispatch(removeCompanyService(companyService)),
    setItemsFromStore: data => dispatch(setItemsFromStore(data)),
    setNextToken: token => dispatch(setNextToken(token)),
    setLoadingScreen: loading => dispatch(setLoadingScreen(loading)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Services)