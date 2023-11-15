import React from 'react';

import {block} from '../utils/cn';

const b = block('button');

type Props = React.PropsWithChildren<{
    className?: string;
    side?: 'left' | 'right' | 'start' | 'end';
}>;

export const ButtonIcon = ({side, className, children}: Props) => {
    let sideMod = side;

    if (sideMod === 'left') {
        sideMod = 'start';
    }
    if (sideMod === 'right') {
        sideMod = 'end';
    }

    return (
        <span
            className={b(
                'icon',
                {
                    side: sideMod,
                },
                className,
            )}
        >
            <span className={b('icon-inner')}>{children}</span>
        </span>
    );
};

ButtonIcon.displayName = 'Button.Icon';
