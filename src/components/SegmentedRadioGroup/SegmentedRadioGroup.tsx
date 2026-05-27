'use client';

import * as React from 'react';

import {RadioGroupContext, useRadioGroup} from '../../hooks/private';
import type {ControlGroupOption, ControlGroupProps, DOMProps, QAProps} from '../types';
import {block} from '../utils/cn';

import {SegmentedRadioGroupOption as Option} from './SegmentedRadioGroupOption';

import './SegmentedRadioGroup.scss';

const b = block('segmented-radio-group');

// export type SegmentedRadioGroupOption<T extends string = string> = ControlGroupOption<T>;
export type SegmentedRadioGroupSize = 's' | 'm' | 'l' | 'xl';
export type SegmentedRadioGroupWidth = 'auto' | 'max';

export interface SegmentedRadioGroupProps<T extends string = string>
    extends ControlGroupProps<T>,
        DOMProps,
        QAProps {
    size?: SegmentedRadioGroupSize;
    width?: SegmentedRadioGroupWidth;
    children?:
        | React.ReactElement<ControlGroupOption<T>>
        | React.ReactElement<ControlGroupOption<T>>[];
}

type SegmentedRadioGroupComponentType = (<T extends string>(
    props: SegmentedRadioGroupProps<T> & {ref?: React.ForwardedRef<HTMLDivElement>},
) => React.JSX.Element) & {
    Option: typeof Option;
};

export const SegmentedRadioGroup = React.forwardRef(function SegmentedRadioGroup<T extends string>(
    props: SegmentedRadioGroupProps<T>,
    ref: React.ForwardedRef<HTMLDivElement>,
) {
    const {size = 'm', width, style, className, qa, children} = props;
    const options = props.options;

    const {containerProps, optionsProps, contextProps} = useRadioGroup({...props, options});

    return (
        <RadioGroupContext.Provider value={contextProps}>
            <div
                {...containerProps}
                ref={ref}
                style={style}
                className={b({size, width}, className)}
                data-qa={qa}
            >
                {children ||
                    optionsProps?.map((optionProps) => (
                        <Option {...optionProps} key={optionProps.value} />
                    ))}
            </div>
        </RadioGroupContext.Provider>
    );
}) as unknown as SegmentedRadioGroupComponentType;

SegmentedRadioGroup.Option = Option;
