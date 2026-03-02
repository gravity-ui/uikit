import {createSmokeScenarios} from '@gravity-ui/playwright-tools/component-tests';

import {test} from '~playwright/core';

import type {PaletteProps} from '../Palette';

import {columnsCases, disabledCases, sizeCases} from './cases';
import {TestPalette} from './helpersPlaywright';

test.describe('Palette', {tag: '@Palette'}, () => {
    const defaultProps: PaletteProps = {};

    test('smoke hover', {tag: ['@smoke']}, async ({mount, expectScreenshot}) => {
        const root = await mount(<TestPalette {...defaultProps} />);

        await expectScreenshot();

        await root.locator('button').locator('nth=0').focus();

        await expectScreenshot({name: 'after focus'});

        await root.locator('button').locator('nth=0').click();

        await expectScreenshot({name: 'after click'});
    });

    test('smoke smoke', {tag: ['@smoke']}, async ({mount, expectScreenshot}) => {
        const smokeScenarios = createSmokeScenarios(
            defaultProps,
            {
                size: sizeCases,
                columns: columnsCases,
                disabled: disabledCases,
            },
            {},
        );

        await mount(
            <div>
                {smokeScenarios.map(([title, props]) => (
                    <div key={title}>
                        <h4>{title}</h4>
                        <div>
                            <TestPalette {...props} />
                        </div>
                    </div>
                ))}
            </div>,
        );

        await expectScreenshot({
            themes: ['light'],
        });
    });
});
