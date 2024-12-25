import React from 'react';

import {smokeTest, test} from '~playwright/core';

import {createSmokeScenarios} from '../../../stories/tests-factory/create-smoke-scenarios';
import {ControlLabel} from '../ControlLabel';
import type {Props} from '../types';

import {disabledCases, sizeCases, titleCases} from './cases';

test.describe('ControlLabel', {tag: '@ControlLabel'}, () => {
    smokeTest('smoke', async ({mount, expectScreenshot}) => {
        const defaultProps: Props = {
            control: <div>control</div>,
        };

        const smokeScenarios = createSmokeScenarios(defaultProps, {
            size: sizeCases,
            title: titleCases,
            disabled: disabledCases,
        });

        await mount(
            <div style={{width: 400}}>
                {smokeScenarios.map(([title, props]) => (
                    <div key={title}>
                        <h4>{title}</h4>
                        <div>
                            <ControlLabel {...props} />
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
