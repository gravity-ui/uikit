import {smokeTest, test} from '~playwright/core';

import {createSmokeScenarios} from '../../../stories/tests-factory/create-smoke-scenarios';
import type {ArrowToggleProps} from '../ArrowToggle';
import {ArrowToggle} from '../ArrowToggle';

import {directionCases, sizeCases} from './cases';

test.describe('ArrowToggle', {tag: '@ArrowToggle'}, () => {
    smokeTest('smoke', async ({mount, expectScreenshot}) => {
        const defaultProps: ArrowToggleProps = {};

        const smokeScenarios = createSmokeScenarios(defaultProps, {
            size: sizeCases,
            direction: directionCases,
        });

        await mount(
            <div>
                {smokeScenarios.map(([title, props]) => (
                    <div key={title}>
                        <h4>{title}</h4>
                        <div>
                            <ArrowToggle {...props} />
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
