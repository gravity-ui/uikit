'use client';

import React from 'react';

import type {QAProps} from '../types';

import {bTabList} from './constants';
import {TabContext} from './contexts/TabContext';
export interface TabPanelProps extends QAProps {
    value: string;
    children: React.ReactNode;
}

export const TabPanel = ({children, value, qa}: TabPanelProps) => {
    const {activeTabId} = React.useContext(TabContext);

    return (
        <div
            className={bTabList('panel', {active: activeTabId === value})}
            role="tabpanel"
            id={`panel-${value}`}
            aria-labelledby={`tab-${value}`}
            data-qa={qa}
        >
            {activeTabId === value ? children : null}
        </div>
    );
};
