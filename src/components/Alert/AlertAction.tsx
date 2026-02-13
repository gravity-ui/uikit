'use client';

import {Button} from '../Button';
import type {ButtonSize} from '../Button';

import type {AlertActionProps, AlertSize} from './types';
import {useAlertContext} from './useAlertContext';

function alertSizeToButtonSize(alertSize: AlertSize): ButtonSize {
    switch (alertSize) {
        case 's':
        case 'm':
            return 'm';
        case 'l':
        default:
            return 'l';
    }
}

export const AlertAction = (props: AlertActionProps) => {
    const {view, size} = useAlertContext();

    return (
        <Button
            view={view === 'filled' ? 'normal-contrast' : undefined}
            size={alertSizeToButtonSize(size)}
            {...props}
        />
    );
};
