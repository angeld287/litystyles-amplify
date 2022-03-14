import React from 'react';
import { Card, Avatar, List } from 'antd';
import { Container, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types'
const { Meta } = Card;

const CustomResumeCard = ({ request }) => {
    const { employee, service, cost, client } = request;

    const data = [
        { name: "Empleado", value: employee },
        { name: "Servicio", value: service },
        { name: "Costo", value: "RD$ " + cost },
        { name: "Cliente", value: client },
    ];
    return (
        <Container fluid style={{ margin: 30 }}>
            <Row>
                <Col>
                    <Card style={{ width: '70%', margin: 'auto', padding: 10 }}>
                        <Meta
                            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                            title="Resumen de Solicitud"
                            description={"Usted ha solicitado el servicio '" + service + "' el cual tiene un costo de RD$ " + cost + " y sera atendid@ por " + employee}
                        />
                        <div style={{ width: '60%', margin: 'auto', padding: 10 }}>
                            <List
                                size="large"
                                header={<div>Datos Detallados</div>}
                                bordered
                                dataSource={data}
                                renderItem={item => <List.Item>{item.name + ": " + item.value}</List.Item>}
                            />
                        </div>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

CustomResumeCard.propTypes = {
    request: PropTypes.object,
}

CustomResumeCard.defaultProps = {
    request: {
        empleado: "",
        servicio: "",
        costo: "",
        cliente: ""
    },
}

export default React.memo(CustomResumeCard);