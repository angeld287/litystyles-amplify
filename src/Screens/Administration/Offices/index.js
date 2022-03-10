import React, { useState, useMemo, useEffect, useCallback } from 'react';
import CustomButton from '../../../Components/CustomButton';
import CustomModal from '../../../Components/CustomModal';
import CustomSelect from '../../../Components/CustomSelect';
import CustomTable from '../../../Components/CustomTable';
import CustomTabs from '../../../Components/CustomTabs';
import CustomMap from '../../../Components/CustomMap';
import CustomForm from '../../../Components/CustomForm/antdForm';
import { CustomClasses } from '../../../utils/Constants';
import Employees from './Employees';

import image from "../../../images/SalonBelleza.jpg"

import { getCompanyOffices, listCategorys } from "../../../graphql/customQueries"
import { createOffice, updateOffice } from "../../../graphql/customMutations"
import { getList, getItemById, createUpdateItem, deleteItem } from "../../../services/AppSync"

import { QUERY_LIMIT } from '../../../utils/Constants'

import { connect } from 'react-redux';
import { setOffice, removeOffice, setItemsFromStore, setNextToken, editOffice } from '../../../redux/offices/offices.actions'
import { setItemsFromStore as setItemsFromStoreCategories, setNextToken as setNextTokenCategories } from '../../../redux/categories/categories.actions'

import swal from 'sweetalert';

import { Icon } from '@blueprintjs/core';
import { Container, Row, Col, Card } from 'react-bootstrap';
import CustomPlacesAutocomplete from '../../../Components/CustomPlacesAutocomplete';


