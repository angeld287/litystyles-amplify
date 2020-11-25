import React, { useState } from 'react';
import { Button, Card, Elevation, FormGroup, InputGroup } from "@blueprintjs/core";
import { Container } from 'react-bootstrap';

import { API, graphqlOperation } from 'aws-amplify';

import { createCompany, createOffice } from '../../graphql/mutations';


const FirstSteps = (props) => {

  const [name, setName ] = useState('');
  const [loading, setLoading ] = useState(false);
  const [error, setError ] = useState(false);

  const _createCompany = async () => {
    try {
      setLoading(true);
      const c = await API.graphql(graphqlOperation(createCompany, {input: {name: name}}));
      await API.graphql(graphqlOperation(createOffice, {input: {location: 'nan', name: name, companyOfficesId: c.data.createCompany.id, companyId: c.data.createCompany.id}}));
      setLoading(false);
      window.location.reload();
    } catch (e) {
      setLoading(false);
      setError(true);
      console.log(e);
    }
  }

	if (error) return <Container style={{marginTop: 40}} align="center"><h5>Ha ocurrido un error al crear la empresa. Intentelo mas tarde.</h5></Container> ;

  return (
    <Container>
      <Card interactive={true} elevation={Elevation.TWO} style={{marginTop: 40}}>
          <h5>Crea Tu Empresa</h5>
          <FormGroup
              helperText="digita el nombre de tu empresa..."
              label="Nombre de la Empresa"
              labelFor="text-input"
              labelInfo="(requerido)"
          >
              <InputGroup id="text-input" value={name} onChange={e => {e.preventDefault(); setName(e.target.value)}} placeholder="" />
          </FormGroup>
          <Button loading={loading} onClick={_createCompany} >Crear</Button>
      </Card>
    </Container>
  );
}

export default FirstSteps;