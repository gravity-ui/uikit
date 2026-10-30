import {createSmokeScenarios} from '@gravity-ui/playwright-tools/component-tests';

import {test} from '~playwright/core';

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

    test('smoke', {tag: ['@smoke']}, async ({mount, expectScreenshot}) => {
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
                <div>
                    <h4>[multiline]</h4>
                    <div style={{width: 160}}>
                        <Radio
                            value="multiline"
                            content="A radio label that wraps onto multiple lines"
                        />
                    </div>
                </div>
            </div>,
        );

        await expectScreenshot({});
    });

    test('smoke disabled', {tag: ['@smoke']}, async ({mount, expectScreenshot}) => {
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

    test('smoke default checked', {tag: ['@smoke']}, async ({mount, expectScreenshot}) => {
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
