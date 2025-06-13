import * as React from 'react';

import {Select} from '..';
import type {SelectOption, SelectOptionGroup, SelectProps, SelectRenderControlProps} from '..';
import {act, render} from '../../../../test-utils/utils';
import {MobileProvider} from '../../mobile';
import {selectControlBlock, selectControlButtonBlock, selectListBlock} from '../constants';

export const OptionsListType = {
    FLAT: 'flat',
    GROUPED: 'grouped',
} as const;
export const TEST_QA = 'select-test-qa';
export const SELECT_CONTROL_OPEN_CLASS = selectControlBlock({open: true});
export const SELECT_CONTROL_BUTTON_OPEN_CLASS = selectControlButtonBlock({open: true});
export const SELECT_CONTROL_BUTTON_ERROR_CLASS = selectControlButtonBlock({error: true});
export const SELECT_LIST_VIRTUALIZED_CLASS = selectListBlock({virtualized: true});
export const DEFAULT_OPTIONS = generateOptions([
    ['js', 'JavaScript'],
    ['python', 'Python'],
    ['ruby', 'Ruby'],
]);
export const GROUPED_OPTIONS: SelectOptionGroup[] = [
    {label: 'Group 1', options: DEFAULT_OPTIONS.slice(0, 2)},
    {label: 'Group 2', options: DEFAULT_OPTIONS.slice(2)},
];
export const QUICK_SEARCH_OPTIONS = generateOptions(40);
export const GROUPED_QUICK_SEARCH_OPTIONS: SelectOptionGroup[] = [
    {label: 'Group 1', options: generateOptions(40).slice(0, 20)},
    {label: 'Group 2', options: generateOptions(40).slice(20)},
];

export const ControlledSelect = (props: Partial<SelectProps>) => {
    const {options = DEFAULT_OPTIONS, value, onUpdate, ...restProps} = props;
    const [stateValue, setStateValue] = React.useState(value || []);

    const handleUpdate = (nextValue: string[]) => {
        onUpdate?.(nextValue);
        setStateValue(nextValue);
    };

    return (
        <Select
            {...restProps}
            qa={TEST_QA}
            options={options}
            value={stateValue}
            onUpdate={handleUpdate}
        />
    );
};

export const setup = (props: Partial<SelectProps> = {}, mobile?: boolean) => {
    const utils = render(
        <MobileProvider mobile={Boolean(mobile)}>
            <ControlledSelect {...props} />
        </MobileProvider>,
    );
    return utils;
};

export const timeout = (ms: number) => {
    // https://testing-library.com/docs/react-testing-library/api/#act
    // https://reactjs.org/docs/test-utils.html#act
    return act(async () => {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    });
};

export function generateOptions(args: number | [string, string][]): SelectOption[] {
    if (typeof args === 'number') {
        return Array.from({length: args}, (_, i) => ({
            value: `val${i + 1}`,
            content: `Value ${i + 1}`,
        }));
    }

    return args.map(([value, content]) => ({value, content}));
}

export const generateOptionsGroups = (
    groupsCount: number,
    optionsCount: number,
): SelectOptionGroup[] => {
    return Array.from({length: groupsCount}, (_, i) => ({
        label: `Group ${i + 1}`,
        options: generateOptions(optionsCount),
    }));
};

export const renderControl = (args: SelectRenderControlProps) => {
    const {onClear, triggerProps, ref} = args;
    return (
        <div>
            <button {...triggerProps} ref={ref as React.RefObject<HTMLButtonElement>}></button>
            <button onClick={onClear}>Clear</button>
        </div>
    );
};
