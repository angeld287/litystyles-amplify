import { Icon } from '@blueprintjs/core';
import React, { useCallback, useMemo } from 'react';
import CustomTabs from '../../Components/CustomTabs'
import Requests from './Requests'
import Services from './Services'

const Administration = () => {
    const onSelectTab = useCallback((e) => {
        console.log(e)
    }, []);

    const tabs = useMemo(() => [
        { name: 'requests', iconTitle: <Icon icon="numbered-list" />, children: <Requests /> },
        { name: 'offices', iconTitle: <Icon icon="office" />, children: '' },
        { name: 'services', iconTitle: <Icon icon="cog" />, children: <Services /> },
        { name: 'products', iconTitle: <Icon icon="shopping-cart" />, children: '' },
    ], []);

    return <CustomTabs onSelectTab={onSelectTab} tabs={tabs} />;
}

export default Administration;