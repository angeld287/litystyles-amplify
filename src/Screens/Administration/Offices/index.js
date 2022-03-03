import React, { useState, useMemo, useEffect, useCallback } from 'react';
import CustomButton from '../../../Components/CustomButton';
import CustomModal from '../../../Components/CustomModal';
import CustomSelect from '../../../Components/CustomSelect';
import CustomTable from '../../../Components/CustomTable';
import CustomTabs from '../../../Components/CustomTabs';
import CustomMap from '../../../Components/CustomMap';
import Employees from './Employees';

import image from "../../../images/SalonBelleza.jpg"

import { getCompanyOffices } from "../../../graphql/customQueries"
import { createOffice, updateOffice } from "../../../graphql/customMutations"
import { getList, getItemById, createUpdateItem, deleteItem } from "../../../services/AppSync"

import { QUERY_LIMIT } from '../../../utils/Constants'

import { connect } from 'react-redux';
import { setCompanyOffice, removeCompanyOffice, setItemsFromStore, setNextToken, editCompanyOffice } from '../../../redux/offices/offices.actions'

import swal from 'sweetalert';

import { Icon } from '@blueprintjs/core';
import { Container, Row, Col, Card } from 'react-bootstrap';

const Offices = ({ companyOffices, nextToken, company, setCompanyOffice, removeCompanyOffice, setItemsFromStore, setNextToken, editCompanyOffice }) => {
    const [office, setOffice] = useState({});

    const getItemsNextTokenSelect = () => {

    }

    const handleOpenOffice = () => {

    }

    const onSelectTab = (e) => {
        console.log(e);
    }

    const tabs = useMemo(() => [
        { name: 'map', title: <div><Icon icon="map" /><spam>  Mapa</spam></div>, children: <CustomMap /> },
        { name: 'employees', title: <div><Icon icon="people" /><spam>  Empleados</spam></div>, children: <Employees /> },
    ], []);

    return (
        <Container fluid>
            <Row style={{ marginTop: 10 }}>
                <Col sm={5}>
                    <CustomSelect id="offices" dataTestId="select-offices" onChange={e => setOffice(e)} items={[]} getItemsNextToken={getItemsNextTokenSelect} />
                </Col>
                <Col sm={2}><CustomButton loading={false} onClick={e => { e.preventDefault(); handleOpenOffice(null); }} icon="open"></CustomButton></Col>
            </Row>
            <Row style={{ marginTop: 10 }}>
                <Col sm={8}>
                    <Card border="info">
                        <Card.Header>Header</Card.Header>
                        <Card.Img variant="top" src={image} />
                        <Card.Body>
                            <Card.Title>Info Card Title</Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card title and make up the bulk
                                of the card's content.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <br />
                </Col>
                <Col sm={4}>
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
    companyOffices: state.offices.companyOffices,
    nextToken: state.offices.nextToken,
    company: state.company.company,
})

const mapDispatchToProps = dispatch => ({
    setCompanyOffice: companyOffice => dispatch(setCompanyOffice(companyOffice)),
    removeCompanyOffice: companyOffice => dispatch(removeCompanyOffice(companyOffice)),
    setItemsFromStore: data => dispatch(setItemsFromStore(data)),
    setNextToken: token => dispatch(setNextToken(token)),
    editCompanyOffice: companyOffice => dispatch(editCompanyOffice(companyOffice)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Offices)