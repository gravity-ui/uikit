'use client';

import {Flex} from '../layout';

import {AlertAction} from './AlertAction';
import {bAlert} from './constants';
import type {AlertActionsProps} from './types';
import {useAlertContext} from './useAlertContext';

export const AlertActions = ({items, children, className}: AlertActionsProps) => {
    const {layout} = useAlertContext();

    return (
        <Flex
            className={bAlert('actions', {minContent: layout === 'horizontal'}, className)}
            direction="row"
            gap="3"
            wrap
            alignItems={layout === 'horizontal' ? 'center' : 'flex-start'}
        >
            {items?.map(({handler, text}, i) => (
                <AlertAction key={i} onClick={handler}>
                    {text}
                </AlertAction>
            )) || children}
        </Flex>
    );
};
