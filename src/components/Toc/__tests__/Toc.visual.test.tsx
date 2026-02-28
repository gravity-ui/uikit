import {smokeTest, test} from '~playwright/core';

import {createSmokeScenarios} from '../../../stories/tests-factory/create-smoke-scenarios';
import type {TocProps} from '../Toc';

import {TestToc} from './helpers';

test.describe('Toc', {tag: '@Toc'}, () => {
    smokeTest('', async ({mount, expectScreenshot}) => {
        const smokeScenarios = createSmokeScenarios<Partial<TocProps>>(
            {
                value: 'control',
            },
            {},
        );

        await mount(
            <div>
                {smokeScenarios.map(([title, props]) => (
                    <div key={title}>
                        <h4>{title}</h4>
                        <div>
                            <TestToc {...props} />
                        </div>
                    </div>
                ))}
            </div>,
        );

        await expectScreenshot({
            themes: ['light'],
        });
    });

    createSmokeScenarios<Partial<TocProps>>({}, {}).forEach(([title, props]) => {
        smokeTest(`${title}-hover`, async ({mount, expectScreenshot}) => {
            const root = await mount(<TestToc {...props} />);

            await root.getByText('Disk controls').hover();

            await expectScreenshot({
                nameSuffix: 'hovered',
                themes: ['light'],
            });
        });
    });
});
