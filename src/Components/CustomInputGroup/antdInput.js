import React, { memo } from 'react';
import PropTypes from 'prop-types'

import { Input, Form } from 'antd';

const CustomInputGroup = (props) => {

    return <Form.Item name={props.name} label={props.label} initialValue={props.defaultValue} ><Input disabled={props.disabled} /></Form.Item>;
}

CustomInputGroup.propTypes = {
    disabled: PropTypes.bool,
    leftIcon: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object,
    inputRef: PropTypes.any,
    type: PropTypes.string,
    defaultValue: PropTypes.string,
}

export default memo(CustomInputGroup);