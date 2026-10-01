import * as React from 'react';

import {block} from '../utils/cn';

import type {Props} from './types';

import './ControlLabel.scss';

const b = block('control-label');

/**
 * Wrap with label for `<Checkbox/>`, `<Radio/>`, `<Switch/>`
 */
export const ControlLabel = React.forwardRef<HTMLLabelElement, Props>(
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
        const clonedControl = React.cloneElement(control, {
            className: b('indicator', control.props.className),
        });

        return (
            <label
                ref={ref}
                title={title}
                style={style}
                className={b({size, disabled}, className)}
                data-qa={qa}
            >
                {clonedControl}
                {children ? <span className={b('text', labelClassName)}>{children}</span> : null}
            </label>
        );
    },
);

ControlLabel.displayName = 'ControlLabel';
