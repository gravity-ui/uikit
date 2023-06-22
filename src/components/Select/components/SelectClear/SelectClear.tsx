import React from 'react';

import {Icon} from '../../../Icon';
import {CrossIcon} from '../../../icons/CrossIcon';
import {selectClearBlock} from '../../constants';
import type {SelectClearProps} from '../../types';

import './SelectClear.scss';

export const SelectClear = (props: SelectClearProps) => {
    const {size, onClick, onMouseEnter, onMouseLeave, renderIcon} = props;
    const icon = renderIcon ? (
        renderIcon()
    ) : (
        <Icon className={selectClearBlock('clear')} data={CrossIcon} />
    );
    return (
        <button
            className={selectClearBlock({size})}
            aria-label="Clear"
            tabIndex={0}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            {icon}
        </button>
    );
};

SelectClear.displayName = 'SelectClear';
