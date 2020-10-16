import React from 'react';
import { Table, Container, Row, Col, ButtonGroup, Modal, Form } from 'react-bootstrap';
import { Button, Spinner, Icon } from "@blueprintjs/core";

import useProducts from './useProducts';

const Products = (props) => {

    const { add, productName, handleAddProduct, handleEditProduct, setCost, handleDelete, handleClose, handleShow, edit, show, cost, setProduct } = useProducts(props);
 
    const list = (props.ap.cpro.companyProducts !== null)?([].concat(props.ap.cpro.companyProducts)
		.map((item,i)=>
			(
				<tr key={i}>
					{/* <td>{i+1}</td> */}
					<td style={{width: 200}}>{item.product.name}</td>
					<td>
                        <ButtonGroup size="sm">
                            <Button style={{marginRight: 1}} intent={"Primary"} onClick={e => { e.preventDefault(); handleShow('view', item);}} ><Icon icon="eye-open"/></Button>
                            <Button style={{marginRight: 1}} intent={"Primary"} onClick={e => { e.preventDefault(); handleShow('edit', item);}} ><Icon icon="edit"/></Button>
                            <Button style={{marginRight: 1}} intent={"Primary"} onClick={e => { e.preventDefault(); handleDelete(item.id, i);}} loading={props.ap.load.loading.type === 'deleteproduct'+i} ><Icon icon="trash"/></Button>
                        </ButtonGroup>
                    </td>
				</tr>
			)
        )):(<td></td>)

    const productsList = (props.ap.pro.products !== null)?([].concat(props.ap.pro.products)
	    .map((item,i)=>
		(
            <option key={i} value={item.id}>{item.name}</option>
		)
     )):(<td></td>)

    if(props.ap.err.error.type === 'products') return(<div style={{marginTop: 5}}><h5>{props.ap.err.error.message}</h5></div>)
    
    if(props.ap.load.loading.type === 'products') return(<Spinner/>)
        
    return(<Container fluid>

        <Row>
            <Col sm={4}>
                <Form.Group>
                    <Form.Control as="select" id="products" onChange={e => setProduct(e.target.value)}>
                        <option>Seleccione...</option>
                        {productsList}
                    </Form.Control>
                </Form.Group>
            </Col>
            <Col sm={2}><Button loading={props.ap.load.loading.type === 'addproduct'} intent="Primary" onClick={(e) => {e.preventDefault(); handleShow('add', {});}} icon="add"></Button></Col>
        </Row>

        <div style={{marginTop:20}}>
			<Table striped bordered hover>
				<thead>
					<tr>
						{/* <th>No.</th> */}
						<th>Producto</th>
						<th>Acciones</th>
					</tr>
				</thead>
				<tbody>
					{list}
				</tbody>
			</Table>
		</div>

        {/* Modal para editar y ver detalle de productos */}
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{edit ? 'Editar Producto' : add ? 'Agregar Producto' : 'Ver Producto'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group controlId="name">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control readOnly={true} type="text" value={productName} />
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
                    <Button variant="primary" loading={props.ap.load.loading.type === 'addproduct' || props.ap.load.loading.type === 'editproduct'} onClick={ add ? handleAddProduct : handleEditProduct }>
                        Guardar
                    </Button>
                }
            </Modal.Footer>
        </Modal>
    </Container>)
}

export default Products;