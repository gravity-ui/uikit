import type {Cases, CasesWithName} from '../../../stories/tests-factory/models';
import type {UserProps} from '../types';

export const sizeCases: Cases<UserProps['size']> = ['xs', 's', 'm', 'l', 'xl'];

export const avatarCases: CasesWithName<UserProps['avatar']> = [['empty', undefined]];
export const nameCases: CasesWithName<UserProps['name']> = [
    ['empty', undefined],
    [
        'very long',
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    ],
];
export const descriptionCases: CasesWithName<UserProps['description']> = [
    ['empty', undefined],
    [
        'very long',
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    ],
];
