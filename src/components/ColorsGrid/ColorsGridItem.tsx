import React from 'react';

import {Check} from '@gravity-ui/icons';

import {useActionHandlers} from '../../hooks/useActionHandlers';
import {Icon} from '../Icon';
import {useTheme} from '../theme';
import {blockNew} from '../utils/cn';

import {Color, getContrastColor} from './utils';

const b = blockNew('colors-grid');

export interface ColorsGridItemProps {
    color: Color;
    selected: boolean;
    onClick?(event: React.UIEvent): void;
}

export function ColorsGridItem({color, selected, onClick}: ColorsGridItemProps) {
    const theme = useTheme();

    const isClickable = Boolean(onClick);
    const isVoid = !color;
    const style = {
        backgroundColor: color || undefined,
        color: selected ? getContrastColor(color, theme) : undefined,
    };

    const {onKeyDown} = useActionHandlers(onClick);

    return (
        <div
            role={isClickable ? 'button' : undefined}
            tabIndex={isClickable ? 0 : undefined}
            style={style}
            className={b('item', {void: isVoid, active: selected})}
            onClick={onClick}
            onKeyDown={onKeyDown}
        >
            {!isVoid && selected && <Icon className={b('check')} size={40} data={Check} />}
        </div>
    );
}
