import React from 'react';

import {test} from '~playwright/core';

import {createSmokeScenarios} from '../../../stories/tests-factory/create-smoke-scenarios';
import {ClipboardIcon} from '../ClipboardIcon';

import {defaultProps, sizeCases, statusCases} from './cases';

test.describe('ClipboardIcon', {tag: '@ClipboardIcon'}, () => {
    createSmokeScenarios(
        {
            ...defaultProps,
        } as const,
        {
            size: sizeCases,
            status: statusCases,
        },
    ).forEach(([title, details, props]) => {
        test(title, details, async ({mount, expectScreenshot}) => {
            await mount(<ClipboardIcon {...props} />);

            await expectScreenshot();
        });
    });
});
