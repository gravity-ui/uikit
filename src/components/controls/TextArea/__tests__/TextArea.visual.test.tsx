import {createSmokeScenarios} from '@gravity-ui/playwright-tools/component-tests';
import {expect} from '@playwright/experimental-ct-react';
import type {Locator} from '@playwright/test';

import {test} from '~playwright/core';

import {CONTROL_ERROR_ICON_QA} from '../../utils';
import type {TextAreaProps} from '../TextArea';
import {TextArea} from '../TextArea';

import {
    disabledCases,
    hasClearCases,
    maxRowsCases,
    minRowsCases,
    noteCases,
    pinCases,
    rowsCases,
    sizeCases,
    testValue,
    validationStateCases,
    valueCases,
    viewCases,
} from './cases';

async function expectEndPaddingAndSeparation(textArea: Locator) {
    const control = textArea.locator('.g-text-area__control');
    const icon = textArea.locator('.g-text-area__error-icon-wrap');
    const [controlRect, clearRect, iconCount, styles] = await Promise.all([
        control.boundingBox(),
        textArea.locator('.g-text-area__clear').boundingBox(),
        icon.count(),
        control.evaluate((element) => {
            const computed = getComputedStyle(element);
            return {
                direction: computed.direction,
                paddingInlineEnd: parseFloat(computed.paddingInlineEnd),
                scrollbarWidth: (element as HTMLTextAreaElement).offsetWidth - element.clientWidth,
            };
        }),
    ]);
    const iconRect = iconCount ? await icon.boundingBox() : null;

    if (!controlRect || !clearRect || (iconCount && !iconRect)) {
        throw new Error('TextArea control, clear button or error icon is not visible');
    }

    const rects = iconRect ? [clearRect, iconRect] : [clearRect];
    const occupiedEnd =
        styles.direction === 'rtl'
            ? Math.max(...rects.map((rect) => rect.x + rect.width)) - controlRect.x
            : controlRect.x + controlRect.width - Math.min(...rects.map((rect) => rect.x));

    expect(styles.paddingInlineEnd + styles.scrollbarWidth).toBeGreaterThanOrEqual(occupiedEnd);

    if (iconRect) {
        if (styles.direction === 'rtl') {
            expect(iconRect.x + iconRect.width).toBeLessThanOrEqual(clearRect.x);
        } else {
            expect(clearRect.x + clearRect.width).toBeLessThanOrEqual(iconRect.x);
        }
    }
}

