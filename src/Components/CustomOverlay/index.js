import React, { memo } from 'react';
import PropTypes from 'prop-types'

import {
    Overlay,
} from "@blueprintjs/core";

import CustomForm from '../CustomForm';

const CustomOverlay = (props) => {
    return (
        <Overlay isOpen={props.isOpen} >
            <div style={{ width: 400, margin: 'auto' }}>
                <CustomForm verticalButtons={true} {...props} />
            </div>
        </Overlay>
    )
}

CustomOverlay.propTypes = {
    isOpen: PropTypes.bool,
    onSubmit: PropTypes.func,
    error: PropTypes.bool,
    errorMessage: PropTypes.string,
    fields: PropTypes.array,
    buttons: PropTypes.array,
}

export default memo(CustomOverlay);