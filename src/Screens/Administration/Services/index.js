import React, { useState, useMemo } from 'react';
import CustomButton from '../../../Components/CustomButton';
import CustomModal from '../../../Components/CustomModal';
import { Container, Row, Col } from 'react-bootstrap';


const Services = () => {
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleShowModal = () => {
        setShowModal(!showModal);
    }

    const onSubmitModal = (e) => {
        console.log(e)
        setError(true)
        setErrorMessage('error de prueba')
    }

    const fields = useMemo(() => [
        { name: 'name', placeholder: 'Nombre de Servicio', validationmessage: 'Digita el Nombre de Servicio', disabled: true, defaultValue: 'Corte Completo con Facial' },
        { name: 'cost', placeholder: 'Costo de Servicio', validationmessage: 'Digita el Costo de Servicio', defaultValue: '0' }
    ], []);

    return (
        <Container fluid>
            <h5>Servicios</h5>
            <Row>
                <Col sm={2}><CustomButton loading={false} onClick={handleShowModal} icon="add"></CustomButton></Col>
            </Row>
            <CustomModal title="Agregar Servicio" saveButtonText={'Guardar'} show={showModal} onSubmit={onSubmitModal} handleClose={handleShowModal} fields={fields} error={error} errorMessage={errorMessage} />
        </Container>
    );
}

export default Services;