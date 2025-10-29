import * as React from 'react';

import {b} from '../../constants';

type ColorPointerProps = {
    left?: string | number;
    top?: string | number;
    transform: string;
} & React.HTMLAttributes<HTMLDivElement>;

export const ColorPointer = React.forwardRef<HTMLDivElement, ColorPointerProps>(
    ({left, top, transform, ...props}, ref) => (
        <div
            {...props}
            ref={ref}
            className={b('color-pointer')}
            style={{
                left,
                top,
                transform,
                ...props.style,
            }}
        />
    ),
);

ColorPointer.displayName = 'ColorPointer';
