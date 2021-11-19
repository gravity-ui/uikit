import React from 'react';
import {block} from '../utils/cn';
import {DOMProps, ControlProps, QAProps} from '../types';
import {useRadio} from '../utils/useRadio';

import './Radio.scss';

const b = block('radio');

export type RadioSize = 'm' | 'l';

export interface RadioProps extends ControlProps, DOMProps, QAProps {
    value: string;
    size?: RadioSize;
    content?: React.ReactNode;
    children?: React.ReactNode;
    title?: string;
}

export const Radio = React.forwardRef<HTMLLabelElement, RadioProps>(function Radio(props, ref) {
    const {size = 'm', disabled = false, content, children, title, style, className, qa} = props;
    const {checked, inputProps} = useRadio(props);
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
            <span className={b('indicator')} aria-hidden>
                <span className={b('disc')} />
                <input {...inputProps} className={b('control')} />
                <span className={b('outline')} />
            </span>
            {text && <span className={b('text')}>{text}</span>}
        </label>
    );
});
