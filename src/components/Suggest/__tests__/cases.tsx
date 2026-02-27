import type {Cases, CasesWithName} from 'src/stories/tests-factory/models';

import type {TestSuggestProps} from './helpersPlaywright';

export const sizeCases: Cases<TestSuggestProps['size']> = ['s', 'm', 'l', 'xl'];

export const pinCases: Cases<TestSuggestProps['pin']> = [
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

export const disabledCases: Cases<TestSuggestProps['disabled']> = [true];

export const hasClearCases: Cases<TestSuggestProps['hasClear']> = [true];

export const popupWidthCases: CasesWithName<TestSuggestProps['popupWidth']> = [
    ['fit', 'fit'],
    ['auto', 'auto'],
    ['number', 260],
];

export const customPopupCases: CasesWithName<TestSuggestProps['customPopup']> = [
    ['custom popup', true],
];
