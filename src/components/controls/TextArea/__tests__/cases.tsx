import React from 'react';

import type {Cases, CasesWithName} from '../../../../stories/tests-factory/models';
import type {TextAreaProps} from '../TextArea';

/* eslint-disable react/jsx-key */

export const defaultValueCases: Array<TextAreaProps['defaultValue']> = ['Default value'];

export const hasClearCases: Array<TextAreaProps['hasClear']> = [true];

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

export const errorPlacementCases: Cases<TextAreaProps['errorPlacement']> = ['outside', 'inside'];

export const noteCases: CasesWithName<TextAreaProps['note']> = [['', <div>note</div>]];

export const minRowsCases: Cases<TextAreaProps['minRows']> = [1, 3];

export const maxRowsCases: Cases<TextAreaProps['maxRows']> = [1, 3];

export const rowsCases: Cases<TextAreaProps['rows']> = [1, 3];

/* eslint-enable react/jsx-key */
