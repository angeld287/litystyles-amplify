import React from 'react';
import { Row, Col, Form } from 'react-bootstrap'
import { Button } from "@blueprintjs/core";

const SelectMonth = (props) => {
    const { rp } = props;

    const _months = (rp.date.months !== null)?([].concat(rp.date.months).map((item,i)=>(<option value={item.value}>{item.name}</option> ))):(<option></option>)
    const _years = (rp.date.years !== null)?([].concat(rp.date.years).map((item,i)=>(<option value={item}>{item}</option> ))):(<option></option>)
        
    return (
        <Row style={{marginBottom: 30, marginTop: 30}}>
          <Col sm={5}>
            <Form.Group>
              <Form.Control as="select" id="years" onChange={e => {e.preventDefault(); rp.date.setYear(e.target.value); rp.setInitialStates();}}>
                  <option>Seleccione el año...</option>
                  {_years}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col sm={5}>
            <Form.Group>
              <Form.Control as="select" id="months" onChange={e => {e.preventDefault(); rp.date.setMonth(e.target.value); rp.setInitialStates();}}>
                  <option>Seleccione el mes...</option>
                  {_months}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col sm={2}>
            <Button loading={rp.load.loading.type === 'getrequests'} intent="Primary" onClick={(e) => {e.preventDefault(); rp.getMonthResults();}} style={{width: 100}} icon="search"></Button>
          </Col>
        </Row>
    )
}

export default SelectMonth;