import React, { useMemo, useState } from 'react'
import { Container } from 'react-bootstrap';
import CustomTable from '../../../../Components/CustomTable';

import { getOfficeEmployees } from "../../../../graphql/customQueries"
import { createEmployee, updateEmployee } from "../../../../graphql/customMutations"
import { getList, getItemById, createUpdateItem, deleteItem } from "../../../../services/AppSync"

import { QUERY_LIMIT } from '../../../../utils/Constants'

import { connect } from 'react-redux';
import { editEmployee, setItemsFromStore, setNextToken, setEmployee, removeEmployee } from '../../../../redux/employees/employees.actions'

const Employees = () => {
    const [loading, setLoading] = useState(false);
    const [employees, setEmployees] = useState([]);
    const getItemsNextToken = () => {

    }

    const tableHeaders = useMemo(() => ['Nombre', 'Acciones'], []);
    const tableItems = useMemo(() => employees, [employees]);

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
    companyOffices: state.offices.companyOffices,
    nextToken: state.offices.nextToken,
    company: state.company.company,
})

const mapDispatchToProps = dispatch => ({
    editEmployee: employee => dispatch(editEmployee(employee)),
    removeEmployee: employee => dispatch(removeEmployee(employee)),
    setItemsFromStore: data => dispatch(setItemsFromStore(data)),
    setNextToken: token => dispatch(setNextToken(token)),
    setEmployee: employee => dispatch(setEmployee(employee)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Employees);