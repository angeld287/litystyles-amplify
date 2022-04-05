import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types'
import { Select } from "antd";


const CustomSelect = ({ id, dataTestId, items, onChange, defaultValue, getItemsNextToken, placeHolder, disabled }) => {
    const [loading, setLoading] = useState(false);

    const options = items !== undefined ? items.map(_ => { return <Select.Option key={_.id}>{_.name}</Select.Option> }) : [];

    const onScroll = async (event) => {
        var target = event.target
        if (!loading && getItemsNextToken !== undefined && Math.round(target.scrollTop + target.offsetHeight) === target.scrollHeight) {
            setLoading(true);
            await getItemsNextToken();
            setLoading(false);
        }
    }

    const onSearch = async (e) => {
        var filteredItems = items.filter(_ => _.name.toLowerCase().indexOf(e.toLowerCase()) !== -1).length
        if (!loading && getItemsNextToken !== undefined && filteredItems < 4) {
            setLoading(true);
            await getItemsNextToken();
            setLoading(false);
        }
    }

    const _dvalue = useMemo(() => typeof defaultValue === "string" ? defaultValue : () => {
        if (typeof defaultValue === "object" && defaultValue !== null) {
            if (defaultValue.items !== undefined && defaultValue.items.length > 0) {
                const obj = defaultValue.items[0];
                const field = Object.keys(obj).find(_ => obj[_] !== null && obj[_].id !== undefined);
                return field !== undefined ? obj[field].id : null
            } else {
                return defaultValue.id;
            }

        } else {
            return null;
        }
    }, [defaultValue]);

    return <Select
        id={id}
        data-testid={dataTestId}
        loading={loading}
        showSearch
        onSearch={onSearch}
        style={{ width: '100%' }}
        placeholder={placeHolder}
        defaultValue={_dvalue !== undefined && _dvalue !== "" ? _dvalue : null}
        defaultActiveFirstOption={false}
        onChange={onChange}
        optionFilterProp="children"
        disabled={disabled}
        onPopupScroll={onScroll}
        filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        filterSort={(optionA, optionB) => (optionA.children !== undefined && optionB.children !== undefined) ? optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase()) : []}
    >
        {!loading ? options : [...options, <Select.Option key="loading">Loading...</Select.Option>]}
    </Select>;
}

CustomSelect.propTypes = {
    id: PropTypes.string,
    dataTestId: PropTypes.string,
    items: PropTypes.array,
    defaultValue: PropTypes.any,
    onChange: PropTypes.func,
    placeHolder: PropTypes.string,
    loading: PropTypes.bool,
    getItemsNextToken: PropTypes.func,
    disabled: PropTypes.bool,
}

CustomSelect.defaultProps = {
    items: [],
    placeholder: 'Nombre del Campo',
    defaultValue: null,
    disabled: false,
}

export default CustomSelect;