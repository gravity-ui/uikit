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

        const smokeScenarios = createSmokeScenarios(defaultProps, {});

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

    test('with animation disabled', async ({mount, expectScreenshot}) => {
        await mount(
            <div style={{width: 400}}>
                <div>
                    <h4>Animation disabled</h4>
                    <div>
                        <Skeleton
                            style={{
                                width: '30px',
                                height: '30px',
                            }}
                            isAnimated={false}
                        />
                    </div>
                </div>
            </div>,
        );

        await expectScreenshot({});
    });
});
