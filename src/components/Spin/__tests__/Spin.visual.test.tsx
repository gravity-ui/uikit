import {smokeTest, test} from '~playwright/core';

import {createSmokeScenarios} from '../../../stories/tests-factory/create-smoke-scenarios';
import type {SpinProps} from '../Spin';
import {Spin} from '../Spin';

import {sizeCases} from './cases';

test.describe('Spin', {tag: '@Spin'}, () => {
    smokeTest('', async ({mount, expectScreenshot}) => {
        const defaultProps: SpinProps = {};

        const smokeScenarios = createSmokeScenarios(defaultProps, {
            size: sizeCases,
        });

        await mount(
            <div>
                {smokeScenarios.map(([title, props]) => (
                    <div key={title}>
                        <h4>{title}</h4>
                        <div>
                            <Spin {...props} />
                        </div>
                    </div>
                ))}
            </div>,
        );

        await expectScreenshot({});
    });
});
