import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types'

import {
    ControlGroup,
    Callout,
    Label
} from "@blueprintjs/core";
import CustomInputGroup from '../CustomInputGroup';
import CustomButton from '../CustomButton';
import { useForm } from 'react-hook-form';

const CustomForm = ({ onSubmit, error, errorMessage, fields, buttons, verticalButtons }) => {

    const { register, handleSubmit, errors, formState } = useForm();

    const _buttons = useMemo(() => buttons.map(b => (
        <CustomButton style={{ marginRight: 5 }} key={'btn_' + b.name} loading={formState.isSubmitting} {...b} />
    )), [buttons, formState.isSubmitting])

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <ControlGroup vertical style={{ marginTop: 15 }}>
                {/* fields */}
                {fields.map(
                    _ => {
                        const isRequired = _.validationmessage !== undefined && _.validationmessage !== '';
                        const hasDefaultValue = _.defaultValue !== undefined && _.defaultValue !== '';
                        return <div key={'form_' + _.name} text-align='left'>
                            {hasDefaultValue && <Label htmlFor={'input_id_' + _.name}>{_.placeholder}</Label>}
                            <CustomInputGroup id={'input_id_' + _.name} key={'input_' + _.name} {..._} style={{ marginBottom: 10 }} autoComplete="on"
                                inputRef={register({ required: { message: _.validationmessage, value: isRequired } })}
                            />
                            <div key={'error_' + _.name} style={{ marginBottom: 10 }}>
                                {errors[_.name] && <Callout intent="danger">{errors[_.name].message}</Callout>}
                            </div>
                        </div>
                    }
                )}
            </ControlGroup>
            {/* buttons */}
            {!verticalButtons && <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 10 }}>
                {_buttons}
            </div>}
            {verticalButtons && <ControlGroup vertical>
                {_buttons}
            </ControlGroup>}
            <div style={{ marginBottom: 10 }}>
                {error && <Callout intent="danger">{errorMessage}</Callout>}
            </div>
        </form>
    )
}

CustomForm.propTypes = {
    onSubmit: PropTypes.func,
    error: PropTypes.bool,
    errorMessage: PropTypes.string,
    fields: PropTypes.array,
    buttons: PropTypes.array,
    verticalButtons: PropTypes.bool
}

CustomForm.defaultProps = {
    buttons: [{ name: 'nodefined', text: 'Not Defined' }],
    fields: { name: 'noFiels' },
    verticalButtons: false,
}

export default memo(CustomForm);