import {smokeTest, test} from '~playwright/core';

import {createSmokeScenarios} from '../../../stories/tests-factory/create-smoke-scenarios';
import {Dialog} from '../Dialog';
import type {DialogProps} from '../Dialog';
import type {DialogBodyProps} from '../DialogBody/DialogBody';
import type {DialogFooterProps} from '../DialogFooter/DialogFooter';
import type {DialogHeaderProps} from '../DialogHeader/DialogHeader';

import {
    bodyContentCases,
    bodyHasBorderCases,
    footerLoadingCases,
    footerPresetCases,
    footerShowErrorCases,
    footerTextButtonApplyCases,
    footerTextButtonCancelCases,
    headerCaptionCases,
    headerInsertAfterCases,
    headerInsertBeforeCases,
    sizeCases,
} from './cases';

interface AllDialogProps {
    size?: DialogProps['size'];

    headerCaption?: DialogHeaderProps['caption'];
    headerInsertBefore?: DialogHeaderProps['insertBefore'];
    headerInsertAfter?: DialogHeaderProps['insertAfter'];

    bodyHasBorder?: DialogBodyProps['hasBorders'];
    bodyContent?: DialogBodyProps['children'];

    footerShowError?: DialogFooterProps['showError'];
    footerPreset?: DialogFooterProps['preset'];
    footerLoading?: DialogFooterProps['loading'];
    footerTextButtonCancel?: DialogFooterProps['textButtonCancel'];
    footerTextButtonApply?: DialogFooterProps['textButtonApply'];
}

test.describe('Dialog', {tag: '@Dialog'}, () => {
    createSmokeScenarios(
        {
            size: 's',

            headerCaption: 'Dialog.Header',

            bodyContent: 'Dialog.Body',

            footerTextButtonApply: 'apply',
            footerTextButtonCancel: 'cancel',
        } as AllDialogProps,
        {
            size: sizeCases,

            headerCaption: headerCaptionCases,
            headerInsertBefore: headerInsertBeforeCases,
            headerInsertAfter: headerInsertAfterCases,

            bodyHasBorder: bodyHasBorderCases,
            bodyContent: bodyContentCases,

            footerShowError: footerShowErrorCases,
            footerPreset: footerPresetCases,
            footerLoading: footerLoadingCases,
            footerTextButtonCancel: footerTextButtonCancelCases,
            footerTextButtonApply: footerTextButtonApplyCases,
        },
    ).forEach(([title, props]) => {
        smokeTest(title, async ({page, mount, expectScreenshot}) => {
            await page.setViewportSize({width: 1000, height: 600});

            const {
                size,
                headerCaption,
                headerInsertBefore,
                headerInsertAfter,
                bodyHasBorder,
                bodyContent,
                footerLoading,
                footerPreset,
                footerShowError,
                footerTextButtonCancel,
                footerTextButtonApply,
            } = props;

            await mount(
                <Dialog size={size} onClose={() => {}} open onEnterKeyDown={() => {}}>
                    {(headerCaption || headerInsertBefore || headerInsertAfter) && (
                        <Dialog.Header
                            caption={headerCaption}
                            insertAfter={headerInsertAfter}
                            insertBefore={headerInsertBefore}
                        />
                    )}
                    <Dialog.Body hasBorders={bodyHasBorder}>{bodyContent}</Dialog.Body>
                    <Dialog.Footer
                        loading={footerLoading}
                        preset={footerPreset}
                        showError={footerShowError}
                        textButtonApply={footerTextButtonApply}
                        textButtonCancel={footerTextButtonCancel}
                        errorText="Error text"
                    />
                </Dialog>,
            );

            await expectScreenshot({
                component: page,
                themes: ['light'],
            });
        });
    });
});
