import React, { useMemo, useState } from 'react'
import { Container } from 'react-bootstrap';
import CustomTable from '../../../../Components/CustomTable';

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

export default Employees;