import type {SliderProps as RcSliderProps, SliderRef as RcSliderRef} from 'rc-slider';
import type {HandleProps} from 'rc-slider/lib/Handles/Handle';

import type {DOMProps, QAProps} from '../types';

export type SliderSize = 's' | 'm' | 'l' | 'xl';

export type SliderValue = number | [number, number];

export type RcSliderValueType = number | number[];

export type TooltipDisplayType = 'off' | 'on' | 'auto';

type FormatterType = (value: number) => string;

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
    /** Marks on the slider. It can be either the number of marks on the slider or a list of them */
    marks?: number | number[];
    /** Formatter for marks text */
    markFormat?: FormatterType;
    /** Value to be added or subtracted on each step the slider makes. This prop will be ignored if available values is set.  */
    step?: number | null;
    /** Specifies the tooltip behaviour */
    tooltipDisplay?: TooltipDisplayType;
    /** Format of the slider's value in the tooltip. Uses `markFormat` if not specified */
    tooltipFormat?: FormatterType;
    /** Indicates that the user cannot interact with the control */
    disabled?: boolean;
    /** Text of an error to show */
    errorMessage?: string;
    /** Describes the validation state */
    validationState?: 'invalid';
    /** Start point of the track. Ignored for range slider */
    startPoint?: number;
    /** Inverted view of the slider's track */
    inverted?: boolean;

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
    apiRef?: React.Ref<BaseSliderRefType>;
    'aria-label'?: string | [string, string];
    'aria-labelledby'?: string | [string, string];
    id?: string;
    /** Name attribute of the hidden input element. */
    name?: string;
    form?: string;
} & DOMProps &
    QAProps;

export type SliderInnerState = {
    max: number;
    min: number;
    value?: number | [number, number];
    defaultValue: number | [number, number];
} & Pick<RcSliderProps, 'step' | 'range' | 'marks' | 'startPoint'> &
    Pick<SliderProps, 'tooltipDisplay' | 'tooltipFormat'>;

export type StateModifiers = {
    'no-marks': boolean;
    size: SliderSize;
    error: boolean;
    disabled: boolean;
    rtl: boolean;
    'tooltip-display': SliderProps['tooltipDisplay'];
    inverted: boolean;
    'with-start-point': boolean;
};

export type BaseSliderRefType = RcSliderRef;

type RenderParams = Parameters<Exclude<HandleProps['render'], undefined>>;

export type HandleWithTooltipProps = {
    originHandle: RenderParams[0];
    originHandleProps: RenderParams[1];
    stateModifiers: StateModifiers;
} & Pick<SliderProps, 'tooltipFormat'> &
    Pick<DOMProps, 'className'>;
