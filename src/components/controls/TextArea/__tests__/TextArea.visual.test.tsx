import {createSmokeScenarios} from '@gravity-ui/playwright-tools/component-tests';

import {test} from '~playwright/core';

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
});
