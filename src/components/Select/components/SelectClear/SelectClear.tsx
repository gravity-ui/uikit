import React from 'react';

import {Icon} from '../../../Icon';
import {CrossIcon} from '../../../icons/CrossIcon';
import {selectClearBlock} from '../../constants';
import type {SelectClearProps} from '../../types';

import './SelectClear.scss';

export const SelectClear = (props: SelectClearProps) => {
    const {size, onClick, onMouseEnter, onMouseLeave, renderClearIcon} = props;
    const icon = renderClearIcon ? (
        renderClearIcon()
    ) : (
        <Icon className={selectClearBlock('clear')} data={CrossIcon} />
    );
    return (
        <div
            className={selectClearBlock({size})}
            role="button"
            tabIndex={0}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            {icon}
        </div>
    );
};

SelectClear.displayName = 'SelectClear';
