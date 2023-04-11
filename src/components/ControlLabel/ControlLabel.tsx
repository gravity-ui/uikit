import React, {forwardRef} from 'react';
import {block} from '../utils/cn';
import {Props} from './types';

import './ControlLabel.scss';

const b = block('control-label');

/**
 * Wrap with label for `<Checkbox/>`, `<Radio/>`, `<Switch/>`
 */
export const ControlLabel = forwardRef<HTMLLabelElement, Props>(
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
                <span className={b('indicator')}>{control}</span>
                {children ? <span className={b('text', labelClassName)}>{children}</span> : null}
            </label>
        );
    },
);

ControlLabel.displayName = 'ControlLabel';
