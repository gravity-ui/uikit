import {smokeTest, test} from '~playwright/core';

import {createSmokeScenarios} from '../../../stories/tests-factory/create-smoke-scenarios';
import type {RadioProps} from '../Radio';
import {Radio} from '../Radio';

import {sizeCases} from './cases';

test.describe('Radio', {tag: '@Radio'}, () => {
    const defaultProps: RadioProps = {
        children: 'Test',
        value: '1',
    };

    const commonPropsCases = {
        size: sizeCases,
    } as const;

    smokeTest('', async ({mount, expectScreenshot}) => {
        const smokeScenarios = createSmokeScenarios<RadioProps>(defaultProps, {
            ...commonPropsCases,
        });

        await mount(
            <div>
                {smokeScenarios.map(([title, props]) => (
                    <div key={title}>
                        <h4>{title}</h4>
                        <div>
                            <Radio {...props} />
                        </div>
                    </div>
                ))}
            </div>,
        );

        await expectScreenshot({});
    });

    smokeTest('disabled', async ({mount, expectScreenshot}) => {
        const smokeScenarios = createSmokeScenarios<RadioProps>(
            {
                ...defaultProps,
                disabled: true,
            },
            {
                ...commonPropsCases,
            },
        );

        await mount(
            <div>
                {smokeScenarios.map(([title, props]) => (
                    <div key={title}>
                        <h4>{title}</h4>
                        <div>
                            <Radio {...props} />
                        </div>
                    </div>
                ))}
            </div>,
        );

        await expectScreenshot({});
    });

    smokeTest('default checked', async ({mount, expectScreenshot}) => {
        const smokeScenarios = createSmokeScenarios<RadioProps>(
            {
                ...defaultProps,
                defaultChecked: true,
            },
            {
                ...commonPropsCases,
            },
        );

        await mount(
            <div>
                {smokeScenarios.map(([title, props]) => (
                    <div key={title}>
                        <h4>{title}</h4>
                        <div>
                            <Radio {...props} />
                        </div>
                    </div>
                ))}
            </div>,
        );

        await expectScreenshot({});
    });
});
