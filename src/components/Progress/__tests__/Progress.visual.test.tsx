import React from 'react';

import {test} from '~playwright/core';

import {createSmokeScenarios} from '../../../stories/tests-factory/create-smoke-scenarios';
import {Progress} from '../Progress';

import {loadingCases, sizeCases, themeCases} from './cases';

test.describe('Progress', {tag: '@Progress'}, () => {
    createSmokeScenarios(
        {},
        {
            size: sizeCases,
            theme: themeCases,
            loading: loadingCases,
        },
    ).forEach(([title, details, props]) => {
        test(title, details, async ({mount, expectScreenshot}) => {
            await mount(
                <div style={{width: '200px', height: '50px'}}>
                    <Progress value={50} text="Text" {...props} />
                </div>,
            );

            await expectScreenshot();
        });
    });

    createSmokeScenarios(
        {},
        {
            size: sizeCases,
            loading: loadingCases,
        },
    ).forEach(([title, details, props]) => {
        test(`with color stops ${title}`, details, async ({mount, expectScreenshot}) => {
            await mount(
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
                </div>,
            );

            await expectScreenshot();
        });
    });

    createSmokeScenarios(
        {},
        {
            size: sizeCases,
            loading: loadingCases,
        },
    ).forEach(([title, details, props]) => {
        test(`with stack ${title}`, details, async ({mount, expectScreenshot}) => {
            await mount(
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
                </div>,
            );

            await expectScreenshot();
        });
    });
});
