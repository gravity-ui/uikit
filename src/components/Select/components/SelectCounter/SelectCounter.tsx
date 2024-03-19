import React from 'react';

import {Text} from '../../../Text';
import {block} from '../../../utils/cn';
import type {SelectCounterProps} from '../../types';

import './SelectCounter.scss';

const b = block('select-counter');

export const SelectCounter = React.forwardRef(function SelectCouner(
    {count, size, className}: SelectCounterProps,
    ref: React.ForwardedRef<HTMLDivElement>,
) {
    return (
        <div className={b({size}, className)} ref={ref}>
            <Text variant={size === 'xl' ? 'body-2' : 'body-1'} className={b('text')}>
                {count}
            </Text>
        </div>
    );
});
