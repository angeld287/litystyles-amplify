import React, { memo } from 'react';
import PropTypes from 'prop-types'

import {
    InputGroup,
    Classes
} from "@blueprintjs/core";

const CustomInputGroup = ({ disabled, className, leftIcon, name, placeholder, style, inputRef, type }) => {

    return <InputGroup
        className={className !== undefined ? className : Classes.LARGE}
        disabled={disabled !== undefined ? disabled : false}
        leftIcon={leftIcon !== undefined ? leftIcon : null}
        name={name !== undefined ? name : "noname"}
        placeholder={placeholder !== undefined ? placeholder : "No Placeholder"}
        style={style !== undefined ? style : null}
        inputRef={inputRef}
        type={type !== undefined ? type : "text"}
    />;
}

CustomInputGroup.propTypes = {
    disabled: PropTypes.bool,
    leftIcon: PropTypes.string,
    placeholder: PropTypes.string,
    name: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object,
    validationMessage: PropTypes.string,
    inputRef: PropTypes.any,
    type: PropTypes.string,
}

export default memo(CustomInputGroup);