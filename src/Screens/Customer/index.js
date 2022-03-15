import React, { useEffect, useMemo, useState } from 'react';
import CustomStepper from '../../Components/CustomStepper'
import { Container } from "react-bootstrap"
import CustomInputGroup from '../../Components/CustomInputGroup';

import { getOfficeEmployees, getCompanyServices, listRequests } from "../../graphql/customQueries"
import { createRequest as _createRequest, createRequestService, createRequestEmployee } from "../../graphql/customMutations"
import { getList, getItemById, createUpdateItem } from "../../services/AppSync"
import { QUERY_LIMIT, REQUESTS_QUERY_LIMIT } from "../../utils/Constants"

import { connect } from 'react-redux';
import { setItemsFromStore as setEmployeesItemsFromStore, setNextToken as setEmployeesNextToken } from '../../redux/employees/employees.actions';
import { setCompanyServicesItemsFromStore, setCompanyServicesNextToken } from '../../redux/services/services.actions';
import { setItemsFromStore as setRequestsItemsFromStore, setNextToken as setRequestsNextToken, setRequest } from '../../redux/requests/requests.actions'
import CustomEmployeeCard from '../../Components/CustomEmployeeCard';
import CustomSpinner from '../../Components/CustomSpinner';
import CustomServiceCard from '../../Components/CustomServiceCard';
import { List } from 'antd';
import moment from 'moment';
import CustomResumeCard from '../../Components/CustomResumeCard';

import swal from 'sweetalert';

