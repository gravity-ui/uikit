import type {Cases, CasesWithName} from '../../../stories/tests-factory/models';
import type {DialogProps} from '../Dialog';
import type {DialogBodyProps} from '../DialogBody/DialogBody';
import type {DialogFooterProps} from '../DialogFooter/DialogFooter';
import type {DialogHeaderProps} from '../DialogHeader/DialogHeader';

export const sizeCases: Cases<DialogProps['size']> = ['s', 'm', 'l'];

/* eslint-disable react/jsx-key */

export const headerCaptionCases: CasesWithName<DialogHeaderProps['caption']> = [
    [
        'long',
        <div>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
            has been the industrys standard dummy text ever since the 1500s, when an unknown printer
            took a galley of type and scrambled it to make a type specimen book.{' '}
        </div>,
    ],
];
export const headerInsertBeforeCases: CasesWithName<DialogHeaderProps['insertBefore']> = [
    ['true', <div>insertBefore</div>],
];
export const headerInsertAfterCases: CasesWithName<DialogHeaderProps['insertAfter']> = [
    ['true', <div>insertAfter</div>],
];

export const bodyHasBorderCases: Cases<DialogBodyProps['hasBorders']> = [true];
export const bodyContentCases: CasesWithName<DialogBodyProps['children']> = [
    [
        'long',
        <div>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
            has been the industrys standard dummy text ever since the 1500s, when an unknown printer
            took a galley of type and scrambled it to make a type specimen book.{' '}
        </div>,
    ],
];

export const footerShowErrorCases: Cases<DialogFooterProps['showError']> = [true];
export const footerPresetCases: Cases<DialogFooterProps['preset']> = [
    'default',
    'success',
    'danger',
];
export const footerLoadingCases: Cases<DialogFooterProps['loading']> = [true];
export const footerTextButtonCancelCases: Cases<DialogFooterProps['textButtonCancel']> = [
    'Custom button cancel',
];
export const footerTextButtonApplyCases: Cases<DialogFooterProps['textButtonApply']> = [
    'Custom button apply',
];

/* eslint-enabled react/jsx-key */
