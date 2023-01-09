import React from 'react';

import {ControlLabel} from '../ControlLabel';
import type {ControlLabelSize} from '../ControlLabel';
import type {ControlProps, DOMProps, QAProps} from '../types';
import {block} from '../utils/cn';
import {useCheckbox} from '../utils/useCheckbox';

import './Switch.scss';

const b = block('switch');

export type SwitchSize = ControlLabelSize;

export interface SwitchProps extends ControlProps, DOMProps, QAProps {
    size?: SwitchSize;
    content?: React.ReactNode;
    children?: React.ReactNode;
    title?: string;
}

export const Switch = React.forwardRef<HTMLLabelElement, SwitchProps>(function Switch(props, ref) {
    const {size = 'm', disabled = false, content, children, title, style, className, qa} = props;
    const {checked, inputProps} = useCheckbox(props);
    const text = content || children;

    const control = (
        <span className={b('indicator')}>
            <input {...inputProps} className={b('control')} />
            <span className={b('outline')} />
            <span className={b('slider')} />
        </span>
    );

    return (
        <ControlLabel
            ref={ref}
            title={title}
            style={style}
            size={size}
            disabled={disabled}
            className={b(
                {
                    size,
                    disabled,
                    checked,
                },
                className,
            )}
            labelClassName={b('text')}
            qa={qa}
            control={control}
        >
            {text}
        </ControlLabel>
    );
});
