'use client';

import * as React from 'react';

import {useRadioGroup} from '../../hooks/private';
import {Radio} from '../Radio';
import type {RadioProps, RadioSize} from '../Radio';
import type {ControlGroupOption, ControlGroupProps, DOMProps, QAProps} from '../types';
import {block} from '../utils/cn';

import './RadioGroup.scss';

const b = block('radio-group');

export type RadioGroupOption = ControlGroupOption;
export type RadioGroupSize = RadioSize;
export type RadioGroupDirection = 'vertical' | 'horizontal';

export interface RadioGroupProps extends ControlGroupProps, DOMProps, QAProps {
    size?: RadioGroupSize;
    direction?: RadioGroupDirection;
    children?:
        | React.ReactElement<RadioProps, typeof Radio>
        | React.ReactElement<RadioProps, typeof Radio>[];
    optionClassName?: string;
}

interface RadioGroupComponent
    extends React.ForwardRefExoticComponent<RadioGroupProps & React.RefAttributes<HTMLDivElement>> {
    Option: typeof Radio;
}

export const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
    function RadioGroup(props, ref) {
        const {
            size = 'm',
            direction = 'horizontal',
            style,
            className,
            optionClassName,
            qa,
            children,
        } = props;
        let options = props.options;

        if (!options) {
            options = (
                React.Children.toArray(children) as React.ReactElement<RadioProps, typeof Radio>[]
            ).map(({props}) => ({
                value: props.value,
                content: props.content || props.children,
                disabled: props.disabled,
                qa: props.qa,
            }));
        }

        const {containerProps, optionsProps} = useRadioGroup({...props, options});

        return (
            <div
                {...containerProps}
                ref={ref}
                style={style}
                className={b({size, direction}, className)}
                data-qa={qa}
            >
                {optionsProps.map((optionProps) => (
                    <Radio
                        {...optionProps}
                        key={optionProps.value}
                        className={b('option', optionClassName)}
                        size={size}
                    />
                ))}
            </div>
        );
    },
) as RadioGroupComponent;

RadioGroup.Option = Radio;
