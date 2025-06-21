'use client';

import {AlertAction} from './AlertAction';
import {bAlert} from './constants';
import type {AlertActionsProps} from './types';
import {useAlertContext} from './useAlertContext';

export const AlertActions = ({items, children, className}: AlertActionsProps) => {
    const {actionsLayout} = useAlertContext();

    return (
        <div className={bAlert('actions', {[actionsLayout]: true}, className)}>
            {items?.map(({handler, text}, i) => (
                <AlertAction key={i} onClick={handler}>
                    {text}
                </AlertAction>
            )) || children}
        </div>
    );
};
