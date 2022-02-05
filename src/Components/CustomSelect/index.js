import React from 'react';
import PropTypes from 'prop-types'
import { Form } from 'react-bootstrap';


const CustomSelect = ({ id, onChange, items }) => {

    const list = [].concat(items).map((item) => <option key={item.id} value={item.id}>{item.name}</option>)

    return <Form.Group>
        <Form.Control as="select" id={id} onChange={onChange}>
            <option value={'0'}>Seleccione...</option>
            {list}
        </Form.Control>
    </Form.Group>;
}

CustomSelect.propTypes = {
    id: PropTypes.string,
    items: PropTypes.array,
    onChange: PropTypes.func,
}

CustomSelect.defaultProps = {
    items: [],
}

export default CustomSelect;