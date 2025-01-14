'use client';

import {Button} from '../Button';

import type {AlertActionProps} from './types';
import {useAlertContext} from './useAlertContext';

export const AlertAction = (props: AlertActionProps) => {
    const {view} = useAlertContext();

    return <Button view={view === 'filled' ? 'normal-contrast' : undefined} {...props} />;
};
