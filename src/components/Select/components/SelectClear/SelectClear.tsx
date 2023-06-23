import React from 'react';

import {Icon} from '../../../Icon';
import {CrossIcon} from '../../../icons/CrossIcon';
import {SelectQa, selectClearBlock} from '../../constants';
import i18n from '../../i18n';
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
            aria-label={i18n('label_clear')}
            tabIndex={0}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            data-qa={SelectQa.CLEAR}
        >
            {icon}
        </button>
    );
};

SelectClear.displayName = 'SelectClear';
