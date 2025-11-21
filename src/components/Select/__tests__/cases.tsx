import type {Cases, CasesWithName} from 'src/stories/tests-factory/models';

import type {SelectProps} from '../types';

export const sizeCases: Cases<SelectProps['size']> = ['s', 'm', 'l', 'xl'];

export const viewCases: Cases<SelectProps['view']> = ['normal', 'clear'];

export const pinCases: Cases<SelectProps['pin']> = [
    'round-round',
    'brick-brick',
    'clear-clear',
    'round-brick',
    'brick-round',
    'round-clear',
    'clear-round',
    'brick-clear',
    'clear-brick',
];

export const disabledCases: Cases<SelectProps['disabled']> = [true];

export const hasClearCases: Cases<SelectProps['hasClear']> = [true];

export const loadingCases: Cases<SelectProps['loading']> = [true];

export const widthCases: Cases<SelectProps['width']> = ['auto', 'max', 220];

export const popupWidthCases: Cases<SelectProps['popupWidth']> = ['fit', 260];

export const labelCases: CasesWithName<SelectProps['label']> = [['with label', 'Label']];

export const filterPlaceholderCases: Cases<SelectProps['filterPlaceholder']> = ['Search...'];

export const validationStateCases: Cases<SelectProps['validationState']> = ['invalid'];

export const baseOptions: NonNullable<SelectProps['options']> = [
    {value: 'value-1', content: 'First option'},
    {value: 'value-2', content: 'Second option'},
    {value: 'value-3', content: 'Third option'},
];

const groupedOptions: NonNullable<SelectProps['options']> = [
    {
        label: 'Group 1',
        options: [
            {value: 'group-1-value-1', content: 'Group 1 — Option 1'},
            {value: 'group-1-value-2', content: 'Group 1 — Option 2'},
        ],
    },
    {
        label: 'Group 2',
        options: [
            {value: 'group-2-value-1', content: 'Group 2 — Option 1'},
            {value: 'group-2-value-2', content: 'Group 2 — Option 2'},
        ],
    },
];

export const optionsCases: CasesWithName<SelectProps['options']> = [
    ['flat options', baseOptions],
    ['grouped options', groupedOptions],
];

export const singleValueCases: CasesWithName<SelectProps['value']> = [
    ['short value', ['value-1']],
    ['long value', ['long value with a lot of letters']],
];

export const multipleValueCases: CasesWithName<SelectProps['value']> = [
    ['two values', ['value-1', 'value-2']],
    ['three values', ['value-1', 'value-2', 'value-3']],
];

export const openCases: CasesWithName<SelectProps['open']> = [['open', true]];
