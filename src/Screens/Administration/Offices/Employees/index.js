import React, { useMemo, useState, useEffect } from 'react'
import { Container } from 'react-bootstrap';
import CustomTable from '../../../../Components/CustomTable';

import { getOfficeEmployees } from "../../../../graphql/customQueries"
import { createEmployee, updateEmployee } from "../../../../graphql/customMutations"
import { getList, getItemById, createUpdateItem, deleteItem } from "../../../../services/AppSync"

import { QUERY_LIMIT } from '../../../../utils/Constants'

import { connect } from 'react-redux';
import { editEmployee, setItemsFromStore, setNextToken, setEmployee, removeEmployee } from '../../../../redux/employees/employees.actions'

const Employees = ({ officeId, currentTab, employees, nextToken, setItemsFromStore, setNextToken }) => {
    const [loading, setLoading] = useState(false);
    const [employeesList, setEmployees] = useState([]);

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

    }, [officeId, setItemsFromStore, setNextToken, employees, currentTab])

    const getItemsNextToken = () => {

    }

    //#region Mutation Actions

    const handleUnlinkEmployee = (e) => {
        console.log(e)
    }

    //#endregion

    //#region Elements of presentation

    useEffect(() => {
        try {
            if (employees !== undefined) {
                setEmployees(employees.map(e => ({
                    nombre: e.name,
                    acciones: [
                        { id: e.id, color: 'blue', icon: 'blocked-person', onClick: () => { handleUnlinkEmployee(e) }, text: "" },
                    ],
                    id: e.id
                })))
            }
        } catch (error) {
            throw new Error('Employees - xx: ', error);
        }
    }, [employees, setEmployees]);

    const tableHeaders = useMemo(() => ['Nombre', 'Acciones'], []);
    const tableItems = useMemo(() => employeesList, [employeesList]);

    //#endregion

    return (
        <Container fluid>
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