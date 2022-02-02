import React, { memo } from 'react';
import PropTypes from 'prop-types'

import {
    ControlGroup,
    Callout,
} from "@blueprintjs/core";
import CustomInputGroup from '../CustomInputGroup';
import CustomButton from '../CustomButton';
import { useForm } from 'react-hook-form';

const CustomForm = ({ onSubmit, error, errorMessage, fields, button }) => {

    const { register, handleSubmit, errors, formState } = useForm();


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <ControlGroup vertical style={{ marginTop: 15 }}>
                {/* fields */}
                {fields.map(
                    _ => {
                        return <div key={'form_' + _.name}>
                            <CustomInputGroup key={'input_' + _.name} name={_.name} leftIcon={_.icon} placeholder={_.placeholder} style={{ marginBottom: 10 }}
                                autoComplete="on"
                                type={_.type !== undefined ? _.type : "text"}
                                inputRef={register({ required: { message: _.validationMessage, value: _.validationMessage !== undefined || _.validationMessage !== '' } })}
                            />
                            <div key={'error_' + _.name} style={{ marginBottom: 10 }}>
                                {errors[_.name] && <Callout intent="danger">{errors[_.name].message}</Callout>}
                            </div>
                        </div>
                    }
                )}

                {/* button */}
                <CustomButton text={button !== undefined ? button.text : "No Text"} loading={formState.isSubmitting} />
                <div style={{ marginBottom: 10 }}>
                    {error && <Callout intent="danger">{errorMessage}</Callout>}
                </div>
            </ControlGroup>
        </form>
    )
}

CustomForm.propTypes = {
    onSubmit: PropTypes.func,
    error: PropTypes.bool,
    errorMessage: PropTypes.string,
    fields: PropTypes.array,
    button: PropTypes.object,
}

export default memo(CustomForm);