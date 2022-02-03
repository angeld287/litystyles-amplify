import React, { memo } from 'react';
import PropTypes from 'prop-types'

import {
    Button,
    Classes,
    Intent,
} from "@blueprintjs/core";

const CustomButton = ({ children, disable, loading, text, type, className, intent, onClick }) => {
    return <Button
        className={className !== undefined ? className : Classes.LARGE}
        intent={intent !== undefined ? intent : Intent.PRIMARY}
        text={text !== undefined ? text : ""}
        type={type !== undefined ? type : "submit"}
        disabled={disable !== undefined ? disable : false}
        loading={loading !== undefined ? loading : false}
        onClick={onClick}
    >
        {children}
    </Button>;
}

CustomButton.propTypes = {
    children: PropTypes.any,
    disable: PropTypes.bool,
    loading: PropTypes.bool,
    text: PropTypes.string,
    type: PropTypes.string,
    className: PropTypes.string,
    intent: PropTypes.string,
    onClick: PropTypes.func,
}

export default memo(CustomButton);