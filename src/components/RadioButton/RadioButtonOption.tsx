import React from 'react';
import {block} from '../utils/cn';
import {ControlProps} from '../types';
import {useRadio} from '../utils/useRadio';

const b = block('radio-button');

export interface RadioButtonOptionProps extends ControlProps {
    value: string;
    content?: React.ReactNode;
    children?: React.ReactNode;
}

export const RadioButtonOption = React.forwardRef<HTMLLabelElement, RadioButtonOptionProps>(
    function RadioButtonOption(props, ref) {
        const {disabled = false, content, children} = props;
        const {checked, inputProps} = useRadio(props);
        const text = content || children;

        return (
            <label
                className={b('option', {
                    disabled,
                    checked,
                })}
                ref={ref}
            >
                <input {...inputProps} className={b('option-control')} />
                <span className={b('option-outline')} />
                {text && (
                    <span className={b('option-text')}>
                        {typeof text === 'string' ? (
                            text
                        ) : (
                            <span className={b('option-aligner')}>{text}</span>
                        )}
                    </span>
                )}
            </label>
        );
    },
);
