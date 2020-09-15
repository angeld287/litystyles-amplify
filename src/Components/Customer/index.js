import React, {useState} from 'react';
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

const Customer = (props) => {
	const [ step, setStep ] = useState(0);
	const [ isService, setIsService ] = useState(false);
	const [ customerName, setCustomerName ] = useState("");
	const [ service, setService ] = useState({});
	const [ product, setProduct ] = useState({});
	const [ employee, setEmployee ] = useState({});
	const [ customerNameEmpty, setCustomerNameEmpty ] = useState(false);

	const finishRequest = async () => {
		setStep(0);
		setIsService(false);
		setCustomerName("");
		setService({});
		setProduct({});
		setEmployee({});
		setCustomerNameEmpty(false);
	};

	const { employees, company, products, services, error, loading, _createRequest, errorMessage, finish } = useCustomer(props, finishRequest, setStep);

	if (Object.entries(services).length === 0  && services.constructor === Object) return <div style={{marginTop: 50}} align="center"><Spinner intent="primary" size={100} /></div> ;

	const createRequest = async () => {
		const ri = {state: 'ON_HOLD', customerName: customerName, companyId: company.id};

		const rei = {}
		const rsi = {}
		const rpi = {}

		if (isService) {
			ri.resposibleName = employee.name;
			rei.requestEmployeeEmployeeId = employee.id;
			rsi.requestServiceServiceId = service.id;
		} else {
			rpi.requestProductProductId = product.id;
		}

		_createRequest(ri, rei, rsi, rpi, isService);
	}

	const handleNextPrevClick = (param, d) => (e) => {
		switch (param) {
			case 1:
				if (customerName !== "") {
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
				} else {
					setCustomerNameEmpty(true);
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

			case 3:
				if (isService) {
					setService(d);
					setStep(param)
				}else {
					setProduct(d);
					setStep(4)
				}
				//setStep(param);
				break;

			case 4:
				setEmployee(d);
				setStep(param);
				break;
				
			default:
				setStep(param);
				break;
		}
	}

	const _products = (products !== null)?([].concat(products)
    .sort((a, b) => a.product.name.localeCompare(b.product.name))
    .map((item,i)=> <Button key={i} intent="Danger" onClick={handleNextPrevClick(3, item.product)} style={{fontSize: "50px", textAlign: "center", margin: 10, width: 300, height: 200}} >{item.product.name}</Button>
	)):(<ButtonGroup></ButtonGroup>)
	
	const _services = (services !== null)?([].concat(services)
    .sort((a, b) => a.service.name.localeCompare(b.service.name))
    .map((item,i)=> <Button key={i} intent="Primary" onClick={handleNextPrevClick(3, item.service)} style={{fontSize: "50px", textAlign: "center", margin: 10, width: 300, height: 200}} >{item.service.name}</Button>
	)):(<ButtonGroup></ButtonGroup>)
	
	const _employees = (employees !== null)?([].concat(employees)
	.sort((a, b) => a.name.localeCompare(b.name))
	.filter(i => i.services.items.filter(s => s.service.id === service.id).length !== 0 )
    .map((item,i)=> <Button key={i} intent="Primary" onClick={handleNextPrevClick(4, item)} style={{fontSize: "50px", textAlign: "center", margin: 10, width: 300, height: 200}} >{item.name}</Button>
    )):(<ButtonGroup></ButtonGroup>)

	return (
		<div>
			<ControlGroup fill={true} vertical={false}>
				{ step === 0 &&
					<div>
						{ ((products.length > 0) || (services.length > 0)) &&
							<ControlGroup fill={true} vertical={true} style={{margin: 50}}/* onMouseEnter={} */>
								<InputGroup
									style={{fontSize: "70px", margin: 10, height: 100}}
									disabled={false}
									//defaultValue={customerName}
									onChange={(e) => {e.preventDefault(); setCustomerName(e.target.value)}}
									large={false}
									placeholder="DIGITE SU NOMBRE"
									small={false}
								/>
								{customerNameEmpty && <Callout intent="danger">Debe digitar su nombre</Callout>}
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
						{_employees}
					</div>
				}
				{ step === 4 &&
					<div>
						{!isService && <Callout style={{fontSize: "50px", marginTop: "40px"}} intent="info" >Usted ha solicitado el producto "{product.name}" a un costo de RD$ {product.cost === null ? "0" : product.cost}. Haga clic en "Enviar Solicitud" para confirmar.</Callout>}
						{isService && <Callout style={{fontSize: "50px", marginTop: "40px"}} intent="info" >Usted ha solicitado el servicio "{service.name}" a un costo de RD$ {service.cost === null ? "0" : service.cost}.  Haga clic en "Enviar Solicitud" para confirmar.</Callout>}
						<ButtonGroup fill={true} style={{margin: 0}}/* onMouseEnter={} */>
							<Button intent="Danger" style={{fontSize: "30px", margin: 10, height: 100}} onClick={finishRequest}>Cancelar Solicitud</Button>
							<Divider/>
							<Button intent="Success" style={{fontSize: "30px", margin: 10, height: 100}} onClick={createRequest} loading={loading}>Enviar Solicitud</Button>
						</ButtonGroup>
					</div>
				}
				{finish &&
					<div>
						<Callout style={{fontSize: "60px", marginTop: "40px"}} title="SOLICITUD CREADA!" intent="Success" >
							Su solicitud ha sido creada. Favor esperar su turno.
						</Callout>
					</div>
				}
				{error &&
					<div>
						<Callout style={{ marginTop: "40px"}} title="Ha ocurrido un Error!" intent="Danger" >
							{errorMessage}
						</Callout>
					</div>
				}
			</ControlGroup>
        </div>
	);
};

export default Customer;