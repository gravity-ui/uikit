import {createSmokeScenarios} from '@gravity-ui/playwright-tools/component-tests';

import {test} from '~playwright/core';

import type {HotkeyProps} from '../Hotkey';
import {Hotkey} from '../Hotkey';

import {platformCases, valueCases} from './cases';

test.describe('Hotkey', {tag: '@Hotkey'}, () => {
    test('smoke smoke, light view', {tag: ['@smoke']}, async ({mount, expectScreenshot}) => {
        const defaultProps: HotkeyProps = {
            value: 'mod+a',
            view: 'light',
        };

        const smokeScenarios = createSmokeScenarios(defaultProps, {
            value: valueCases,
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

    test('smoke smoke, dark view', {tag: ['@smoke']}, async ({mount, expectScreenshot}) => {
        const defaultProps: HotkeyProps = {
            value: 'mod+a',
            view: 'dark',
        };

        const smokeScenarios = createSmokeScenarios(defaultProps, {
            value: valueCases,
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