const Offices = ({ currentTab, offices, nextToken, company, setOffice, removeOffice, setItemsFromStore, setNextToken, editOffice, setItemsFromStoreCategories, categories, nextTokenCategories, setNextTokenCategories }) => {
    const [office, _setOffice] = useState({});
    const [editing, setEditing] = useState(false);
    const [errorForm, setErrorForm] = useState(false);
    const [errorFormMessage, setErrorFormMessage] = useState('');
    const [loadingForm, setLoadingForm] = useState(false);
    const [location, setLocation] = useState(null);
    const [loadingLocChange, setLoadingLocChange] = useState(false);
    const [officeCurrentTab, setCurrentTab] = useState('map');
    const [loading, setLoading] = useState({});

    //#region Actions to fetch data

    useEffect(() => {
        let didCancel = false;
        const fetch = async () => {
            setLoading(true);

            var result = [];
            var _offices = offices;
            var _categories = categories;
            let parameters = {};
            let tokens = nextToken;
            let tokenCategories = nextTokenCategories;

            try {
                //get offices
                if (offices.length === 0) {
                    parameters = { id: company.id, limit: QUERY_LIMIT, filter: { deleted: { ne: true } } };
                    result = await getList('getCompany', getCompanyOffices, parameters);
                    _offices = result.offices.items;
                    tokens = result.offices.nextToken
                    while (_offices.length < QUERY_LIMIT && result.offices.nextToken !== null) {
                        parameters.nextToken = result.offices.nextToken;
                        result = await getList('getCompany', getCompanyOffices, parameters);
                        _offices = [..._offices, ...result.offices.items];
                        tokens = result.offices.nextToken
                    }
                }

                //get offices types
                if (categories.length === 0) {
                    parameters = { limit: QUERY_LIMIT, filter: { deleted: { ne: true } } };
                    result = await getList('listCategorys', listCategorys, parameters);
                    _categories = result.items;
                    tokenCategories = result.nextToken
                    while (_categories.length < 40 && result.nextToken !== null) {
                        parameters.nextToken = result.nextToken;
                        result = await getList('listCategorys', listCategorys, parameters);
                        _categories = [..._categories, ...result.items];
                        tokenCategories = result.nextToken
                    }
                }
            } catch (e) {
                console.log(e)
                setLoading(false);
                throw new Error('offices - 01: ', e)
            }

            if (!didCancel) {
                if (offices.length === 0) {
                    setItemsFromStore({ offices: _offices });
                    setNextToken(tokens);
                }

                if (categories.length === 0) {
                    setItemsFromStoreCategories({ categories: _categories });
                    setNextTokenCategories(tokenCategories)
                }

                _setOffice(_offices.length > 0 ? _offices[0] : null);

                if (_offices.length > 0 && _offices[0].location !== undefined) {
                    try {
                        const obj = JSON.parse(_offices[0].location);
                        setLocation(obj);
                    } catch (e) {
                        console.log("Ubicacion Incorrecta")
                    }
                }

                setLoading(false);
            }
        };
        if (currentTab === "offices") {
            fetch();
        }

        return () => {
            didCancel = true;
            setLoading(false)
        };

    }, [setNextToken, setItemsFromStore, company, currentTab, offices, nextToken])

    const getItemsNextTokenSelect = () => {

    }

    const getItemsNextTokenSelectCategories = () => {

    }

    //#endregion


    //#region Mutation Actions

    const onFormSubmit = async (e) => {
        setLoadingForm(true);
        let mutationResult = false, alertTitle = 'Editar Oficina', input = { id: office.id, ...e };
        try {
            mutationResult = await createUpdateItem('updateOffice', updateOffice, input);

            if (mutationResult === false) {
                swal({ title: alertTitle, text: 'Ha ocurrido un error al actualizar la oficina', type: "error", timer: 2000 });
            } else {
                _setOffice({ categoryId: e.categoryId, name: e.name, ...office })
                editOffice({ ...office, categoryId: e.categoryId, name: e.name })
                swal({ title: alertTitle, text: "La informacion se ha actualizado correctamente!", type: "sucess", timer: 2000 });
            }
            setLoadingForm(false);
            setEditing(false);
        } catch (e) {
            setLoadingForm(false);
        }
    }

    const onLocationChange = async (places) => {
        let place = places.length > 0 ? places[0] : null;
        if (place !== null) {
            setLoadingLocChange(true);

            let place_obj = {
                name: place.formatted_address,
                location: {
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng()
                }
            }

            let mutationResult = false, alertTitle = 'Editar Oficina', input = { id: office.id, location: JSON.stringify(place_obj) };
            try {
                mutationResult = await createUpdateItem('updateOffice', updateOffice, input);

                if (mutationResult === false) {
                    swal({ title: alertTitle, text: 'Ha ocurrido un error al actualizar la oficina', type: "error", timer: 2000 });
                } else {
                    _setOffice({ ...office, location: place_obj })
                    editOffice({ ...office, location: place_obj })
                    setLocation(place_obj)
                }
                setLoadingLocChange(false);
            } catch (e) {
                setLoadingLocChange(false);
            }
        }
    }

    //#endregion

    const setValuePlaces = (e) => {
        console.log(e)
    }

    const handleOpenOffice = () => {

    }

    const onSelectTab = (e) => {
        setCurrentTab(e);
    }

    const handleCloseEditing = () => {
        setEditing(false)
    }

    const handleOpenToEdit = () => {
        setEditing(true)
    }

    const tabs = useMemo(() => {
        if (loading) {
            return [];
        } else {
            return [
                { name: 'map', title: <div><Icon icon="map" />  Mapa</div>, children: <CustomMap location={location.location} onLocationChanged={onLocationChange} /> },
                { name: 'employees', title: <div><Icon icon="people" />  Empleados</div>, children: <Employees currentTab={officeCurrentTab} officeId={office.id} /> },
            ];
        }
    }, [office, officeCurrentTab, loading]);

    const formFields = useMemo(() => {
        return [
            { name: 'name', placeholder: 'Nombre de La Oficina', validationmessage: 'Digita el Nombre de La Oficina', disabled: !editing, defaultValue: office.name },
            { name: 'categoryId', type: 'select', placeholder: 'Tipo de Negocio', validationmessage: 'Digita el Tipo de Negocio', disabled: !editing, defaultValue: office.categoryId, items: categories.filter(_ => _.typeName === 'Office'), getItemsNextToken: getItemsNextTokenSelectCategories }
        ];
    }, [office, editing, getItemsNextTokenSelectCategories]);

    const formButtons = useMemo(() => [
        { name: 'cancelBtn', text: "Cancelar", className: CustomClasses.INTENT_DANGER, onClick: handleCloseEditing, type: 'button', loading: false, },
        { name: 'saveBtn', text: "Guardar", }
    ], [handleCloseEditing]);

    const formButtonEdit = useMemo(() => [
        { name: 'editBtn', text: "Editar", className: CustomClasses.INTENT_PRIMARY, onClick: handleOpenToEdit, type: 'button', loading: false, }
    ], [handleOpenToEdit]);

    if (loading) return <h1>Loading...</h1>;

    return (
        <Container fluid>
            <Row style={{ marginTop: 10 }}>
                <Col sm={5}>
                    <CustomSelect id="offices" dataTestId="select-offices" defaultValue={office} onChange={e => _setOffice(e)} items={offices} getItemsNextToken={getItemsNextTokenSelect} />
                </Col>
                <Col sm={2}><CustomButton loading={false} onClick={e => { e.preventDefault(); handleOpenOffice(null); }} >Abrir Oficina</CustomButton></Col>
            </Row>
            <Row style={{ marginTop: 10 }}>
                <Col sm={6}>
                    <Card border="info">
                        <Card.Img variant="top" src={image} />
                        <Card.Body>
                            <Card.Title>{office.name}</Card.Title>
                            <Card.Text>
                                Oficina principal ubicada en Ciudad Juan Bosh. Se ofrecen servicios de lavado del pelo, masajes, faciales, entre otros.
                            </Card.Text>
                            <Row style={{ marginTop: 10 }}>
                                <Col>
                                    <Card align="left">
                                        <Card.Header></Card.Header>
                                        <Card.Body>
                                            <CustomForm buttons={editing ? formButtons : formButtonEdit} fields={formFields} onSubmit={onFormSubmit} error={errorForm} errorMessage={errorFormMessage} loading={loadingForm} />
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col>
                                    <p>Ubicacion Actual</p>
                                    <p>{location.name}</p>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                    <br />
                </Col>
                <Col sm={6}>
                    <Card border="info">
                        <Card.Body>
                            <CustomTabs onSelectTab={onSelectTab} tabs={tabs} defaultTab={tabs[0].name} />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

const mapStateToProps = state => ({
    offices: state.offices.offices,
    nextToken: state.offices.nextToken,
    nextTokenTypes: state.types.nextToken,
    company: state.company.company,
    categories: state.categories.categories,
})

const mapDispatchToProps = dispatch => ({
    setOffice: office => dispatch(setOffice(office)),
    removeOffice: office => dispatch(removeOffice(office)),
    setItemsFromStore: data => dispatch(setItemsFromStore(data)),
    setItemsFromStoreCategories: data => dispatch(setItemsFromStoreCategories(data)),
    setNextToken: token => dispatch(setNextToken(token)),
    setNextTokenCategories: token => dispatch(setNextTokenCategories(token)),
    editOffice: office => dispatch(editOffice(office)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Offices)