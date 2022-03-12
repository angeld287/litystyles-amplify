import React, { useMemo, useState, useEffect, useCallback } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import CustomTable from '../../../../Components/CustomTable';

import { getOfficeEmployees, listEmployees } from "../../../../graphql/customQueries"
import { createEmployee, updateEmployee } from "../../../../graphql/customMutations"
import { getList, createUpdateItem } from "../../../../services/AppSync"
import { findCognitoUser } from "../../../../services/Lambda"

import { QUERY_LIMIT } from '../../../../utils/Constants';

import { connect } from 'react-redux';
import { editEmployee, setItemsFromStore, setNextToken, setEmployee, removeEmployee } from '../../../../redux/employees/employees.actions'
import CustomModal from '../../../../Components/CustomModal';
import CustomButton from '../../../../Components/CustomButton';

import aws_exports from '../../../../aws-exports';

import swal from 'sweetalert';

const Employees = ({ officeId, currentTab, employees, nextToken, setItemsFromStore, setNextToken, setEmployee, removeEmployee }) => {
    const [loading, setLoading] = useState(false);
    const [employeesList, setEmployees] = useState([]);
    const [unlinkLoading, setUnlinkLoading] = useState("")
    const [showModal, setShowModal] = useState(false);
    const [modalError, setModalError] = useState(false);
    const [modalErrorMessage, setModalErrorMessage] = useState("");

    useEffect(() => {
        let didCancel = false;
        const fetch = async () => {
            setLoading(true);

            var result = [];
            var _employees = employees;
            let parameters = {};
            let tokens = nextToken;

            try {
                //get employees
                if (employees.length === 0) {
                    parameters = { id: officeId, limit: QUERY_LIMIT, filter: { deleted: { ne: true } } };
                    result = await getList('getOffice', getOfficeEmployees, parameters);
                    _employees = result.employees.items;
                    tokens = result.employees.nextToken
                    while (_employees.length < QUERY_LIMIT && result.employees.nextToken !== null) {
                        parameters.nextToken = result.employees.nextToken;
                        result = await getList('getOffice', getOfficeEmployees, parameters);
                        _employees = [..._employees, ...result.employees.items];
                        tokens = result.employees.nextToken
                    }
                }
            } catch (e) {
                console.log(e)
                setLoading(false);
                throw new Error('employees - 01: ', e)
            }

            if (!didCancel) {
                if (employees.length === 0) {
                    setItemsFromStore({ employees: _employees });

                    setNextToken(tokens);
                }
                setLoading(false);
            }
        };

        if (currentTab === 'employees') {
            fetch();
        }

        return () => { }

    }, [officeId, setItemsFromStore, setNextToken, employees, currentTab, nextToken])

    const getItemsNextToken = () => {

    }

    const handleFindUser = async (email) => {
        try {

            const apiOptions = {
                headers: { 'Content-Type': 'application/json' },
                body: {
                    UserPoolId: aws_exports.aws_user_pools_id,
                    filterBy: 'email',
                    value: email
                }
            };

            const _user = await findCognitoUser(apiOptions);
            if (_user !== false) {
                let user = _user.body === null ? [] : _user.body.Users === undefined ? [] : _user.body.Users;
                return user;
            } else {
                return false;
            }
        } catch (e) {
            console.log(e)
            return false;
        }
    }

    //#region Mutation Actions

    const handleUnlinkEmployee = useCallback(async (e) => {
        setUnlinkLoading(e.id);
        let parameters = {};

        //unassociate the current office to from employee
        parameters = { id: e.id, officeEmployeesId: 'nan', officeId: 'nan' };
        let mutationResult = false;
        mutationResult = await createUpdateItem('updateEmployee', updateEmployee, parameters);

        if (mutationResult !== false) {
            removeEmployee(mutationResult);
            swal({ title: "Desvinculacion de Empleado", text: "El empleado ha sigo desvinculado exitosamente!", type: "sucess", timer: 2000 });
        } else {
            swal({ title: "Desvinculacion de Empleado", text: "Ha ocurrido un erro al desvincular el empleado.", type: "error", timer: 2000 });
        }
        setUnlinkLoading("");
    }, [setUnlinkLoading, removeEmployee]);

    const onSubmitModal = async (e) => {
        const users = await handleFindUser(e.email);
        if (users !== false) {
            if (users.length > 0) {
                const user = users[0];
                let parameters = {}, result = {}, _employee = [];

                //search user in the db
                parameters = { limit: QUERY_LIMIT, filter: { username: { eq: user.Username }, deleted: { ne: true } } };
                result = await getList('listEmployees', listEmployees, parameters);
                _employee = result.items;
                while (_employee.length < QUERY_LIMIT && result.nextToken !== null) {
                    parameters.nextToken = result.nextToken;
                    result = await getList('listEmployees', listEmployees, parameters);
                    _employee = [..._employee, ...result.items];
                }

                if (_employee.length > 0) {
                    //if the employee exist on db, verify if has an associated office.
                    const employee = _employee[0];
                    if (employee.officeId !== "nan" && employee.officeId !== "") {
                        setModalError(true);
                        setModalErrorMessage("Este Empleado ya tiene una oficina asociada");
                        return null;
                    }

                    //associate the current office to the employees
                    parameters = { id: employee.id, officeId: officeId, officeEmployeesId: officeId };
                    let mutationResult = false;
                    mutationResult = await createUpdateItem('updateEmployee', updateEmployee, parameters);

                    if (mutationResult !== false) {
                        setEmployee(mutationResult);
                        handleShowModal();
                        swal({ title: "Agregar Empleado", text: "El empleado ha sigo agregado exitosamente!", type: "sucess", timer: 2000 });
                    } else {
                        setModalError(true);
                        setModalErrorMessage("Ha ocurrido un error agregando el empleado a la oficina");
                        console.log(mutationResult)
                    }
                } else {
                    //create the employee and associate the office.
                    parameters = { name: user.Attributes[0].Value, username: user.Username, officeId: officeId, officeEmployeesId: officeId };
                    let mutationResult = false;
                    mutationResult = await createUpdateItem('createEmployee', createEmployee, parameters);

                    if (mutationResult !== false) {
                        setEmployee(mutationResult);
                        handleShowModal();
                        swal({ title: "Agregar Empleado", text: "El empleado ha sigo agregado exitosamente!", type: "sucess", timer: 2000 });
                    } else {
                        setModalError(true);
                        setModalErrorMessage("Ha ocurrido un error agregando el empleado a la oficina");
                    }
                }

            } else {
                setModalError(true);
                setModalErrorMessage("No se ha encontrado el empleado");
            }
        } else {
            setModalError(true);
            setModalErrorMessage("Ha ocurrido un error buscando el empleado");
        }
    }

    //#endregion

    //#region Elements of presentation

    const handleShowModal = () => {
        setModalError(false);
        setModalErrorMessage("");
        setShowModal(!showModal);
    }

    const modalFields = useMemo(() => {
        return [
            { name: 'email', placeholder: 'Email del Empleado', validationmessage: 'Digita el Email', disabled: false },
        ];
    }, []);

    useEffect(() => {
        try {
            if (employees !== undefined) {
                setEmployees(employees.map(e => ({
                    nombre: e.name,
                    acciones: [
                        { id: e.id, color: 'blue', loading: unlinkLoading === e.id, icon: 'blocked-person', onClick: () => { handleUnlinkEmployee(e) }, text: "" },
                    ],
                    id: e.id
                })))
            }
        } catch (error) {
            throw new Error('Employees - xx: ', error);
        }
    }, [employees, setEmployees, unlinkLoading, handleUnlinkEmployee]);

    const tableHeaders = useMemo(() => ['Nombre', 'Acciones'], []);
    const tableItems = useMemo(() => employeesList, [employeesList]);

    //#endregion

    return (
        <Container fluid>
            <Row>
                <Col><CustomButton style={{ marginTop: 10 }} onClick={handleShowModal} icon="add">Buscar Empleado</CustomButton></Col>
            </Row>
            <CustomModal title={"Agregar Empleado"} saveButtonText={'Agregar'} show={showModal} onSubmit={onSubmitModal} handleClose={handleShowModal} fields={modalFields} error={modalError} errorMessage={modalErrorMessage} />
            <CustomTable
                items={tableItems}
                headers={tableHeaders}
                getItemsNextToken={getItemsNextToken}
                itemsLoading={loading}
            />
        </Container>
    );
}

const mapStateToProps = state => ({
    employees: state.employees.employees,
    nextToken: state.employees.nextToken
})

const mapDispatchToProps = dispatch => ({
    editEmployee: employee => dispatch(editEmployee(employee)),
    removeEmployee: employee => dispatch(removeEmployee(employee)),
    setItemsFromStore: data => dispatch(setItemsFromStore(data)),
    setNextToken: token => dispatch(setNextToken(token)),
    setEmployee: employee => dispatch(setEmployee(employee)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Employees);