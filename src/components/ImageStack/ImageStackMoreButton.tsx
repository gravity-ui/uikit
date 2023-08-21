import React from 'react';

import {Button, type ButtonProps} from '../Button';

type Props = Pick<ButtonProps, 'size' | 'onClick'> & {
    count: number;
    'aria-label': string;
};

export const ImageStackMoreButton = ({
    size = 's',
    onClick,
    count,
    'aria-label': ariaLabel,
}: Props) => {
    return (
        <Button
            size={size}
            pin={'circle-circle'}
            onClick={onClick}
            extraProps={{'aria-label': ariaLabel}}
        >
            <Button.Icon>+{count}</Button.Icon>
        </Button>
    );
};

ImageStackMoreButton.displayName = 'ImageStack.MoreButton';
