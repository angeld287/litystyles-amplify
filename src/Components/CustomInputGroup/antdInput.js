import React, { memo } from 'react';
import PropTypes from 'prop-types'

import { Input, Form } from 'antd';

const CustomInputGroup = (props) => {

    return <Form.Item name={props.name} label={props.placeholder} ><Input {...props} /></Form.Item>;
}

CustomInputGroup.propTypes = {
    disabled: PropTypes.bool,
    leftIcon: PropTypes.string,
    placeholder: PropTypes.string,
    name: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object,
    inputRef: PropTypes.any,
    type: PropTypes.string,
    defaultValue: PropTypes.string,
}

export default memo(CustomInputGroup);