'use client';

import * as React from 'react';

import {useTabPanel} from './hooks/useTabPanel';
import type {TabPanelProps} from './types';

import './TabPanel.scss';

export const TabPanel = React.forwardRef<HTMLDivElement, TabPanelProps>((props, ref) => {
    const panelProps = useTabPanel(props);
    return (
        <div ref={ref} {...panelProps}>
            {props.children}
        </div>
    );
});

TabPanel.displayName = 'TabPanel';
