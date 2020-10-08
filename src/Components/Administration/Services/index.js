import React, { useEffect, useState } from 'react';
import { Table, Container, Row, Col, ButtonGroup, Button as BB, Modal, Form } from 'react-bootstrap';
import { Button, Spinner, Callout, Alert, Icon } from "@blueprintjs/core";

import { API, graphqlOperation } from 'aws-amplify';

import { deleteCompanyService } from '../../../graphql/mutations';
import useServices from './useServices'

const Services = (props) => {
    const [show, setShow] = useState(false);
    const [edit, setEdit] = useState(false);

    const [ so, setSelectedObject ] = useState({
        service: {
            name: ''
        }
    });

    const [ service, setService ] = useState('');
    const [ cost, setCost ] = useState('');


    const {} = useServices();


    const handleClose = () => setShow(false);

    const handleShow = (action, object) => {
        setSelectedObject(object);
        setCost(object.cost)
        setEdit(action === 'edit' ? true : false);
        setShow(true);
    };

    const handleDelete = async (id) => {
        try {
            var list = props.ap.cser.companyServices;
            const api = await API.graphql(graphqlOperation(deleteCompanyService, {input: {id: id}}));
            list.splice(list.findIndex(e => e.id === id), 1);
            
            props.ap.cser.setCompanyServices(list);

        } catch (e) {
            console.log(e)
        }
    }

    const handleAddService = async () => {
        console.log(service);
    }

    useEffect(() => {
		let didCancel = false;
        console.log(props.ap);
		return () => {
			didCancel = true;
		};
	}, []);
    
    const list = (props.ap.cser.companyServices !== null)?([].concat(props.ap.cser.companyServices)
		.map((item,i)=>
			(
				<tr key={i}>
					{/* <td>{i+1}</td> */}
					<td style={{width: 200}}>{item.service.name}</td>
					<td>
                        <ButtonGroup size="sm">
                            <BB onClick={e => { e.preventDefault(); handleShow('view', item);}} ><Icon icon="eye-open"/></BB>
                            <BB onClick={e => { e.preventDefault(); handleShow('edit', item);}} ><Icon icon="edit"/></BB>
                            <BB onClick={e => { e.preventDefault(); handleDelete(item.id);}} ><Icon icon="trash"/></BB>
                        </ButtonGroup>
                    </td>
				</tr>
			)
        )):(<td></td>)

    const servicesList = (props.ap.ser.services !== null)?([].concat(props.ap.ser.services)
	    .map((item,i)=>
		(
            <option key={i} value={item.id}>{item.name}</option>
		)
     )):(<td></td>)

    if(props.ap.err.error.type === 'services') return(<div style={{marginTop: 5}}><h5>{props.ap.err.error.message}</h5></div>)
    
    if(props.ap.load.loading.type === 'services') return(<Spinner/>)
        
    return(<Container fluid>
        <Row>
            <Col sm={4}>
                <Form.Group>
                    <Form.Control as="select" id="services" onChange={e => setService(e)}>
                        <option>Seleccione...</option>
                        {servicesList}
                    </Form.Control>
                </Form.Group>
            </Col>
            <Col sm={2}><Button intent="Primary" onClick={(e) => {e.preventDefault(); handleAddService();}} icon="add"></Button></Col>
        </Row>
        <div style={{marginTop:20}}>
			<Table striped bordered hover>
				<thead>
					<tr>
						{/* <th>No.</th> */}
						<th>Servicio</th>
						<th>Acciones</th>
					</tr>
				</thead>
				<tbody>
					{list}
				</tbody>
			</Table>
		</div>

        {/* Modal para editar y ver detalle de servicios */}
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{edit ? 'Editar Servicio' : 'Ver Servicio'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group controlId="name">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control readOnly={true} type="text" value={so.service.name} />
                </Form.Group>
                <Form.Group controlId="cost">
                    <Form.Label>Costo</Form.Label>
                    <Form.Control readOnly={!edit} type="text" value={cost}/>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cerrar
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Guardar
                </Button>
            </Modal.Footer>
        </Modal>
    </Container>)
}

export default Services;