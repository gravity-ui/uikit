import type {Cases, CasesWithName} from '../../../stories/tests-factory/models';
import {Alert} from '../Alert';
import type {AlertProps} from '../types';

export const themeCases: Array<NonNullable<AlertProps['theme']>> = [
    'normal',
    'info',
    'success',
    'warning',
    'danger',
    'utility',
    'clear',
];

export const viewCases: Cases<AlertProps['view']> = ['filled', 'outlined'];

export const layoutCases: Cases<AlertProps['layout']> = ['vertical', 'horizontal'];

export const titleCases: CasesWithName<AlertProps['title']> = [
    [
        'long content',
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    ],
];

export const messageCases: CasesWithName<AlertProps['message']> = [
    [
        'long content',
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
    ],
];

export const cornersCases: Cases<AlertProps['corners']> = ['rounded', 'square'];

export const alignCases: Cases<AlertProps['align']> = ['center', 'baseline'];

const rightActionText = 'To the right (lose the horse)';
const centerActionText = 'Straight (find a wife)';
const leftActionText = 'To the left (CC 235.2)';

/* eslint-disable react/jsx-key */
export const actionCases: CasesWithName<AlertProps['actions']> = [
    ['Full width action', <Alert.Action>{rightActionText}</Alert.Action>],
    [
        'One action',
        [
            {
                text: rightActionText,
            },
        ],
    ],
    [
        'Tree actions via array',
        [{text: leftActionText}, {text: centerActionText}, {text: rightActionText}],
    ],
];
/* eslint-enable react/jsx-key */
