import React from 'react';

import {smokeTest, test} from '~playwright/core';

import {createSmokeScenarios} from '../../../stories/tests-factory/create-smoke-scenarios';
import type {PersonaWrapProps} from '../PersonaWrap';
import {
    clickableCases,
    closableCases,
    isEmptyCases,
    sizeCases,
    themeCases,
} from '../__tests__/cases';

import {TestPersonaWrap} from './helpersPlaywright';

test.describe('PersonaWrap', {tag: '@PersonaWrap'}, () => {
    smokeTest('', async ({mount, expectScreenshot}) => {
        const smokeScenarios = createSmokeScenarios<Partial<PersonaWrapProps>>(
            {},
            {
                theme: themeCases,
                size: sizeCases,
                isEmpty: isEmptyCases,
                onClose: closableCases,
                onClick: clickableCases,
            },
        );

        await mount(
            <div>
                {smokeScenarios.map(([title, props]) => (
                    <div key={title}>
                        <h4>{title}</h4>
                        <div>
                            <TestPersonaWrap {...props} />
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