const Customer = ({ currentScreen, setEmployeesItemsFromStore, setEmployeesNextToken, setCompanyServicesItemsFromStore, setCompanyServicesNextToken, companyServices, employees, companyServicesNextToken, employeesNextToken, company, requests, setRequestsNextToken, setRequestsItemsFromStore, setRequest, requestsNextToken }) => {
    const [current, setCurrent] = useState(0);
    const [loading, setLoading] = useState(false);
    const [customerName, setCustomerName] = useState("");
    const [selectedEmployee, setSelectedEmployee] = useState({});
    const [selectedService, setSelectedService] = useState({});

    //#region Actions to fetch data

    useEffect(() => {
        let didCancel = false;
        var result = [];
        var _companyServices = companyServices;
        var _employees = employees;
        var _requests = requests;
        let parameters = {};
        let employeestoken = employeesNextToken;
        let _companyServicesTokens = companyServicesNextToken;
        let _requestsNextToken = requestsNextToken;

        const fetch = async () => {
            setLoading(true);

            try {

                //get requests only execute it if needed

                if (_requests.length === 0) {

                    const filter = {
                        and: [
                            { state: { ne: 'FINISHED' } },
                            { state: { ne: 'CANCELED' } },
                            { companyId: { eq: company.id } },
                            { deleted: { ne: true } },
                        ]
                    };

                    parameters = { limit: REQUESTS_QUERY_LIMIT, filter: filter };
                    result = await getList('listRequests', listRequests, parameters);
                    _requests = result.items;
                    _requestsNextToken = result.nextToken

                    while (_requests.length < QUERY_LIMIT && result.nextToken !== null) {
                        parameters.nextToken = result.nextToken;
                        result = await getList('listRequests', listRequests, parameters);
                        _requests = [..._requests, ...result.items];
                        _requestsNextToken = result.nextToken
                    }
                }

                //get employees  only execute it if needed
                if (_employees.length === 0) {
                    parameters = { id: company.offices.items[0].id, limit: QUERY_LIMIT, filter: { deleted: { ne: true } } };
                    result = await getList('getOffice', getOfficeEmployees, parameters);
                    _employees = result.employees.items;
                    employeestoken = result.employees.nextToken

                    while (_employees.length < QUERY_LIMIT && result.employees.nextToken !== null) {
                        parameters.nextToken = result.employees.nextToken;
                        result = await getList('getOffice', getOfficeEmployees, parameters);
                        _employees = [..._employees, ...result.employees.items];
                        employeestoken = result.employees.nextToken
                    }
                }

                //get companyServices only execute it if needed
                if (_companyServices.length === 0) {
                    parameters = { id: company.id, limit: QUERY_LIMIT };
                    result = await getItemById('getCompany', getCompanyServices, parameters);
                    _companyServices = result.services.items;
                    _companyServicesTokens = result.services.nextToken
                    while (_companyServices.length < QUERY_LIMIT && result.services.nextToken !== null) {
                        parameters.nextToken = result.services.nextToken;
                        result = await getItemById('getCompany', getCompanyServices, parameters);
                        _companyServices = [..._companyServices, ...result.services.items];
                        _companyServicesTokens = result.services.nextToken
                    }
                }

            } catch (e) {
                console.log(e)
                setLoading(false);
                throw new Error('CompanyServices - 01: ', e)
            }

            if (!didCancel) {

                if (companyServices.length === 0) {
                    setCompanyServicesItemsFromStore(_companyServices);
                    setCompanyServicesNextToken(_companyServicesTokens);
                }

                if (employees.length === 0) {
                    setEmployeesItemsFromStore({ employees: _employees });
                    setEmployeesNextToken(employeestoken);
                }

                if (requests.length === 0) {
                    setRequestsItemsFromStore(_requests);
                    setRequestsNextToken(_requestsNextToken);
                }

                setLoading(false);
            }
        };

        if (currentScreen === "CUSTOMER") {
            fetch();
        }
        return () => {
            didCancel = true;
            setLoading(false)
        };

    }, [currentScreen, setEmployeesItemsFromStore, setEmployeesNextToken, setCompanyServicesItemsFromStore, setCompanyServicesNextToken, companyServices, employees, companyServicesNextToken, employeesNextToken, company, setRequestsNextToken, setRequestsItemsFromStore, requests, requestsNextToken])

    //#endregion

    const createRequest = async () => {
        setLoading(true);
        const _date = moment(new Date()).format('YYYY-MM-DDTHH:mm:ss.SSS') + 'Z';
        const ri = { state: 'ON_HOLD', customerName: customerName, companyId: company.id, date: _date, createdAt: _date, paymentType: "CASH", resposibleName: selectedEmployee.username };

        let requestInsert = await createUpdateItem('createRequest', _createRequest, ri);

        if (requestInsert === false) {
            swal({ title: "Creacion de Solicitud", text: "Ha ocurrido un error al crear la solicitud", type: "error", timer: 2000 });
            setLoading(false);
            setInitialStates();
        } else {
            const rei = { cost: selectedService.cost, createdAt: _date, requestEmployeeEmployeeId: selectedEmployee.id }
            const rsi = { cost: selectedService.cost, createdAt: _date, requestServiceServiceId: selectedService.id }
            rei.requestEmployeeRequestId = requestInsert.id;
            rsi.requestServiceRequestId = requestInsert.id;
            rsi.resposibleName = ri.resposibleName;

            let serviceInsert = await createUpdateItem('createRequestService', createRequestService, rsi);
            let employeeInsert = await createUpdateItem('createRequestEmployee', createRequestEmployee, rei);

            if (serviceInsert === false || employeeInsert === false) {
                swal({ title: "Creacion de Solicitud", text: "Ha ocurrido un error al crear los elementos asociados a la solitud", type: "error", timer: 2000 });
                setInitialStates();
                setLoading(false);

            } else {
                swal({ title: "Creacion de Solicitud", text: "La solicitud ha sido creada correctamente!", type: "sucess", timer: 2000 });
                setInitialStates();
                setLoading(false);

            }
        }
    }

    const setInitialStates = () => {
        setCustomerName("");
        setSelectedEmployee({});
        setSelectedService({});
        setCurrent(0);
    }

    const _employees = employees.map(_ => ({
        text: _.name,
        onClick: () => { setSelectedEmployee(_); next() },
        id: _.id
    }));

    const services = companyServices.map(_ => ({
        text: _.service.name,
        cost: _.cost,
        onClick: () => { setSelectedService(_); next() },
        id: _.id,
    }));

    const next = () => {
        if (customerName === "") {
            swal({ title: "Error en la Creacion de Solicitud!", text: "Debe digitar su nombre.", type: "error", timer: 2000 });
            return null;
        }
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    const resumeObject = useMemo(() => {
        if (selectedService.service !== undefined && selectedService !== undefined && selectedEmployee !== undefined) {
            return {
                employee: selectedEmployee.name,
                service: selectedService.service.name,
                cost: selectedService.cost,
                client: customerName
            }
        }
    }, [selectedService, selectedEmployee, customerName])

    const steps = [
        {
            title: 'Identificacion del Usuario',
            content: <CustomInputGroup placeholder="Digite su nombre..." onChange={_ => setCustomerName(_.target.value)} style={{ fontSize: "70px", height: 100, marginTop: 70 }} />,
        },
        {
            title: 'Seleeccion de Estilista',
            content: <EmployeesOptions options={_employees} />,
        },
        {
            title: 'Seleccion de Servicio',
            content: <ServicesOptions options={services} />,
        },
        {
            title: 'Confirmacion de Solicitud',
            content: <CustomResumeCard request={resumeObject} />,
        },
    ];

    if (loading) return <CustomSpinner />;

    return <Container style={{ marginTop: 20 }} fluid><CustomStepper onConfirm={createRequest} buttonsStyle={{ fontSize: "70px", width: '40%', margin: 5, height: 100 }} current={current} next={next} prev={prev} steps={steps} /></Container>;
}

const EmployeesOptions = ({ options }) => {
    return (
        <div>
            {options.map(_ => <CustomEmployeeCard key={_.id} title={_.text} onClick={() => _.onClick(_)} />)}
        </div>
    );
}

const ServicesOptions = ({ options }) => {
    return (
        <div>
            <List
                key="serviceCardListId"
                grid={{ gutter: 16, column: 4 }}
                dataSource={options.slice(0, 8)}
                renderItem={item => (
                    <List.Item>
                        <CustomServiceCard key={item.id} title={item.text} cost={item.cost} onClick={() => item.onClick(item)} image="https://joeschmoe.io/api/v1/random" />
                    </List.Item>
                )}
            />
        </div>
    );
}

const mapStateToProps = state => ({
    companyServices: state.services.companyServices,
    employees: state.employees.employees,
    employeesNextToken: state.employees.nextToken,
    companyServicesNextToken: state.services.nextToken,
    company: state.company.company,
    currentScreen: state.commun.currentScreen,
    requests: state.requests.requests,
    requestsNextToken: state.requests.nextToken,
    company: state.company.company
})

const mapDispatchToProps = dispatch => ({
    setEmployeesItemsFromStore: data => dispatch(setEmployeesItemsFromStore(data)),
    setEmployeesNextToken: token => dispatch(setEmployeesNextToken(token)),
    setCompanyServicesItemsFromStore: data => dispatch(setCompanyServicesItemsFromStore(data)),
    setCompanyServicesNextToken: token => dispatch(setCompanyServicesNextToken(token)),
    setRequestsItemsFromStore: data => dispatch(setRequestsItemsFromStore(data)),
    setRequestsNextToken: token => dispatch(setRequestsNextToken(token)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Customer);