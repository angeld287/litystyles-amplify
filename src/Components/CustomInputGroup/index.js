import React, { memo } from 'react';
import PropTypes from 'prop-types'

import {
    InputGroup
} from "@blueprintjs/core";

const CustomInputGroup = (props) => {

    return <InputGroup {...props} />;
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