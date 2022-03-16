import React, { memo } from 'react';
import PropTypes from 'prop-types'

import {
    Button,
    Intent,
} from "@blueprintjs/core";

const CustomButton = (props) => {
    const { children } = props;
    return <Button {...props}>
        {children}
    </Button>;
}

CustomButton.propTypes = {
    children: PropTypes.any,
    disabled: PropTypes.bool,
    loading: PropTypes.bool,
    text: PropTypes.string,
    type: PropTypes.string,
    className: PropTypes.string,
    intent: PropTypes.string,
    onClick: PropTypes.func,
    icon: PropTypes.any,
    id: PropTypes.string,
}

CustomButton.defaultProps = {
    intent: Intent.PRIMARY,
    type: "submit",
    disabled: false,
    loading: false,
}

export default memo(CustomButton);