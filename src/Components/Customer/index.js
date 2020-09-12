import React, {useState} from 'react';
import { useForm } from 'react-hook-form';
import {
	ControlGroup,
	ButtonGroup,
	Button,
	InputGroup,
	Divider,
	Callout,
	Spinner,
} from "@blueprintjs/core";

import useCustomer from './useCustomer';

const Customer = () => {
	const [ step, setStep ] = useState(0);
	const [ isService, setIsService ] = useState(false);

	const { company, products, services, error, loading } = useCustomer();

	const { register, handleSubmit, errors, formState } = useForm();

	const onSubmit = async (input) => {
		console.log(input);
	}

	const handleNextPrevClick = (param, d) => (e) => {
		switch (param) {
			case 1:
				if((products.length === 0) || (services.length === 0)){
					if(products.length === 0){
						setIsService(true);
					}else{
						setIsService(false);
					}
					setStep(2);
				}else{
					setStep(param);
				}
				break;
			
			case 2:
				if (d===1) {
					setIsService(false);
				}else if (d===2) {
					setIsService(true);
				}
				setStep(param);
				break;
		
			default:
				setStep(param);
				break;
		}
	}
	const insertObject = {state: 'IN_PROCESS', requestServiceId: "", requestProductId: "", customerName: ""}
	const _products = (products !== null)?([].concat(products)
    .sort((a, b) => a.product.name.localeCompare(b.product.name))
    .map((item,i)=> <Button key={i} intent="Danger" onClick={handleNextPrevClick(3)} style={{fontSize: "50px", textAlign: "center", margin: 10, width: 300, height: 200}} >{item.product.name}</Button>
	)):(<ButtonGroup></ButtonGroup>)
	
	const _services = (services !== null)?([].concat(services)
    .sort((a, b) => a.service.name.localeCompare(b.service.name))
    .map((item,i)=> <Button key={i} intent="Primary" onClick={handleNextPrevClick(3)} style={{fontSize: "50px", textAlign: "center", margin: 10, width: 300, height: 200}} >{item.service.name}</Button>
    )):(<ButtonGroup></ButtonGroup>)

	if (Object.entries(company).length === 0 && company.constructor === Object) return <div style={{marginTop: 50}} align="center"><Spinner intent="primary" size={100} /></div> ;

	return (
		<div>
			<ControlGroup fill={true} vertical={false}>
				<form onSubmit={handleSubmit(onSubmit)}>
					{ step === 0 &&
						<div>
							{ ((products.length > 0) || (services.length > 0)) &&
								<ControlGroup fill={true} vertical={true} style={{margin: 50}}/* onMouseEnter={} */>
									<InputGroup
										style={{fontSize: "70px", margin: 10, height: 100}}
										disabled={false}
										large={false}
										placeholder="DIGITE SU NOMBRE"
										small={false}
									/>
									<Button intent="Primary" onClick={handleNextPrevClick(1)} style={{fontSize: "70px", margin: 10}} >SIGUIENTE</Button>
								</ControlGroup>
							}
							{ (!(products.length > 0) && !(services.length > 0)) &&
								<div>
									<Callout style={{ marginTop: "40px"}} title="ESTA EMPRESA NO TIENE PRODUCTO NI SERVICIOS REGISTRADOS!" intent="Danger" >
										Debe solicitar al administrador de la empresa que registre los servicios y productos para que muestren en esta pantalla.
									</Callout>
								</div>
							}
						</div>
					}
					{ step === 1 &&
						<div>
							<h1>PRODUCTO O SOLICITUD</h1>
							<Divider/>
							<ButtonGroup fill={true} style={{margin: 0}}/* onMouseEnter={} */>
								{products.length > 0 && <Button intent="Danger" onClick={handleNextPrevClick(2, 1)} style={{fontSize: "70px", margin: 10, height: 400}} >Producto</Button>}
								{services.length > 0 && <Button intent="Primary" onClick={handleNextPrevClick(2, 2)} style={{fontSize: "70px", margin: 10, height: 400}} >Servicio</Button>}
							</ButtonGroup>
						</div>
					}
					{ step === 2 &&
						<div>
							<h1>SELECCIONE EL SERVICIO QUE DESEA SOLICITAR</h1>
							<Divider/>
							{isService && _services}
							{!isService && _products}
						</div>
					}
					{ step === 3 &&
						<div>
							<h1>SELECCIONE EL ESTILISTA QUE LO ESTENDERA</h1>
							<Divider/>
							<ButtonGroup fill={true} style={{margin: 0}}/* onMouseEnter={} */>
								<Button intent="Primary" onClick={handleNextPrevClick(4)} style={{fontSize: "70px", margin: 10, height: 200}} >Producto</Button>
								<Button intent="Primary" style={{fontSize: "70px", margin: 10, height: 200}} >Producto</Button>
								<Button intent="Primary" style={{fontSize: "70px", margin: 10, height: 200}} >Servicio</Button>
							</ButtonGroup>
							<ButtonGroup fill={true} style={{margin: 0}}/* onMouseEnter={} */>
								<Button intent="Primary" style={{fontSize: "70px", margin: 10, height: 200}} >Producto</Button>
								<Button intent="Primary" style={{fontSize: "70px", margin: 10, height: 200}} >Producto</Button>
								<Button intent="Primary" style={{fontSize: "70px", margin: 10, height: 200}} >Servicio</Button>
							</ButtonGroup>
						</div>
					}
					{ step === 4 &&
						<div>
							<Callout style={{fontSize: "70px", marginTop: "40px"}} intent="Success" >SU SOLICITUD HA SIDO CREADA! ESPERE SU TURNO.</Callout>
						</div>
					}
				</form>
			</ControlGroup>
        </div>
	);
};

export default Customer;