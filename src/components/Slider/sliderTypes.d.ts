import type {SliderProps as RcSliderProps, SliderRef as RcSliderRef} from 'rc-slider';

import type {DOMProps, QAProps} from '../types';

export type SliderSize = 's' | 'm' | 'l' | 'xl';

export type SliderValue = number | [number, number];

export type RcSliderValueType = number | number[];

export type SliderProps<ValueType = number | [number, number]> = {
    value?: ValueType;
    defaultValue?: ValueType;
    size: SliderSize;
    min?: number;
    max?: number;
    step?: number;
    //не используется, если есть availableValues
    infoPointCount?: number;
    availableValues?: number[];

    disabled?: boolean;
    keyboard?: boolean;
    error?: boolean;

    debounceDelay?: number;
    onFocus?: (e: React.FocusEvent<HTMLDivElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLDivElement>) => void;
    onChange?: (value: ValueType) => void;
    onChangeComplete?: (value: ValueType) => void;

    autoFocus?: boolean;
    tabIndex?: ValueType;
} & Pick<DOMProps, 'className'> &
    QAProps;

export type SliderInnerState = {
    max: number;
    min: number;
} & Pick<RcSliderProps, 'value' | 'defaultValue' | 'step' | 'range' | 'marks'>;

export type StyleModifiers = {
    size: SliderSize;
    error: boolean;
    disabled: boolean;
};

export type BaseSliderRefType = RcSliderRef;
