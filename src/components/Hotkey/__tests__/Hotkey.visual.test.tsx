import React from 'react';

import {test} from '~playwright/core';

import {createSmokeScenarios} from '../../../stories/tests-factory/create-smoke-scenarios';
import type {HotkeyProps} from '../Hotkey';
import {Hotkey} from '../Hotkey';

import {platformCases, viewCases} from './cases';

test.describe('Hotkey', {tag: '@Hotkey'}, () => {
    const defaultProps: HotkeyProps = {
        value: 'mod+a mod+c mod+v',
    };

    createSmokeScenarios(defaultProps, {
        view: viewCases,
        platform: platformCases,
    }).forEach(([title, details, props]) => {
        test(title, details, async ({mount, expectScreenshot}) => {
            await mount(<Hotkey {...props} />);

            await expectScreenshot();
        });
    });
});