test.describe('TextArea', {tag: '@TextArea'}, () => {
    const defaultProps: TextAreaProps = {
        placeholder: 'Placeholder',
    };

    const commonPropCases = {
        pin: pinCases,
        size: sizeCases,
        view: viewCases,
        rows: rowsCases,
        minRows: minRowsCases,
        maxRows: maxRowsCases,
        note: noteCases,
        hasClear: hasClearCases,
        disabled: disabledCases,
        validationState: validationStateCases,
    } as const;

    test('smoke empty', {tag: ['@smoke']}, async ({mount, expectScreenshot}) => {
        const smokeScenarios = createSmokeScenarios(defaultProps, commonPropCases);

        await mount(
            <div>
                {smokeScenarios.map(([title, props]) => (
                    <div key={title}>
                        <h4>{title}</h4>
                        <div>
                            <TextArea {...props} />
                        </div>
                    </div>
                ))}
            </div>,
        );

        await expectScreenshot({
            themes: ['light'],
        });
    });

    test('smoke with value', {tag: ['@smoke']}, async ({mount, expectScreenshot}) => {
        const smokeScenarios = createSmokeScenarios(
            {
                ...defaultProps,
                value: testValue,
            },
            commonPropCases,
        );

        await mount(
            <div>
                {smokeScenarios.map(([title, props]) => (
                    <div key={title}>
                        <h4>{title}</h4>
                        <div>
                            <TextArea {...props} />
                        </div>
                    </div>
                ))}
            </div>,
        );

        await expectScreenshot({
            themes: ['light'],
        });
    });

    test('smoke with error', {tag: ['@smoke']}, async ({mount, expectScreenshot}) => {
        const smokeScenarios = createSmokeScenarios(
            {
                ...defaultProps,
                validationState: 'invalid',
                errorMessage: 'Test error message',
            } as const,
            {
                value: valueCases,
            },
        );

        await mount(
            <div>
                {smokeScenarios.map(([title, props]) => (
                    <div key={title}>
                        <h4>{title}</h4>
                        <div>
                            <TextArea {...props} />
                        </div>
                    </div>
                ))}
            </div>,
        );

        await expectScreenshot({
            themes: ['light'],
        });
    });

    test('keeps empty wrapping placeholder visible', async ({mount, page}) => {
        await mount(
            <div style={{width: 160}}>
                <TextArea placeholder="Long placeholder that wraps across multiple lines" />
            </div>,
        );

        const textarea = page.getByRole('textbox');

        await test.expect
            .poll(() =>
                textarea.evaluate((element) => element.scrollHeight <= element.clientHeight),
            )
            .toBe(true);
    });

    test('keeps empty minRows height without a placeholder', async ({mount, page}) => {
        await mount(
            <div>
                <TextArea />
                <TextArea minRows={3} />
                <TextArea minRows={3} placeholder="Placeholder" />
            </div>,
        );

        const oneRow = page.getByRole('textbox').nth(0);
        const emptyMinRows = page.getByRole('textbox').nth(1);
        const placeholderMinRows = page.getByRole('textbox').nth(2);

        const [oneRowHeight, emptyMinRowsHeight, placeholderMinRowsHeight] = await Promise.all([
            oneRow.evaluate((element) => element.clientHeight),
            emptyMinRows.evaluate((element) => element.clientHeight),
            placeholderMinRows.evaluate((element) => element.clientHeight),
        ]);

        test.expect(emptyMinRowsHeight).toBeGreaterThan(oneRowHeight);
        test.expect(emptyMinRowsHeight).toBe(placeholderMinRowsHeight);
    });

    test('clamps minRows to maxRows before first input', async ({mount, page}) => {
        await mount(<TextArea minRows={5} maxRows={3} />);

        const textarea = page.getByRole('textbox');

        await test.expect(textarea).toHaveAttribute('rows', '3');
        await textarea.fill('v');

        await test.expect(textarea).toHaveAttribute('rows', '3');
    });

    test(
        'smoke inside error placement tooltip',
        {tag: ['@smoke']},
        async ({mount, page, expectScreenshot}) => {
            const props: TextAreaProps = {
                ...defaultProps,
                value: 'Text',
                validationState: 'invalid',
                errorMessage: 'Test error message',
                errorPlacement: 'inside',
            };

            const root = await mount(
                <div style={{width: 250}}>
                    <TextArea {...props} />
                </div>,
                {
                    width: 500,
                },
            );

            await root.getByTestId(CONTROL_ERROR_ICON_QA).hover();

            const popup = page.locator('.g-popup');
            await expect(popup).toBeVisible();
            await expect(popup).toContainText('Test error message');

            await expectScreenshot({
                themes: ['light'],
            });
        },
    );

    test(
        'smoke inside error placement with clear and sizes/views',
        {tag: ['@smoke']},
        async ({mount, expectScreenshot}) => {
            const smokeScenarios = createSmokeScenarios(
                {
                    ...defaultProps,
                    value: 'Text',
                    validationState: 'invalid',
                    errorMessage: 'Test error message',
                    errorPlacement: 'inside',
                    hasClear: true,
                } as const,
                {
                    size: sizeCases,
                    view: viewCases,
                },
            );

            const root = await mount(
                <div>
                    {smokeScenarios.map(([title, props]) => (
                        <div key={title}>
                            <h4>{title}</h4>
                            <div>
                                <TextArea {...props} />
                            </div>
                        </div>
                    ))}
                </div>,
            );

            for (const textArea of await root.locator('.g-text-area').all()) {
                await expectEndPaddingAndSeparation(textArea);
            }

            await expectScreenshot({
                themes: ['light'],
            });
        },
    );

    test('clear view reserves space for clear button and inside error', async ({
        mount,
        expectScreenshot,
    }) => {
        const value = 'A long value that should wrap before the controls at the end of the line';
        const root = await mount(
            <div data-qa="clear-layout-cases" style={{display: 'grid', gap: 16, width: 260}}>
                <TextArea view="clear" rows={3} value={value} hasClear />
                <TextArea
                    view="clear"
                    rows={3}
                    value={value}
                    hasClear
                    validationState="invalid"
                    errorMessage="Test error message"
                    errorPlacement="inside"
                />
                <div dir="rtl">
                    <TextArea
                        view="clear"
                        rows={3}
                        value={value}
                        hasClear
                        validationState="invalid"
                        errorMessage="Test error message"
                        errorPlacement="inside"
                    />
                </div>
            </div>,
        );

        for (const textArea of await root.locator('.g-text-area').all()) {
            await expectEndPaddingAndSeparation(textArea);
        }

        await expectScreenshot({
            locator: root.locator('[data-qa="clear-layout-cases"]'),
            themes: ['light'],
        });
    });

    test(
        'smoke inside error placement with clear and scrollbar',
        {tag: ['@smoke']},
        async ({mount, expectScreenshot}) => {
            const value = Array.from({length: 6}, (_, index) => `Line ${index + 1}`).join('\n');
            const root = await mount(
                <div style={{width: 250}}>
                    {(['s', 'm', 'l', 'xl'] as const).map((size) => (
                        <div key={size}>
                            <h4>{size}</h4>
                            <TextArea
                                size={size}
                                rows={2}
                                value={value}
                                hasClear
                                validationState="invalid"
                                errorMessage="Test error message"
                                errorPlacement="inside"
                            />
                        </div>
                    ))}
                </div>,
            );

            for (const textArea of await root.locator('.g-text-area').all()) {
                const control = textArea.locator('textarea');
                await expect
                    .poll(() =>
                        control.evaluate((element) => element.scrollHeight > element.clientHeight),
                    )
                    .toBe(true);
                await expect(textArea).toHaveClass(/g-text-area_has-scrollbar/);

                await expectEndPaddingAndSeparation(textArea);
            }

            await expectScreenshot({themes: ['light']});
        },
    );
});
