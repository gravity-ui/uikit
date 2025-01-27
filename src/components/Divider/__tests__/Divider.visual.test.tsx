import {smokeTest, test} from '~playwright/core';

import {createSmokeScenarios} from '../../../stories/tests-factory/create-smoke-scenarios';
import type {DividerProps} from '../Divider';

import {orientationCases} from './cases';
import {ListWithDivider} from './helpers';

test.describe('Divider', {tag: '@Divider'}, () => {
    smokeTest('smoke', async ({mount, expectScreenshot}) => {
        const defaultProps: DividerProps = {};

        const smokeScenarios = createSmokeScenarios(defaultProps, {
            orientation: orientationCases,
        });

        await mount(
            <div>
                {smokeScenarios.map(([title, props]) => (
                    <div key={title}>
                        <h4>{title}</h4>
                        <div>
                            <ListWithDivider {...props} />
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
