import type {SliderProps as RcSliderProps, SliderRef as RcSliderRef} from 'rc-slider';

import type {DOMProps, QAProps} from '../types';

export type SliderSize = 's' | 'm' | 'l' | 'xl';

export type SliderValue = number | [number, number];

export type RcSliderValueType = number | number[];

export type SliderProps<ValueType = number | [number, number]> = {
    /** The value of the control */
    value?: ValueType;
    /** The control's default value, used when the component is not controlled */
    defaultValue?: ValueType;
    /** The size of the control */
    size?: SliderSize;
    /** Min value of the component */
    min?: number;
    /** Max value of the component */
    max?: number;
    /** Specifies the array of available values for the slider */
    availableValues?: number[];
    /** Value to be added or subtracted on each step the slider makes. This prop will be ignored if available values is set.  */
    step?: number;
    /** Amount of text marks under the slider. Split whole range on equal parts. Could be set >=2. This prop will be ignored if available values is set. */
    marksCount?: number;
    /** Show tooltip with current value of component or not */
    hasTooltip?: boolean;

    /** Indicates that the user cannot interact with the control */
    disabled?: boolean;
    /** Text of an error to show */
    errorMessage?: string;
    /** Describes the validation state */
    validationState?: 'invalid';

    /** Specifies the delay (in milliseconds) before the processing function is called */
    debounceDelay?: number;
    /** Fires when the control gets focus. Provides focus event as a callback's argument */
    onFocus?: (e: React.FocusEvent<HTMLDivElement>) => void;
    /** Fires when the control lost focus. Provides focus event as a callback's argument */
    onBlur?: (e: React.FocusEvent<HTMLDivElement>) => void;
    /** Fires when the slider’s value is updated by the user. Provides update event as an callback's argument */
    onUpdate?: (value: ValueType) => void;
    /** Fires when ontouchend or onmouseup is triggered. Provides update event as an callback's argument */
    onUpdateComplete?: (value: ValueType) => void;

    /** The control's autoFocus attribute */
    autoFocus?: boolean;
    /** The control's tabIndex attribute */
    tabIndex?: ValueType;
    /** Ref to Slider's component props of focus and blur */
    apiRef?: React.RefObject<BaseSliderRefType>;
} & Pick<DOMProps, 'className'> &
    QAProps;

export type SliderInnerState = {
    max: number;
    min: number;
} & Pick<RcSliderProps, 'value' | 'defaultValue' | 'step' | 'range' | 'marks'>;

export type StateModifiers = {
    size: SliderSize;
    error: boolean;
    disabled: boolean;
    hasTooltip: boolean;
    rtl: boolean;
};

export type BaseSliderRefType = RcSliderRef;
