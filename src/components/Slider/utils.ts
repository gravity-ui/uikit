import type {SliderProps as RcSliderProps} from 'rc-slider';

import {CLEAR_MARK_STYLE} from './constants';
import type {SliderInnerState, SliderProps} from './sliderTypes';

function prepareSingleValue({value, min, max}: {value?: number; min: number; max: number}) {
    if (typeof value === 'undefined' || value < min) {
        return min;
    } else if (value > max) {
        return max;
    }

    return value;
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

function calculateInfoPoints({count = 0, max, min}: {min: number; max: number; count?: number}) {
    if (max === min) {
        return [min];
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

export function getMarksFromInfoPoints({
    infoPointsCount,
    max,
    min,
}: {
    infoPointsCount: number;
    min: number;
    max: number;
}): RcSliderProps['marks'] {
    const marks: RcSliderProps['marks'] = {
        [min]: {label: min, style: {left: 0, transform: 'translateX(0)'}},
        [max]: {label: max, style: {transform: 'translateX(-100%)'}},
    };
    if (infoPointsCount > 2) {
        const step = Math.abs(max - min) / (infoPointsCount - 1);
        if (step === 0) {
            marks[min] = min;
        } else {
            for (let i = 0; i < infoPointsCount; i++) {
                const point = Math.round((min + step * i) * 100) / 100;
                marks[point] = point;
            }
        }
    }
    return marks;
}

function createMarks(points: number[]): RcSliderProps['marks'] {
    const marks: RcSliderProps['marks'] = {};

    const lastIndex = points.length - 1;
    points.forEach((point, i) => {
        if (i === 0) {
            marks[point] = {label: point, style: CLEAR_MARK_STYLE};
        } else if (i === lastIndex) {
            marks[point] = {label: point, style: CLEAR_MARK_STYLE};
        } else {
            marks[point] = point;
        }
    });

    return marks;
}

export function getInnerState({
    max = 100,
    min = 0,
    availableValues,
    defaultValue,
    infoPointCount,
    step,
    value,
}: {
    max: number;
    min: number;
    availableValues: SliderProps['availableValues'];
    defaultValue: SliderProps['defaultValue'];
    infoPointCount: SliderProps['infoPointCount'];
    step: SliderProps['step'];
    value: SliderProps['value'];
}): SliderInnerState {
    const state: SliderInnerState = {
        value,
        defaultValue,
        range: false,
        max,
        min,
        marks: undefined,
        step,
    };

    if (max < min) {
        state.max = min;
        state.min = max;
    }

    if (availableValues && availableValues.length > 0) {
        //can select only available values
        state.step = null;

        const sortedAvailableValues = Array.from(new Set(availableValues)).sort(
            (v1, v2) => v1 - v2,
        );
        state.min = sortedAvailableValues[0];
        state.max = sortedAvailableValues[sortedAvailableValues.length - 1];
        state.marks = createMarks(sortedAvailableValues);
    } else {
        state.marks = createMarks(calculateInfoPoints({count: infoPointCount, max, min}));
    }

    if (value && Array.isArray(value)) {
        state.range = true;
        state.value = prepareArrayValue({min: state.min, max: state.max, value});
    } else if (defaultValue && Array.isArray(defaultValue)) {
        state.range = true;
        state.defaultValue = prepareArrayValue({
            min: state.min,
            max: state.max,
            value: defaultValue,
        });
    } else if (value) {
        state.value = prepareSingleValue({min: state.min, max: state.max, value});
    } else {
        state.defaultValue = prepareSingleValue({
            min: state.min,
            max: state.max,
            value: defaultValue,
        });
    }

    return state;
}
