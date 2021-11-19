import React from 'react';
import {block} from '../utils/cn';
import {DOMProps, ControlProps, QAProps} from '../types';
import {useCheckbox} from '../utils/useCheckbox';

import './Switch.scss';

const b = block('switch');

export type SwitchSize = 'm' | 'l';

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

    return (
        <label
            ref={ref}
            title={title}
            style={style}
            className={b(
                {
                    size,
                    disabled,
                    checked,
                },
                className,
            )}
            data-qa={qa}
        >
            <span className={b('indicator')}>
                <input {...inputProps} className={b('control')} />
                <span className={b('outline')} />
                <span className={b('slider')} />
            </span>
            {text && <span className={b('text')}>{text}</span>}
        </label>
    );
});
