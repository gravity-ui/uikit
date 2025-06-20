'use client';

import * as React from 'react';

import {useForkRef} from '../../hooks';
import {useRadio} from '../../hooks/private';
import type {ControlProps} from '../types';
import {block} from '../utils/cn';
import {isIcon, isSvg} from '../utils/common';

import {
    SegmentedRadioGroupContextStable,
    SegmentedRadioGroupContextValue,
} from './SegmentedRadioGroupContext';

const b = block('segmented-radio-group');

export interface SegmentedRadioGroupOptionProps<ValueType extends string = string>
    extends ControlProps {
    value: ValueType;
    content?: React.ReactNode;
    children?: React.ReactNode;
    title?: string;
}

type SegmentedRadioGroupOptionComponentType = <T extends string = string>(
    props: SegmentedRadioGroupOptionProps<T>,
) => React.JSX.Element;

export const SegmentedRadioGroupOption = React.forwardRef(function SegmentedRadioGroupOption<
    T extends string,
>(props: SegmentedRadioGroupOptionProps<T>, ref: React.ForwardedRef<HTMLLabelElement>) {
    const {
        name,
        disabled: disabledContext,
        ref: contextRef,
        onChange,
    } = React.useContext(SegmentedRadioGroupContextStable);
    const {currentValue} = React.useContext(SegmentedRadioGroupContextValue);
    const {disabled: disabledProp, content, children, title, value} = props;
    const disabled = disabledProp || disabledContext;
    const {checked, inputProps} = useRadio({
        ...props,
        name,
        disabled,
        checked: value === currentValue,
        onChange,
    });
    const inner = content || children;
    const icon = isIcon(inner) || isSvg(inner);

    const labelRef = useForkRef(ref, contextRef);

    return (
        <label
            className={b('option', {
                disabled,
                checked,
            })}
            ref={labelRef}
            title={title}
        >
            <input {...inputProps} className={b('option-control')} />
            {inner && <span className={b('option-text', {icon})}>{inner}</span>}
        </label>
    );
}) as unknown as SegmentedRadioGroupOptionComponentType;
