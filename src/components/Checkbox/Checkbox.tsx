import React from 'react';
import {block} from '../utils/cn';
import {ControlProps, DOMProps, QAProps} from '../types';
import {useCheckbox} from '../utils/useCheckbox';
import {Icon} from '../Icon';

import tickIcon from '../../../assets/icons/checkbox-tick.svg';
import dashIcon from '../../../assets/icons/checkbox-dash.svg';

import './Checkbox.scss';

export type CheckboxSize = 'm' | 'l';

export interface CheckboxProps extends ControlProps, DOMProps, QAProps {
    size?: CheckboxSize;
    content?: React.ReactNode;
    children?: React.ReactNode;
    title?: string;
}

const b = block('checkbox');

export const Checkbox = React.forwardRef<HTMLLabelElement, CheckboxProps>(function Checkbox(
    props,
    ref,
) {
    const {
        size = 'm',
        indeterminate,
        disabled = false,
        content,
        children,
        title,
        style,
        className,
        qa,
    } = props;
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
                    indeterminate,
                    checked,
                },
                className,
            )}
            data-qa={qa}
        >
            <span className={b('indicator')}>
                <span className={b('icon')} aria-hidden>
                    {indeterminate ? (
                        <Icon data={dashIcon} className={b('icon-svg', {type: 'dash'})} />
                    ) : (
                        <Icon data={tickIcon} className={b('icon-svg', {type: 'tick'})} />
                    )}
                </span>
                <input {...inputProps} className={b('control')} />
                <span className={b('outline')} />
            </span>
            {text && <span className={b('text')}>{text}</span>}
        </label>
    );
});
