import { Icon } from '@blueprintjs/core';
import React, { useCallback, useMemo, useState } from 'react';
import CustomTabs from '../../Components/CustomTabs'
import Requests from './Requests'
import Services from './Services'
import Products from './Products'
import Offices from './Offices'

const Administration = () => {
    const [currentTab, setCurrentTab] = useState('products');
    const onSelectTab = useCallback((e) => {
        setCurrentTab(e)
    }, []);

    const tabs = useMemo(() => [
        { name: 'requests', title: <Icon icon="numbered-list" />, children: <Requests /> },
        { name: 'offices', title: <Icon icon="office" />, children: <Offices /> },
        { name: 'services', title: <Icon icon="cog" />, children: <Services currentTab={currentTab} /> },
        { name: 'products', title: <Icon icon="shopping-cart" />, children: <Products currentTab={currentTab} /> },
    ], [currentTab]);

    return <CustomTabs onSelectTab={onSelectTab} tabs={tabs} defaultTab={tabs[1].name} />;
}

export default Administration;