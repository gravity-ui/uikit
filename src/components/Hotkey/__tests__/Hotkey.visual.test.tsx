import {smokeTest, test} from '~playwright/core';

import {createSmokeScenarios} from '../../../stories/tests-factory/create-smoke-scenarios';
import type {HotkeyProps} from '../Hotkey';
import {Hotkey} from '../Hotkey';

import {platformCases, valueCases} from './cases';

test.describe('Hotkey', {tag: '@Hotkey'}, () => {
    smokeTest('smoke, light view', async ({mount, expectScreenshot}) => {
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

    smokeTest('smoke, dark view', async ({mount, expectScreenshot}) => {
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
