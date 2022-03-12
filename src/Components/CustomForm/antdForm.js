import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types'

import CustomButton from '../CustomButton';
import CustomSelect from '../CustomSelect/antdSelect';
import CustomInputGroup from '../CustomInputGroup/antdInput';

import { Form, } from 'antd';

const CustomForm = ({ onSubmit, fields, buttons, loading }) => {
    const [form] = Form.useForm();

    const _buttons = useMemo(() => buttons.map(b => (
        <CustomButton style={{ marginRight: 5 }} key={'btn_' + b.name} loading={loading} {...b} />
    )), [buttons, loading])

    return (
        <Form layout="vertical" form={form} name="control-hooks" onFinish={onSubmit}>
            {fields.map(
                _ => {
                    return <div key={'form_' + _.name} >
                        {(_.type === undefined || _.type === 'input') &&
                            <CustomInputGroup disabled={_.disabled} defaultValue={_.defaultValue} name={_.name} label={_.placeholder} />
                        }
                        {(_.type !== undefined && _.type === 'select') &&
                            <CustomSelect id={'select_id_' + _.name} defaultValue={_.defaultValue} name={_.name} dataTestId={'select_id_' + _.name} key={'select_id_' + _.name} style={{ marginBottom: 10 }} items={_.items} placeholder={_.placeholder} getItemsNextToken={_.getItemsNextToken} disabled={_.disabled} />
                        }
                    </div>
                }
            )}
            <div style={{ textAlign: 'right' }}>
                {_buttons}
            </div>
        </Form>

    );
};

CustomForm.propTypes = {
    onSubmit: PropTypes.func,
    fields: PropTypes.array,
    buttons: PropTypes.array,
    verticalButtons: PropTypes.bool,
    loading: PropTypes.bool,
}

CustomForm.defaultProps = {
    buttons: [{ name: 'nodefined', text: 'Not Defined' }],
    fields: { name: 'noFiels' },
    verticalButtons: false,
}

export default memo(CustomForm);