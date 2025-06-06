import type {Cases, CasesWithName} from '../../../stories/tests-factory/models';
import type {PlaceholderContainerProps} from '../types';

export const sizeCases: Cases<PlaceholderContainerProps['size']> = ['s', 'm', 'l', 'promo'];
export const directionCases: Cases<PlaceholderContainerProps['direction']> = ['row', 'column'];
export const alignCases: Cases<PlaceholderContainerProps['align']> = ['left', 'center'];
export const titleCases: CasesWithName<PlaceholderContainerProps['title']> = [['none', undefined]];
export const descriptionCases: CasesWithName<PlaceholderContainerProps['description']> = [
    ['none', undefined],
];
export const contentCases: CasesWithName<PlaceholderContainerProps['content']> = [
    ['has', 'Content'],
];
export const maxWidthCases: CasesWithName<PlaceholderContainerProps['maxWidth']> = [
    ['custom', 800],
];
export const actionsCases: CasesWithName<PlaceholderContainerProps['actions']> = [
    [
        'has',
        [
            {
                text: 'Main button',
                view: 'normal',
                onClick: () => {},
            },
            {
                text: 'Additional button',
                view: 'flat-secondary',
                onClick: () => {},
            },
        ],
    ],
];
