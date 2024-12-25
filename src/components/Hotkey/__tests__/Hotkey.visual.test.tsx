import React from 'react';

import {smokeTest, test} from '~playwright/core';

import {createSmokeScenarios} from '../../../stories/tests-factory/create-smoke-scenarios';
import type {HotkeyProps} from '../Hotkey';
import {Hotkey} from '../Hotkey';

import {platformCases} from './cases';

test.describe('Hotkey', {tag: '@Hotkey'}, () => {
    smokeTest('smoke, light view', async ({mount, expectScreenshot}) => {
        const defaultProps: HotkeyProps = {
            value: 'mod+a mod+c mod+v',
            view: 'light',
        };

        const smokeScenarios = createSmokeScenarios(defaultProps, {
            platform: platformCases,
        });

        await mount(
            <div>
                {smokeScenarios.map(([title, props]) => (
                    <div key={title}>
                        <h4>{title}</h4>
                        <div>
                            <Hotkey {...props} />
                        </div>
                    </div>
                ))}
            </div>,
        );

        await expectScreenshot({
            themes: ['light'],
        });
    });

    smokeTest('smoke, dark view', async ({mount, expectScreenshot}) => {
        const defaultProps: HotkeyProps = {
            value: 'mod+a mod+c mod+v',
            view: 'dark',
        };

        const smokeScenarios = createSmokeScenarios(defaultProps, {
            platform: platformCases,
        });

        await mount(
            <div>
                {smokeScenarios.map(([title, props]) => (
                    <div key={title}>
                        <h4>{title}</h4>
                        <div>
                            <Hotkey {...props} />
                        </div>
                    </div>
                ))}
            </div>,
        );

        await expectScreenshot({
            themes: ['dark'],
        });
    });
});
