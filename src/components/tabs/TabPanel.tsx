'use client';

import * as React from 'react';

import type {AriaLabelingProps, QAProps} from '../types';
import {filterDOMProps} from '../utils/filterDOMProps';

import {bTabList} from './constants';
import {TabContext} from './contexts/TabContext';

export interface TabPanelProps extends QAProps, AriaLabelingProps {
    id?: string;
    value: string;
    children: React.ReactNode;
}

export const TabPanel = (props: TabPanelProps) => {
    const {children, value, qa, id} = props;
    const {activeTabId} = React.useContext(TabContext);

    return (
        <div
            {...filterDOMProps(props, {labelable: true})}
            className={bTabList('panel', {active: activeTabId === value})}
            role="tabpanel"
            id={id}
            data-qa={qa}
        >
            {activeTabId === value ? children : null}
        </div>
    );
};
