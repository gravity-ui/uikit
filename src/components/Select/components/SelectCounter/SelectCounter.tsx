import React from 'react';

import {Text} from '../../../Text';
import {block} from '../../../utils/cn';
import type {SelectCounterProps} from '../../types';

import './SelectCounter.scss';

const b = block('select-counter');

export function SelectCounter({count, size, disabled}: SelectCounterProps) {
    return (
        <div className={b({size})}>
            <Text
                variant={size === 'xl' ? 'body-2' : 'body-1'}
                color={disabled ? 'hint' : 'primary'}
                className={b('text')}
            >
                {count}
            </Text>
        </div>
    );
}
