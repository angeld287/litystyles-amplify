import React, {useEffect} from 'react';
import { Table, Container, Row, Col, ButtonGroup, Modal, Form } from 'react-bootstrap';
import { Button, Spinner, Icon } from "@blueprintjs/core";

import useEmployees from './useEmployees';
const Employess = (props) => {

    const { add, handleClose, handleShow, edit, show, so, name, setName } = useEmployees(props);
    
   /*  useEffect(() => {
		//let didCancel = false;

		console.log(props.employess);

		return () => {
		//	didCancel = true;
		};
	}, []); */

    const list = (props.employess !== null )?([].concat(props.employess)
		.map((item,i)=>
			(
				<tr key={i}>
					<td style={{width: 200}}>{item.name}</td>
					<td>
                        <ButtonGroup size="sm">
                            <Button intent={"Primary"} onClick={e => { e.preventDefault(); handleShow('view', item);}} ><Icon icon="eye-open"/></Button>
                            <Button intent={"Primary"} onClick={e => { e.preventDefault(); handleShow('edit', item);}} ><Icon icon="edit"/></Button>
                            <Button intent={"Primary"} onClick={e => { e.preventDefault(); }} ><Icon icon="trash"/></Button>
                        </ButtonGroup>
                    </td>
				</tr>
			)
        )):(<tr></tr>)

    const servicesList = (so.services !== undefined && so.services.items !== null )?([].concat(so.services.items)
		.map((item,i)=>
			(
				<tr key={i}>
					<td style={{width: 200}}>{item.service.name}</td>
					<td>
                        <ButtonGroup size="sm">
                            <Button intent={"Primary"} onClick={e => { e.preventDefault(); }} ><Icon icon="trash"/></Button>
                        </ButtonGroup>
                    </td>
				</tr>
			)
        )):(<td></td>)
        
    return(<Container fluid>
		<div style={{marginTop:20}}>
			<Col sm={2}><Button loading={props.ap.load.loading.type === 'addemployee'} intent="Primary" onClick={(e) => {e.preventDefault(); handleShow('add', {});}} icon="add"></Button></Col>
		</div>
        <div style={{marginTop:20}}>
			<Table striped bordered hover>
				<thead>
					<tr>
						{/* <th>No.</th> */}
						<th>Empleado</th>
						<th>Acciones</th>
					</tr>
				</thead>
				<tbody>
					{list}
				</tbody>
			</Table>
		</div>
		<Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{edit ? 'Editar Empleado' : add ? 'Agregar Empleado' : 'Ver Empleado'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
				<Form.Group controlId="name">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control readOnly={!edit && !add} ype="text" value={name} onChange={ e => setName(e.target.value)}/>
                </Form.Group>
                <div style={{marginTop:20}}>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Servicio</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {servicesList}
                        </tbody>
                    </Table>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cerrar
                </Button>
                {(edit || add) &&
                    <Button variant="primary" loading={props.ap.load.loading.type === 'addemployee' || props.ap.load.loading.type === 'editemployee'} /* onClick={ add ? handleAdd : handleEdit } */>
                        Guardar
                    </Button>
                }
            </Modal.Footer>
        </Modal>
    </Container>)
}

export default Employess;