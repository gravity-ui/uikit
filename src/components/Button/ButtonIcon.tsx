import React, {PropsWithChildren} from 'react';
import {block} from '../utils/cn';

const b = block('button');

type Props = PropsWithChildren<{
    className?: string;
    side?: 'start' | 'end';
}>;

const sidePropMap: Record<Required<Props>['side'], string> = {
    start: 'left',
    end: 'right',
};

export const ButtonIcon = ({side, className, children}: Props) => {
    return (
        <span
            className={b(
                'icon',
                {
                    side: side && sidePropMap[side],
                },
                className,
            )}
        >
            <span className={b('icon-inner')}>{children}</span>
        </span>
    );
};

ButtonIcon.displayName = 'Button.Icon';
