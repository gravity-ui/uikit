import React from 'react';

import {block} from '../utils/cn';

const b = block('button');

type Props = React.PropsWithChildren<{
    className?: string;
    side?: 'left' | 'right' | 'start' | 'end';
}>;

export const ButtonIcon = ({side, className, children}: Props) => {
    if (side === 'left') {
        side = 'start';
    }
    if (side === 'right') {
        side = 'end';
    }

    return (
        <span
            className={b(
                'icon',
                {
                    side,
                },
                className,
            )}
        >
            <span className={b('icon-inner')}>{children}</span>
        </span>
    );
};

ButtonIcon.displayName = 'Button.Icon';
