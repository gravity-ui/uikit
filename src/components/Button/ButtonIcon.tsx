import React from 'react';

import {block} from '../utils/cn';

const b = block('button');

type Props = React.PropsWithChildren<{
    className?: string;
    side?: 'start' | 'end';
}>;

export const ButtonIcon = ({side, className, children}: Props) => {
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
