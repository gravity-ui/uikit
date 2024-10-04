'use client';

import React from 'react';

import {useRadioGroup} from '../../hooks/private';
import type {ControlGroupOption, ControlGroupProps, DOMProps, QAProps} from '../types';
import {block} from '../utils/cn';

import {RadioButtonOption as Option} from './RadioButtonOption';

import './RadioButton.scss';

const b = block('radio-button');

export type RadioButtonOption<T extends string = string> = ControlGroupOption<T>;
export type RadioButtonSize = 's' | 'm' | 'l' | 'xl';
export type RadioButtonWidth = 'auto' | 'max';

export interface RadioButtonProps<T extends string = string>
    extends ControlGroupProps<T>,
        DOMProps,
        QAProps {
    size?: RadioButtonSize;
    width?: RadioButtonWidth;
    children?:
        | React.ReactElement<ControlGroupOption<T>>
        | React.ReactElement<ControlGroupOption<T>>[];
}

type RadioButtonComponentType = (<T extends string>(
    props: RadioButtonProps<T> & {ref?: React.ForwardedRef<HTMLDivElement>},
) => React.JSX.Element) & {
    Option: typeof Option;
};

export const RadioButton = React.forwardRef(function RadioButton<T extends string>(
    props: RadioButtonProps<T>,
    ref: React.ForwardedRef<HTMLDivElement>,
) {
    const {size = 'm', width, style, className, qa, children} = props;
    let options = props.options;

    if (!options) {
        options = (
            React.Children.toArray(children) as React.ReactElement<ControlGroupOption<T>>[]
        ).map(({props: optionProps}) => ({
            value: optionProps.value,
            content: optionProps.content || optionProps.children,
            disabled: optionProps.disabled,
            title: optionProps.title,
        }));
    }

    const {containerProps, optionsProps} = useRadioGroup({...props, options});

    return (
        <div
            {...containerProps}
            ref={ref}
            style={style}
            className={b({size, width}, className)}
            data-qa={qa}
        >
            {optionsProps.map((optionProps) => (
                <Option {...optionProps} key={optionProps.value} />
            ))}
        </div>
    );
}) as unknown as RadioButtonComponentType;

RadioButton.Option = Option;
