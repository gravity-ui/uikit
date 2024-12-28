import type {Cases, CasesWithName} from '../../../../stories/tests-factory/models';
import type {TextAreaProps} from '../TextArea';

/* eslint-disable react/jsx-key */

export const testValue =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.";
export const valueCases: Array<TextAreaProps['value']> = [testValue];

export const disabledCases: Array<TextAreaProps['disabled']> = [true];

export const hasClearCases: Array<TextAreaProps['hasClear']> = [true];

export const validationStateCases: Array<TextAreaProps['validationState']> = ['invalid'];

export const pinCases: Cases<TextAreaProps['pin']> = [
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

export const sizeCases: Cases<TextAreaProps['size']> = ['s', 'm', 'l', 'xl'];

export const viewCases: Cases<TextAreaProps['view']> = ['normal', 'clear'];

export const noteCases: CasesWithName<TextAreaProps['note']> = [['', <div>note</div>]];

export const minRowsCases: Cases<TextAreaProps['minRows']> = [1, 3];

export const maxRowsCases: Cases<TextAreaProps['maxRows']> = [1, 3];

export const rowsCases: Cases<TextAreaProps['rows']> = [1, 3];

/* eslint-enable react/jsx-key */
