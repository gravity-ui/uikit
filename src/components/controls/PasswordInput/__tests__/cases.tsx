import type {Cases, CasesWithName} from '../../../../stories/tests-factory/models';
import type {PasswordInputProps} from '../PasswordInput';

/* eslint-disable react/jsx-key */

export const disabledCases: Array<PasswordInputProps['disabled']> = [true];

export const hasClearCases: Array<PasswordInputProps['hasClear']> = [true];

export const pinCases: Cases<PasswordInputProps['pin']> = [
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

export const errorPlacementCases: Cases<PasswordInputProps['errorPlacement']> = [
    'outside',
    'inside',
];

export const validationStateCases: Cases<PasswordInputProps['validationState']> = ['invalid'];

export const sizeCases: Cases<PasswordInputProps['size']> = ['s', 'm', 'l', 'xl'];

export const viewCases: Cases<PasswordInputProps['view']> = ['normal', 'clear'];

export const startContentCases: CasesWithName<PasswordInputProps['startContent']> = [
    ['', <div>start</div>],
];

export const endContentCases: CasesWithName<PasswordInputProps['endContent']> = [
    ['', <div>end</div>],
];

export const noteCases: CasesWithName<PasswordInputProps['note']> = [['', <div>note</div>]];

export const labelCases: CasesWithName<PasswordInputProps['label']> = [['', 'label']];

export const hideCopyButtonCases: Cases<PasswordInputProps['hideCopyButton']> = [true];
export const hideRevealButtonCases: Cases<PasswordInputProps['hideRevealButton']> = [true];
export const revealValueCases: Cases<PasswordInputProps['revealValue']> = [true];
/* eslint-enable react/jsx-key */
