import type {SliderProps as RcSliderProps} from 'rc-slider';

import {CLEAR_MARK_STYLE} from './constants';
import type {SliderInnerState, SliderProps} from './types';

function prepareSingleValue({value, min, max}: {value?: number; min: number; max: number}) {
    if (typeof value === 'undefined' || value < min) {
        return min;
    } else if (value > max) {
        return max;
    }

    return value;
}

function prepareStartPoint({
    min,
    max,
    startPoint,
}: {
    min: number;
    max: number;
    startPoint?: number;
}) {
    if (startPoint === undefined) {
        return undefined;
    }
    return prepareSingleValue({min, max, value: startPoint});
}

function prepareArrayValue({
    value = [],
    min = 0,
    max = 100,
}: {
    min?: number;
    max?: number;
    value?: number[];
}) {
    return [
        prepareSingleValue({max, min, value: value[0]}),
        prepareSingleValue({max, min, value: value[1]}),
    ].sort((v1, v2) => v1 - v2) as [number, number];
}

function calculateMarksArray({count = 0, max, min}: {min: number; max: number; count?: number}) {
    if (!count) {
        return [];
    }
    if (max === min) {
        return [min];
    }

    if (count === 1) {
        const step = Math.abs(max - min) / 2;
        return [Math.round((min + step) * 100) / 100];
    }
    if (count > 2) {
        const points = [];
        const step = Math.abs(max - min) / (count - 1);

        for (let i = 0; i < count; i++) {
            points.push(Math.round((min + step * i) * 100) / 100);
        }
        return points;
    }
    return [min, max];
}

function createMarks({
    points,
    markFormat,
    min,
    max,
}: {
    points: number[];
    markFormat?: SliderProps['markFormat'];
    min: number;
    max: number;
}): RcSliderProps['marks'] {
    const marks: RcSliderProps['marks'] = {};

    points.forEach((point) => {
        const pointContent = markFormat ? markFormat(point) : point;
        if (point === min || point === max) {
            marks[point] = {label: pointContent, style: CLEAR_MARK_STYLE};
        } else {
            marks[point] = pointContent;
        }
    });

    return marks;
}

/**
 * Calculates the basic properties of the Slider component depending on the passed parameters
 * @returns {SliderInnerState} Properties to pass to the Slider
 */
export function prepareSliderInnerState({
    max = 100,
    min = 0,
    defaultValue,
    step,
    value,
    markFormat,
    marks,
    tooltipDisplay,
    tooltipFormat,
    startPoint,
}: {
    max: number;
    min: number;
} & Pick<
    SliderProps,
    | 'defaultValue'
    | 'step'
    | 'value'
    | 'markFormat'
    | 'marks'
    | 'tooltipDisplay'
    | 'tooltipFormat'
    | 'startPoint'
>): SliderInnerState {
    const state: SliderInnerState = {
        value,
        defaultValue: defaultValue ?? min,
        range: false,
        max,
        min,
        step,
        tooltipDisplay,
    };

    state.tooltipFormat = tooltipFormat ? tooltipFormat : markFormat;

    if (max < min) {
        state.max = min;
        state.min = max;
    }
    if (Array.isArray(marks)) {
        state.marks = createMarks({points: marks, markFormat, min: state.min, max: state.max});
    } else {
        state.marks =
            marks === 0
                ? {}
                : createMarks({
                      points: calculateMarksArray({count: marks, max, min}),
                      markFormat,
                      min,
                      max,
                  });
    }

    state.startPoint = prepareStartPoint({min: state.min, max: state.max, startPoint});

    if (defaultValue === undefined) {
        state.defaultValue = state.startPoint === undefined ? state.min : state.startPoint;
    }

    if (value === undefined) {
        const isArray = Array.isArray(state.defaultValue);
        state.range = isArray;
        state.defaultValue = isArray
            ? prepareArrayValue({
                  min: state.min,
                  max: state.max,
                  value: state.defaultValue as [number, number],
              })
            : prepareSingleValue({
                  min: state.min,
                  max: state.max,
                  value: state.defaultValue as number,
              });
    } else {
        const isArray = Array.isArray(value);
        state.range = isArray;
        state.value = isArray
            ? prepareArrayValue({min: state.min, max: state.max, value})
            : prepareSingleValue({min: state.min, max: state.max, value});
    }

    return state;
}
