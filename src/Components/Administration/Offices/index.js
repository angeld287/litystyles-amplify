import React from 'react';
import { Table, Container, Row, Col, ButtonGroup, Modal, Form } from 'react-bootstrap';
import { Button, Spinner, Icon } from "@blueprintjs/core";

import useOffices from './useOffices';
import Employess from './Employees/Employess';

const Offices = (props) => {

    const { add, handleAdd, handleEdit, handleDelete, handleClose, handleShow, edit, show, setLocation, setName, location, name, employees } = useOffices(props);
 
    const list = (props.ap.off.offices !== null)?([].concat(props.ap.off.offices)
		.map((item,i)=>
			(
				<tr key={i}>
					{/* <td>{i+1}</td> */}
					<td style={{width: 200}}>{item.name}</td>
					<td>
                        <ButtonGroup size="sm">
                            <Button intent={"Primary"} onClick={e => { e.preventDefault(); handleShow('view', item);}} ><Icon icon="eye-open"/></Button>
                            <Button intent={"Primary"} onClick={e => { e.preventDefault(); handleShow('edit', item);}} ><Icon icon="edit"/></Button>
                            <Button intent={"Primary"} onClick={e => { e.preventDefault(); handleDelete(item.id, i);}} loading={props.ap.load.loading.type === 'deleteservice'+i} ><Icon icon="trash"/></Button>
                        </ButtonGroup>
                    </td>
				</tr>
			)
        )):(<td></td>)

    if(props.ap.err.error.type === 'offices') return(<div style={{marginTop: 5}}><h5>{props.ap.err.error.message}</h5></div>)
    
    if(props.ap.load.loading.type === 'offices') return(<Spinner/>)
        
    return(<Container fluid>

        <Row>
            <Col sm={2}><Button loading={props.ap.load.loading.type === 'addoffice'} intent="Primary" onClick={(e) => {e.preventDefault(); handleShow('add', {});}} icon="add"></Button></Col>
        </Row>

        <div style={{marginTop:20}}>
			<Table striped bordered hover>
				<thead>
					<tr>
						{/* <th>No.</th> */}
						<th>Oficina</th>
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
                <Modal.Title>{edit ? 'Editar Oficina' : add ? 'Agregar Oficina' : 'Ver Oficina'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group controlId="name">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control readOnly={!edit && !add} type="text" value={name} onChange={ e => setName(e.target.value)}/>
                </Form.Group>
                <Form.Group controlId="location">
                    <Form.Label>Ubicacion</Form.Label>
                    <Form.Control readOnly={!edit && !add} type="text" value={location} onChange={ e => setLocation(e.target.value)}/>
                </Form.Group>
                <Employess employess={employees} ap={props.ap}/>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cerrar
                </Button>
                {(edit || add) &&
                    <Button variant="primary" loading={props.ap.load.loading.type === 'addoffice' || props.ap.load.loading.type === 'editoffice'} onClick={ add ? handleAdd : handleEdit }>
                        Guardar
                    </Button>
                }
            </Modal.Footer>
        </Modal>
    </Container>)
}

export default Offices;