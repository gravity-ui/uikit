import type {Cases, CasesWithName} from '../../../stories/tests-factory/models';
import type {NumberInputProps} from '../NumberInput';

/* eslint-disable react/jsx-key */

export const disabledCases: Array<NumberInputProps['disabled']> = [true];

export const hasClearCases: Array<NumberInputProps['hasClear']> = [true];

export const pinCases: Cases<NumberInputProps['pin']> = [
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

export const validationStateCases: Cases<NumberInputProps['validationState']> = ['invalid'];

export const sizeCases: Cases<NumberInputProps['size']> = ['s', 'm', 'l', 'xl'];

export const viewCases: Cases<NumberInputProps['view']> = ['normal', 'clear'];

export const errorPlacementCases: Cases<NumberInputProps['errorPlacement']> = ['outside', 'inside'];

export const startContentCases: CasesWithName<NumberInputProps['startContent']> = [
    ['', <div>start</div>],
];

export const endContentCases: CasesWithName<NumberInputProps['endContent']> = [
    ['', <div>end</div>],
];

export const noteCases: CasesWithName<NumberInputProps['note']> = [['', <div>note</div>]];

export const labelCases: CasesWithName<NumberInputProps['label']> = [['', 'label']];

/* eslint-enable react/jsx-key */
