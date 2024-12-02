'use client';

import React from 'react';

import {useRadio} from '../../hooks/private';
import type {ControlProps} from '../types';
import {block} from '../utils/cn';
import {isIcon, isSvg} from '../utils/common';

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
    const {disabled = false, content, children, title} = props;
    const {checked, inputProps} = useRadio(props);
    const inner = content || children;
    const icon = isIcon(inner) || isSvg(inner);

    return (
        <label
            className={b('option', {
                disabled,
                checked,
            })}
            ref={ref}
            title={title}
        >
            <input {...inputProps} className={b('option-control')} />
            {inner && <span className={b('option-text', {icon})}>{inner}</span>}
        </label>
    );
}) as unknown as SegmentedRadioGroupOptionComponentType;
