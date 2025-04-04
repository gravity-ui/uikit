import * as React from 'react';

import {bTabPanel} from '../constants';
import {TabContext} from '../contexts/TabContext';
import type {TabPanelProps} from '../types';

export function useTabPanel(
    tabPanelProps: TabPanelProps,
): React.HTMLAttributes<HTMLDivElement> & {[key: `data-${string}`]: string | undefined} {
    const tabContext = React.useContext(TabContext);

    if (!tabContext) {
        throw new Error('<TabPanel> must be used within <TabProvider>');
    }

    const currentValue = tabContext.value;
    const parentId = tabContext.id;
    const tabId = `${parentId}:t:${tabPanelProps.value}`;
    const panelId = `${parentId}:p:${tabPanelProps.value}`;

    const isSelected = currentValue === tabPanelProps.value;

    const {value: _value, qa: _qa, ...htmlProps} = tabPanelProps;

    return {
        ...htmlProps,
        role: 'tabpanel',
        'aria-labelledby': tabId,
        id: panelId,
        className: bTabPanel({hidden: !isSelected}, tabPanelProps.className),
        'data-qa': tabPanelProps.qa,
    };
}
