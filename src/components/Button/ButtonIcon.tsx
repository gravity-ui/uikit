import React, {PropsWithChildren} from 'react';
import {block} from '../utils/cn';

import './Button.scss';

const b = block('button');

type Props = PropsWithChildren<{
    side?: 'start' | 'end';
}>;

const sidePropMap: Record<Required<Props>['side'], string> = {
    start: 'left',
    end: 'right',
};

export const ButtonIcon = ({side, children}: Props) => {
    return (
        <span
            className={b('icon', {
                side: side && sidePropMap[side],
            })}
        >
            <span className={b('icon-inner')}>{children}</span>
        </span>
    );
};

ButtonIcon.displayName = 'Button.Icon';
