'use client';

import * as React from 'react';

import {AlertContext} from './AlertContext';

export const useAlertContext = () => {
    const context = React.useContext(AlertContext);

    if (!context) throw new Error('Alert: `useAlertContext` hook is used out of "AlertContext"');

    return context;
};
