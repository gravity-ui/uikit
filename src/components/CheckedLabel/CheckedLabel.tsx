import React, {forwardRef} from 'react';
import {block} from '../utils/cn';
import {Props} from './types';

import './CheckedLabel.scss';

const b = block('checked-label');

export const CheckedLabel = forwardRef<HTMLLabelElement, Props>(
    (
        {
            children,
            className,
            labelClassName,
            title,
            style,
            disabled = false,
            control,
            size = 'm',
            qa,
        },
        ref,
    ) => {
        return (
            <label
                ref={ref}
                title={title}
                style={style}
                className={b({size, disabled}, className)}
                data-qa={qa}
            >
                {control}
                {children ? <span className={b('text', labelClassName)}>{children}</span> : null}
            </label>
        );
    },
);

CheckedLabel.displayName = 'CheckedLabel';
