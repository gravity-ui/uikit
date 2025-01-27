import {smokeTest, test} from '~playwright/core';

import {createSmokeScenarios} from '../../../stories/tests-factory/create-smoke-scenarios';
import type {PaletteProps} from '../Palette';

import {columnsCases, disabledCases, sizeCases} from './cases';
import {TestPalette} from './helpersPlaywright';

test.describe('Palette', {tag: '@Palette'}, () => {
    const defaultProps: PaletteProps = {};

    smokeTest('hover', async ({mount, expectScreenshot}) => {
        const root = await mount(<TestPalette {...defaultProps} />);

        await expectScreenshot();

        await root.locator('button').locator('nth=0').focus();

        await expectScreenshot({nameSuffix: 'after focus'});

        await root.locator('button').locator('nth=0').click();

        await expectScreenshot({nameSuffix: 'after click'});
    });

    smokeTest('smoke', async ({mount, expectScreenshot}) => {
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
