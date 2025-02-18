'use client';

import * as React from 'react';

import {TabContext} from './contexts/TabContext';
import {useTabPanel} from './hooks/useTabPanel';
import type {TabPanelProps} from './types';

import './TabPanel.scss';

export const TabPanel = React.forwardRef<HTMLDivElement, TabPanelProps>((props, ref) => {
    const panelProps = useTabPanel(props);
    return (
        <TabContext.Provider value={undefined}>
            <div ref={ref} {...panelProps}>
                {props.children}
            </div>
        </TabContext.Provider>
    );
});

TabPanel.displayName = 'TabPanel';
