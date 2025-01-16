'use client';

import * as React from 'react';

import type {QAProps} from '../types';

import {bTabList} from './constants';
import {TabContext} from './contexts/TabContext';
import {TabInnerContext} from './contexts/TabInnerContext';
import type {TabSize} from './types';

export interface TabListProps extends QAProps {
    onUpdate?: (value: string) => void;
    value?: string;
    size?: TabSize;
    contentOverflow?: 'wrap';
    className?: string;
    children?: React.ReactNode;
}

export const TabList = React.forwardRef<HTMLDivElement, TabListProps>(
    ({size = 'm', value, children, className, onUpdate, qa}, ref) => {
        const activeTabId = React.useContext(TabContext).activeTabId || value;

        const tabInnerContextValue = React.useMemo(
            () => ({onUpdate, activeTabId}),
            [onUpdate, activeTabId],
        );

        return (
            <div className={bTabList({size}, className)} data-qa={qa} ref={ref}>
                <div
                    role="tablist"
                    className={bTabList('tabs', className)}
                    aria-orientation="horizontal"
                >
                    <TabInnerContext.Provider value={tabInnerContextValue}>
                        {children}
                    </TabInnerContext.Provider>
                </div>
            </div>
        );
    },
);

TabList.displayName = 'TabList';
