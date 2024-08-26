import React from 'react';

import {test} from '~playwright/core';

import {createSmokeScenarios} from '../../../stories/tests-factory/create-smoke-scenarios';
import type {ClipboardIconProps} from '../ClipboardIcon';
import {ClipboardIcon} from '../ClipboardIcon';

import {sizeCases, statusCases} from './cases';

test.describe('ClipboardIcon', {tag: '@ClipboardIcon'}, () => {
    const defaultProps: ClipboardIconProps = {
        status: 'success',
    };

    createSmokeScenarios(defaultProps, {
        size: sizeCases,
        status: statusCases,
    }).forEach(([title, details, props]) => {
        test(title, details, async ({mount, expectScreenshot}) => {
            await mount(<ClipboardIcon {...props} />);

            await expectScreenshot();
        });
    });
});
