import React from 'react';

import {Button} from '../Button';
import {Flex} from '../layout';

import {bAlert} from './constants';
import type {AlertActionsProps} from './types';

export const AlertActions = ({
    items,
    children,
    parentLayout = 'vertical',
    className,
}: AlertActionsProps) => {
    return (
        <Flex
            className={bAlert('actions', {minContent: parentLayout === 'horizontal'}, className)}
            direction="row"
            gap="3"
            wrap
            alignItems={parentLayout === 'horizontal' ? 'center' : 'flex-start'}
        >
            {items?.map(({handler, text}, i) => (
                <Button key={i} onClick={handler}>
                    {text}
                </Button>
            )) || children}
        </Flex>
    );
};
