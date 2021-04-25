import React from 'react';
import { Table, Container, Row, Col, ButtonGroup, Modal, Form } from 'react-bootstrap';
import { Button, Icon } from "@blueprintjs/core";

import useEmployees from './useEmployees';
const Employess = (props) => {

    const { handleShowAddService, handleCloseAddS, showAddS, _duration, setDuration, lookingforuser, handleLinkEmployee, cognitoUsers, handleFindUser, add, handleClose, handleShow, email, setEmail, edit, show, so, name, setName, setService, addServiceToEmployee, handleDelete, handleUnlinkEmployee } = useEmployees(props);
    
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
                            <Button style={{marginRight: 1}} intent={"Primary"} onClick={e => { e.preventDefault(); handleShow('view', item);}} ><Icon icon="eye-open"/></Button>
                            <Button style={{marginRight: 1}} loading={props.ap.load.loading.type === 'unlinkemployee'+i} intent={"Primary"} onClick={e => { e.preventDefault(); handleUnlinkEmployee(item, i)}} ><Icon icon="blocked-person"/></Button>
                        </ButtonGroup>
                    </td>
				</tr>
			)
        )):(<tr>
                <td></td>
                <td></td>
                <td></td>
            </tr>)

    const servicesList = (so.services !== undefined && so.services.items !== undefined && so.services.items !== null )?([].concat(so.services.items)
		.map((item,i)=>
			(
				<tr key={i}>
					<td style={{width: 200}}>{item.service.name}</td>
					<td>
                        <ButtonGroup size="sm">
                            <Button style={{marginRight: 1}} loading={props.ap.load.loading.type === 'deleteservice'+i} intent={"Primary"} onClick={e => { e.preventDefault(); handleDelete(item.id, i) }} ><Icon icon="trash"/></Button>
                        </ButtonGroup>
                    </td>
				</tr>
			)
        )):(<td></td>)

    const usersList = (cognitoUsers.length > 0 )?([].concat(cognitoUsers)
		.map((item,i)=>
			(
				<tr key={i}>
					<td style={{width: 200}}>{item.Attributes[0].Value}</td>
					<td style={{width: 200}}>{item.UserStatus === "EXTERNAL_PROVIDER" ? "GOOGLE" : "INTERNO"}</td>
					<td>
                        <ButtonGroup size="sm">
                            <Button style={{marginRight: 1}} loading={props.ap.load.loading.type === 'linkemployee'+i} intent={"Primary"} onClick={e => { e.preventDefault(); handleLinkEmployee(item, i) }} ><Icon icon="link"/></Button>
                        </ButtonGroup>
                    </td>
				</tr>
			)
        )):(<td></td>)

    const companyServices = (props.ap.cser.companyServices !== null)?([].concat(props.ap.cser.companyServices)
	    .map((item,i)=>
		(
            <option key={i} value={item.service.id}>{item.service.name}</option>
		)
     )):(<td></td>)
        
    return(<Container fluid>
		{props.addButton &&
        <div style={{marginTop:20}}>
			{(props.cp.state.user_roles.indexOf('supplier') !== -1 && props.employess.length === 0 ) && <Col sm={2}><Button loading={props.ap.load.loading.type === 'addemployee'} intent="Primary" onClick={(e) => {e.preventDefault(); handleShow('add', {});}} icon="add"></Button></Col>}
		</div>}
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
				{ !add && !edit &&
                    (<div>
                        <Form.Group controlId="name">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control readOnly={!edit && !add} ype="text" value={name} onChange={ e => setName(e.target.value)}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Agregar Servicio a Empleado</Form.Label>
                            <Form.Control as="select" id="services" onChange={e => setService(e.target.value)}>
                                <option>Seleccione...</option>
                                {companyServices}
                            </Form.Control>
                        </Form.Group>
                        <Row>
                            <Col sm={2}>
                                <Button loading={props.ap.load.loading.type === 'addemployeeservice'} intent="Primary" onClick={(e) => {e.preventDefault(); handleShowAddService()}} icon="add"></Button>
                            </Col>
                        </Row>
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
                    </div>)
                }

                { add &&
                    (<div>
                        <Form.Group controlId="name">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="text" value={email} onChange={ e => setEmail(e.target.value)}/>
                        </Form.Group>
                        <Row>
                            <Col sm={2}>
                                <Button loading={lookingforuser} intent="Primary" onClick={(e) => {e.preventDefault(); handleFindUser()}} icon="search"></Button>
                            </Col>
                        </Row>
                        <div style={{marginTop:20}}>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Cuenta</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {usersList}
                                </tbody>
                            </Table>
                        </div>
                    </div>)
                }

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
        <Modal show={showAddS} onHide={handleCloseAddS}>
            <Modal.Header closeButton>
                <Modal.Title>Agregar Servicio a Empleado</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group controlId="duration">
                    <Form.Label>Duracion promedio en minutos</Form.Label>
                    <Form.Control type="text" value={_duration} onChange={ e => setDuration(e.target.value)}/>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseAddS}>
                    Cerrar
                </Button>
                <Button variant="primary" loading={props.ap.load.loading.type === 'addemployeeservice'} onClick={addServiceToEmployee}>
                    Guardar
                </Button>
            </Modal.Footer>
        </Modal>
    </Container>)
}

export default Employess;