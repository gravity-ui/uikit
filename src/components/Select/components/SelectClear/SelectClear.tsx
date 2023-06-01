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
        // there is key event handler on parent button node with check for current clear node target
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events
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
