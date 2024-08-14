import type {Cases, CasesWithName} from '../../../stories/tests-factory/models';
import type {TextProps} from '../Text';

export const colorCases: Cases<TextProps['color']> = [
    'primary',
    'complementary',
    'secondary',
    'hint',
    'info',
    'info-heavy',
    'positive',
    'positive-heavy',
    'warning',
    'warning-heavy',
    'danger',
    'danger-heavy',
    'utility',
    'utility-heavy',
    'misc',
    'misc-heavy',
    'brand',
    'link',
    'link-hover',
    'link-visited',
    'link-visited-hover',
    'dark-primary',
    'dark-complementary',
    'dark-secondary',
    'light-primary',
    'light-complementary',
    'light-secondary',
    'light-hint',
    'inverted-primary',
    'inverted-complementary',
    'inverted-secondary',
    'inverted-hint',
];
export const variantCases: Cases<TextProps['variant']> = [
    'display-4',
    'display-3',
    'display-2',
    'display-1',
    'header-2',
    'header-1',
    'subheader-3',
    'subheader-2',
    'subheader-1',
    'body-3',
    'body-2',
    'body-1',
    'body-short',
    'caption-2',
    'caption-1',
    'code-3',
    'code-inline-3',
    'code-2',
    'code-inline-2',
    'code-1',
    'code-inline-1',
];
export const ellipsisCases: Cases<TextProps['ellipsis']> = [true];
export const whiteSpaceCases: Cases<TextProps['whiteSpace']> = ['nowrap', 'break-spaces'];
export const wordBreakCases: Cases<TextProps['wordBreak']> = ['break-all', 'break-word'];
export const childrenCases: CasesWithName<string> = [
    [
        'long text',
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptates asperiores accusamus est, ab rerum harum hic delectus fuga veniam! Hic, atque, quia sunt consectetur eius corrupti, expedita sapiente exercitationem aperiam quibusdam libero ipsa veritatis quisquam! Debitis eos unde, blanditiis ipsam adipisci, soluta incidunt architecto quidem, repellat commodi tempore! Enim assumenda nam esse laudantium sequi quaerat maiores, voluptatum quibusdam temporibus nulla perspiciatis! Corrupti error aliquid iure asperiores voluptate. Nisi temporibus nesciunt quasi animi, accusamus officia debitis voluptatum ratione ullam delectus, adipisci, repellendus vitae in amet sit magni iste impedit? Exercitationem rerum impedit sed earum iusto modi et officia aspernatur quibusdam? Fugit.',
    ],
];
