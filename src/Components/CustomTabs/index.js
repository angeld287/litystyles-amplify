import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import PropTypes from 'prop-types'
import ErrorBoundary from "../ErrorBoundary";

const CustomTabs = ({ onSelectTab, tabs }) => {
    return (
        <div align="center" style={{ marginTop: 5 }}>
            <Tabs defaultActiveKey={tabs[3].name} id="controlled-tab" onSelect={e => onSelectTab(e)}>
                {
                    tabs.map((tab) =>
                        <Tab key={'tab_' + tab.name} eventKey={tab.name} title={tab.iconTitle} style={{ margin: 5 }}>
                            <div style={{ marginTop: 5 }}>
                                <ErrorBoundary>
                                    {tab.children}
                                </ErrorBoundary>
                            </div>
                        </Tab>
                    )
                }
            </Tabs>
        </div>
    );
}

CustomTabs.propTypes = {
    onSelectTab: PropTypes.func,
    tabs: PropTypes.array,
}

export default React.memo(CustomTabs);