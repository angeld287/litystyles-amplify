import React, {useEffect } from 'react';
import { Table, Container, Row, Col, ButtonGroup, Modal, Form, Image } from 'react-bootstrap';

import { Button, Spinner, Icon } from "@blueprintjs/core";
import Cropper from 'react-easy-crop'

import useOffices from './useOffices';

import _default from '../../../images/default-image.png'

import Employess from './Employees/Employees';

const Offices = (props) => {

    useEffect(() => { 
        console.log(props.cp.state.user_roles);
    }, []);

    const { s3Image, crop, so, add, handleAdd, handleEdit, handleDelete, handleClose, handleShow, edit, show, setLocation, setName, location, name, employees, setCategory, category } = useOffices(props);
 
    const list = (props.ap.off.offices !== null)?([].concat(props.ap.off.offices)
		.map((item,i)=>
			(
				<tr key={i}>
					{/* <td>{i+1}</td> */}
					<td style={{width: 200}}>{item.name}</td>
					<td>
                        <ButtonGroup size="sm">
                            <Button style={{marginRight: 1}} intent={"Primary"} onClick={e => { e.preventDefault(); handleShow('view', item);}} ><Icon icon="eye-open"/></Button>
                            <Button style={{marginRight: 1}} intent={"Primary"} onClick={e => { e.preventDefault(); handleShow('edit', item);}} ><Icon icon="edit"/></Button>
                            { props.ap.off.offices.length > 1 && <Button style={{marginRight: 1}} intent={"Primary"} onClick={e => { e.preventDefault(); handleDelete(item.id, i);}} loading={props.ap.load.loading.type === 'deleteservice'+i} ><Icon icon="trash"/></Button>}
                        </ButtonGroup>
                    </td>
				</tr>
			)
        )):(<td></td>)

    const categoryList = (props.ap.cat.categories !== null)?([].concat(props.ap.cat.categories)
	    .map((item,i)=>
		(
            <option key={i} value={item.id}>{item.name}</option>
		)
     )):(<td></td>)

    if(props.ap.err.error.type === 'offices') return(<div style={{marginTop: 5}}><h5>{props.ap.err.error.message}</h5></div>)
    
    if(props.ap.load.loading.type === 'offices') return(<Spinner/>)
        
    return(<Container fluid>

        <Row>
            {props.cp.state.user_roles.indexOf('supplier') === -1 && <Col sm={2}><Button loading={props.ap.load.loading.type === 'addoffice'} intent="Primary" onClick={(e) => {e.preventDefault(); handleShow('add', {});}} icon="add"></Button></Col>}
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
                <Col className="mb-4">
                    <Image src={s3Image !== '' && crop.croppedImage === null ? s3Image : ((so.image !== [] && crop.croppedImage !== null) ? crop.croppedImage : _default)} fluid />
                </Col>
                <Form.Group controlId="name">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control readOnly={!edit && !add} type="text" value={name} onChange={ e => setName(e.target.value)}/>
                </Form.Group>
                <Form.Group>
                    <Form.Control defaultValue={!add ? category : 0} readOnly={!edit && !add} as="select" id="category" onChange={e => setCategory(e.target.value)}>
                        <option value="0">Seleccione...</option>
                        {categoryList}
                    </Form.Control>
                </Form.Group>
                {/* Agregar Imagen */}

                { edit &&
                <div class="input-group mb-3">
                    <div class="custom-file">
                        <input type="file" class="custom-file-input" id="inputGroupFile01" accept="image/*" onClick={(e)=> { e.target.value = null; }} onChange={e => {e.preventDefault(); crop.handleImageSelected(e)}} aria-describedby="inputGroupFileAddon01" />
                        <label class="custom-file-label" for="inputGroupFile01">Choose file</label>
                    </div>
                </div>}

                {props.cp.state.user_roles.indexOf('supplier') === -1 &&
                    <Form.Group controlId="location">
                        <Form.Label>Ubicacion</Form.Label>
                        <Form.Control readOnly={!edit && !add} type="text" value={location} onChange={ e => setLocation(e.target.value)}/>
                    </Form.Group>
                }

                {(!add && props.cp.state.user_roles.indexOf('supplier') === -1) && <Employess addButton={edit} employess={employees} ap={props.ap} office={so} cp={props.cp}/>}
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
        <Modal show={crop.imageModal} onHide={crop.handleCloseImageModal}>
            <Modal.Header closeButton>
                <Modal.Title>Cortar Imagen</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div style={{position: 'relative', width: '100%', height: 200, background: '#333'}}>
                    <Cropper
                        image={crop.imagePath}
                        crop={crop._crop}
                        //rotation={crop.rotation}
                        zoom={crop.zoom}
                        aspect={6 / 3}
                        onCropChange={crop.setCrop}
                        //onRotationChange={crop.setRotation}
                        onCropComplete={crop.onCropComplete}
                        onZoomChange={crop.setZoom}
                    />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={crop.handleCloseImageModal}>
                    Cerrar
                </Button>
                <Button loading={props.ap.load.loading.type === 'croppingimage'} variant="primary" onClick={crop.showCroppedImage} >
                    Cortar
                </Button>
            </Modal.Footer>
        </Modal>
    </Container>)
}

export default Offices;