import type {Cases, CasesWithName} from '../../../stories/tests-factory/models';
import type {UserLabelProps} from '../types';

export const sizeCases: Cases<UserLabelProps['size']> = ['xs', 's', 'm', 'l', 'xl'];

export const viewCases: Cases<UserLabelProps['view']> = ['outlined', 'clear'];

export const typeCases: Cases<UserLabelProps['type']> = ['person', 'email', 'empty'];

export const textCases: CasesWithName<UserLabelProps['text']> = [
    [
        'long label',
        'Charles DarwinCharles DarwinCharles DarwinCharles DarwinCharles DarwinCharles DarwinCharles DarwinCharles DarwinCharles DarwinCharles DarwinCharles DarwinCharles DarwinCharles DarwinCharles DarwinCharles DarwinCharles DarwinCharles DarwinCharles DarwinCharles DarwinCharles DarwinCharles DarwinCharles DarwinCharles DarwinCharles DarwinCharles DarwinCharles DarwinCharles DarwinCharles DarwinCharles DarwinCharles DarwinCharles DarwinCharles DarwinCharles DarwinCharles DarwinCharles DarwinCharles DarwinCharles DarwinCharles DarwinCharles DarwinCharles DarwinCharles DarwinCharles DarwinCharles DarwinCharles DarwinCharles DarwinCharles DarwinCharles DarwinCharles DarwinCharles DarwinCharles DarwinCharles DarwinCharles DarwinCharles DarwinCharles DarwinCharles DarwinCharles DarwinCharles DarwinCharles DarwinCharles DarwinCharles DarwinCharles DarwinCharles DarwinCharles DarwinCharles DarwinCharles DarwinCharles DarwinCharles DarwinCharles DarwinCharles DarwinCharles DarwinCharles DarwinCharles DarwinCharles DarwinCharles DarwinCharles DarwinCharles DarwinCharles DarwinCharles DarwinCharles DarwinCharles DarwinCharles DarwinCharles DarwinCharles DarwinCharles DarwinCharles DarwinCharles DarwinCharles DarwinCharles DarwinCharles DarwinCharles DarwinCharles DarwinCharles DarwinCharles DarwinCharles DarwinCharles DarwinCharles DarwinCharles DarwinCharles DarwinCharles DarwinCharles Darwin',
    ],
];

export const onCloseClickCases: CasesWithName<UserLabelProps['onCloseClick']> = [
    ['closable', () => {}],
];

export const onClickCases: CasesWithName<UserLabelProps['onClick']> = [['clickable', () => {}]];
