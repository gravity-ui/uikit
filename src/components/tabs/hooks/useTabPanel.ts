import * as React from 'react';

import {filterDOMProps} from '../../utils/filterDOMProps';
import {bTabPanel} from '../constants';
import {TabContext} from '../contexts/TabContext';
import type {TabPanelProps} from '../types';

export function useTabPanel(tabPanelProps: TabPanelProps) {
    const tabContextProps = React.useContext(TabContext);

    if (!tabContextProps) {
        throw new Error('<TabPanel> must be used within <TabProvider>');
    }

    const currentValue = tabContextProps.value;
    const parentId = tabContextProps.id;
    const tabId = `${parentId}:t:${tabPanelProps.value}`;
    const panelId = `${parentId}:p:${tabPanelProps.value}`;

    const isSelected = currentValue === tabPanelProps.value;

    return {
        role: 'tabpanel',
        'aria-labelledby': tabId,
        id: panelId,
        style: tabPanelProps.style,
        className: bTabPanel({hidden: !isSelected}, tabPanelProps.className),
        'data-qa': tabPanelProps.qa,
        ...filterDOMProps(tabPanelProps, {labelable: true}),
    };
}
