import {createSmokeScenarios} from '@gravity-ui/playwright-tools/component-tests';

import {test} from '~playwright/core';

import {Progress} from '../Progress';

import {loadingCases, sizeCases, themeCases} from './cases';

test.describe('Progress', {tag: '@Progress'}, () => {
    test('smoke smoke', {tag: ['@smoke']}, async ({mount, expectScreenshot}) => {
        const smokeScenarios = createSmokeScenarios(
            {},
            {
                size: sizeCases,
                theme: themeCases,
                loading: loadingCases,
            },
        );

        await mount(
            <div style={{width: 400}}>
                {smokeScenarios.map(([title, props]) => (
                    <div key={title}>
                        <h4>{title}</h4>
                        <div style={{width: '200px', height: '50px'}}>
                            <Progress value={50} text="Text" {...props} />
                        </div>
                    </div>
                ))}
            </div>,
        );

        await expectScreenshot({
            themes: ['light'],
        });
    });

    test('smoke smoke, with color stops', {tag: ['@smoke']}, async ({mount, expectScreenshot}) => {
        const smokeScenarios = createSmokeScenarios(
            {},
            {
                size: sizeCases,
                loading: loadingCases,
            },
            {
                scenarioName: 'with color stops',
            },
        );

        await mount(
            <div style={{width: 400}}>
                {smokeScenarios.map(([title, props]) => (
                    <div key={title}>
                        <h4>{title}</h4>
                        <div style={{width: '200px', height: '50px'}}>
                            <Progress
                                value={50}
                                text="Text"
                                colorStops={[
                                    {theme: 'danger', stop: 20},
                                    {theme: 'warning', stop: 50},
                                    {theme: 'success', stop: 100},
                                ]}
                                {...props}
                            />
                        </div>
                    </div>
                ))}
            </div>,
        );

        await expectScreenshot({
            themes: ['light'],
        });
    });

    test('smoke smoke, with stack', {tag: ['@smoke']}, async ({mount, expectScreenshot}) => {
        const smokeScenarios = createSmokeScenarios(
            {},
            {
                size: sizeCases,
                loading: loadingCases,
            },
            {
                scenarioName: 'with stack',
            },
        );

        await mount(
            <div style={{width: 400}}>
                {smokeScenarios.map(([title, props]) => (
                    <div key={title}>
                        <h4>{title}</h4>
                        <div style={{width: '200px', height: '50px'}}>
                            <Progress
                                value={50}
                                text="Text"
                                stack={[
                                    {theme: 'default', content: 'First', value: 25},
                                    {theme: 'success', content: 'Second', value: 25},
                                    {theme: 'warning', content: 'Third', value: 25},
                                    {theme: 'danger', content: 'Fourth', value: 25},
                                ]}
                                {...props}
                            />
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
