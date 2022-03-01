import { Icon } from '@blueprintjs/core';
import React, { useCallback, useMemo, useState } from 'react';
import CustomTabs from '../../Components/CustomTabs'
import Requests from './Requests'
import Services from './Services'
import Products from './Products'

const Administration = () => {
    const [currentTab, setCurrentTab] = useState('products');
    const onSelectTab = useCallback((e) => {
        setCurrentTab(e)
    }, []);

    const tabs = useMemo(() => [
        { name: 'requests', iconTitle: <Icon icon="numbered-list" />, children: <Requests /> },
        { name: 'offices', iconTitle: <Icon icon="office" />, children: '' },
        { name: 'services', iconTitle: <Icon icon="cog" />, children: <Services currentTab={currentTab} /> },
        { name: 'products', iconTitle: <Icon icon="shopping-cart" />, children: <Products currentTab={currentTab} /> },
    ], [currentTab]);

    return <CustomTabs onSelectTab={onSelectTab} tabs={tabs} />;
}

export default Administration;