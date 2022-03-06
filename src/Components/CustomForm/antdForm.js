import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types'

import CustomButton from '../CustomButton';
import CustomSelect from '../CustomSelect';

import { Form, Input, Button, Select } from 'antd';

const { Option } = Select;

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

const CustomForm = ({ onSubmit, error, errorMessage, fields, buttons, loading }) => {
    const [form] = Form.useForm();

    const _buttons = useMemo(() => buttons.map(b => (
        <CustomButton style={{ marginRight: 5 }} key={'btn_' + b.name} loading={loading} {...b} />
    )), [buttons, loading])

    return (
        <Form {...layout} form={form} name="control-hooks" onFinish={onSubmit}>
            <Form.Item name="note" label="Note" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
                <Select
                    placeholder="Select a option and change input text above"
                //onChange={onGenderChange}
                >
                    <Option value="male">male</Option>
                    <Option value="female">female</Option>
                    <Option value="other">other</Option>
                </Select>
            </Form.Item>
            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>

    );
};

CustomForm.propTypes = {
    onSubmit: PropTypes.func,
    error: PropTypes.bool,
    errorMessage: PropTypes.string,
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