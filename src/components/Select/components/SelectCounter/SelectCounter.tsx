import React from 'react';

import {block} from '../../../utils/cn';
import type {SelectCounterProps} from '../../types';

import './SelectCounter.scss';

const b = block('select-counter');

export const SelectCounter = React.forwardRef(function SelectCouner(
    {count, size}: SelectCounterProps,
    ref: React.ForwardedRef<HTMLDivElement>,
) {
    return (
        <div className={b({size})} ref={ref}>
            {count}
        </div>
    );
});
