import React from 'react';

import {test} from '~playwright/core';

import {createSmokeScenarios} from '../../../stories/tests-factory/create-smoke-scenarios';
import {Box} from '../../layout';
import type {OverlayProps} from '../Overlay';
import {Overlay} from '../Overlay';

import {backgroundCases, visibleCases} from './cases';

test.describe('Overlay', {tag: '@Overlay'}, () => {
    const defaultProps: OverlayProps = {
        visible: true,
    };

    createSmokeScenarios(defaultProps, {
        visible: visibleCases,
        background: backgroundCases,
    }).forEach(([title, details, props]) => {
        test(title, details, async ({mount, expectScreenshot}) => {
            await mount(
                <Box position="relative">
                    <div>Example of overlay</div>
                    <Overlay {...props}>
                        <div>Loader</div>
                    </Overlay>
                </Box>,
            );

            await expectScreenshot();
        });
    });
});
