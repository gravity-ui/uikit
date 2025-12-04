import type {Cases, CasesWithName} from '../../../../stories/tests-factory/models';
import type {TextInputProps} from '../TextInput';

/* eslint-disable react/jsx-key */

export const disabledCases: Array<TextInputProps['disabled']> = [true];

export const hasClearCases: Array<TextInputProps['hasClear']> = [true];

export const pinCases: Cases<TextInputProps['pin']> = [
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

export const validationStateCases: Cases<TextInputProps['validationState']> = ['invalid'];

export const sizeCases: Cases<TextInputProps['size']> = ['s', 'm', 'l', 'xl'];

export const viewCases: Cases<TextInputProps['view']> = ['normal', 'clear'];

export const errorPlacementCases: Cases<TextInputProps['errorPlacement']> = ['outside', 'inside'];

export const startContentCases: CasesWithName<TextInputProps['startContent']> = [
    ['', <div>start</div>],
];

export const endContentCases: CasesWithName<TextInputProps['endContent']> = [['', <div>end</div>]];

export const noteCases: CasesWithName<TextInputProps['note']> = [['', <div>note</div>]];

export const labelCases: CasesWithName<TextInputProps['label']> = [['', 'label']];

/* eslint-enable react/jsx-key */
