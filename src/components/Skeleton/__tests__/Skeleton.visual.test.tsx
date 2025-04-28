import {smokeTest, test} from '~playwright/core';

import {createSmokeScenarios} from '../../../stories/tests-factory/create-smoke-scenarios';
import type {SkeletonProps} from '../Skeleton';
import {Skeleton} from '../Skeleton';

test.describe('Skeleton', {tag: '@Skeleton'}, () => {
    smokeTest('', async ({mount, expectScreenshot}) => {
        const defaultProps: SkeletonProps = {
            className: '',
            style: {
                width: '30px',
                height: '30px',
            },
        };
        const smokeScenarios = createSmokeScenarios(
            defaultProps,
            {
                animation: [
                    ['gradient', 'gradient'],
                    ['pulse', 'pulse'],
                    ['none', 'none'],
                ],
            },
            {scenarioName: 'smoke'},
        );

        await mount(
            <div style={{width: 400}}>
                {smokeScenarios.map(([title, props]) => (
                    <div key={title}>
                        <h4>{title}</h4>
                        <div>
                            <Skeleton {...props} />
                        </div>
                    </div>
                ))}
            </div>,
        );

        await expectScreenshot({});
    });
});
