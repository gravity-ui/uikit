import * as React from 'react';

import {b} from '../../constants';

type ColorPointerProps = {
    left?: string | number;
    top?: string | number;
    transform?: string;
};

export const ColorPointer = React.forwardRef<HTMLButtonElement, ColorPointerProps>(
    ({left, top, transform}, ref) => (
        <button
            ref={ref}
            className={b('color-pointer')}
            style={{
                left,
                top,
                transform,
            }}
            tabIndex={-1}
        />
    ),
);

ColorPointer.displayName = 'ColorPointer';
