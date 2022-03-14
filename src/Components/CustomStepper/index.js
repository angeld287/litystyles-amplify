import React from 'react';
import { Steps, message } from 'antd';
import PropTypes from 'prop-types'
import CustomButton from '../CustomButton';
import { Icon } from '@blueprintjs/core';

const { Step } = Steps;

const CustomStepper = ({ steps, next, prev, current, buttonsStyle, onConfirm }) => {
    return (
        <>
            <Steps current={current}>
                {steps.map(item => (
                    <Step key={item.title} title={item.title} />
                ))}
            </Steps>
            <div className="steps-content" style={{ height: '400px', margin: 10 }}>{steps[current].content}</div>
            <div className="steps-action">
                {current === 0 && (
                    <CustomButton style={buttonsStyle} type="primary" onClick={() => next()}>
                        Siguiente
                    </CustomButton>
                )}
                {current > 0 && (
                    <CustomButton className="bp3-outlined .bp3-large .bp3-intent-primary" style={{ margin: '0 8px', width: '40%', margin: 5, height: 80 }} icon={<Icon icon="double-chevron-left" size={50} />} onClick={() => prev()} />
                )}
                {current === steps.length - 1 && (
                    <CustomButton className="bp3-outlined .bp3-large .bp3-intent-success" style={{ margin: '0 8px', width: '40%', margin: 5, height: 80 }} icon={<Icon icon="confirm" size={50} />} onClick={onConfirm} />
                )}
            </div>
        </>
    );
};

CustomStepper.propTypes = {
    steps: PropTypes.array,
    onConfirm: PropTypes.func,
    next: PropTypes.func,
    prev: PropTypes.func,
    current: PropTypes.number,
    buttonsStyle: PropTypes.object,
}

CustomStepper.defaultProps = {
    next: () => { },
    prev: () => { },
    onConfirm: () => { },
    steps: [{
        title: 'First',
        content: 'First-content',
    }],
    current: 0
}

export default CustomStepper;