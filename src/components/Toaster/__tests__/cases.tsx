import type {Cases, CasesWithName} from '../../../stories/tests-factory/models';
import type {ToastProps} from '../types';

export const titleCases: Cases<ToastProps['title']> = ['Title'];
export const themeCases: Cases<ToastProps['theme']> = [
    'normal',
    'info',
    'success',
    'warning',
    'danger',
    'utility',
];
export const isClosableCases: Cases<ToastProps['isClosable']> = [true];
export const actionsCases: CasesWithName<ToastProps['isClosable']> = [
    [
        'one action',
        [
            {
                onClick: () => {},
                label: 'one action',
            },
        ],
    ],
    [
        'two actions',
        [
            {
                onClick: () => {},
                label: 'one action',
            },
            {
                onClick: () => {},
                label: 'two action',
            },
        ],
    ],
];
