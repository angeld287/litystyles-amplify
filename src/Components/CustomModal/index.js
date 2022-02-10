import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types'
import { Modal } from 'react-bootstrap';

import CustomForm from '../CustomForm';

import { CustomClasses } from '../../utils/Constants';

const CustomModal = (props) => {
    const { show, handleClose, title, withOutClose } = props;
    const noFunction = () => { return null }

    const buttons = useMemo(() => [
        { name: 'cancelBtn', text: "Cancelar", className: CustomClasses.INTENT_DANGER, onClick: handleClose, type: 'button', loading: false, },
        { name: 'saveBtn', text: "Guardar", }
    ], [handleClose]);

    return (
        <Modal show={show} onHide={!withOutClose ? handleClose : noFunction}>
            {title !== undefined && <Modal.Header>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>}
            <Modal.Body>
                <CustomForm buttons={buttons} {...props} />
            </Modal.Body>
        </Modal>
    )
}

CustomModal.propTypes = {
    show: PropTypes.bool,
    handleClose: PropTypes.func,
    title: PropTypes.string,
    error: PropTypes.bool,
    errorMessage: PropTypes.string,
    fields: PropTypes.array,
    button: PropTypes.object,
    withOutClose: PropTypes.bool,
    onSubmit: PropTypes.func,
}

export default memo(CustomModal);