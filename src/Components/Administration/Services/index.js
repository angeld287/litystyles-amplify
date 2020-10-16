import React from 'react';
import { Table, Container, Row, Col, ButtonGroup, Modal, Form } from 'react-bootstrap';
import { Button, Spinner, Icon } from "@blueprintjs/core";

import useServices from './useServices';

const Services = (props) => {

    const { add, serviceName, handleAddService, handleEditService, setCost, handleDelete, handleClose, handleShow, edit, show, cost, setService } = useServices(props);
 
    const list = (props.ap.cser.companyServices !== null)?([].concat(props.ap.cser.companyServices)
		.map((item,i)=>
			(
				<tr key={i}>
					{/* <td>{i+1}</td> */}
					<td style={{width: 200}}>{item.service.name}</td>
					<td>
                        <ButtonGroup size="sm">
                            <Button style={{marginRight: 1}} intent={"Primary"} onClick={e => { e.preventDefault(); handleShow('view', item);}} ><Icon icon="eye-open"/></Button>
                            <Button style={{marginRight: 1}} intent={"Primary"} onClick={e => { e.preventDefault(); handleShow('edit', item);}} ><Icon icon="edit"/></Button>
                            <Button style={{marginRight: 1}} intent={"Primary"} onClick={e => { e.preventDefault(); handleDelete(item.id, i);}} loading={props.ap.load.loading.type === 'deleteservice'+i} ><Icon icon="trash"/></Button>
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
                    <Form.Control as="select" id="services" onChange={e => setService(e.target.value)}>
                        <option>Seleccione...</option>
                        {servicesList}
                    </Form.Control>
                </Form.Group>
            </Col>
            <Col sm={2}><Button loading={props.ap.load.loading.type === 'addservice'} intent="Primary" onClick={(e) => {e.preventDefault(); handleShow('add', {});}} icon="add"></Button></Col>
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
                <Modal.Title>{edit ? 'Editar Servicio' : add ? 'Agregar Servicio' : 'Ver Servicio'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group controlId="name">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control readOnly={true} type="text" value={serviceName} />
                </Form.Group>
                <Form.Group controlId="cost">
                    <Form.Label>Costo</Form.Label>
                    <Form.Control readOnly={!edit && !add} type="text" value={cost} onChange={ e => setCost(e.target.value)}/>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cerrar
                </Button>
                {(edit || add) &&
                    <Button variant="primary" loading={props.ap.load.loading.type === 'addservice' || props.ap.load.loading.type === 'editservice'} onClick={ add ? handleAddService : handleEditService }>
                        Guardar
                    </Button>
                }
            </Modal.Footer>
        </Modal>
    </Container>)
}

export default Services;