import React from 'react';

import {test} from '~playwright/core';

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
    createSmokeScenarios<Partial<PersonaWrapProps>>(
        {},
        {
            theme: themeCases,
            size: sizeCases,
            isEmpty: isEmptyCases,
            onClose: closableCases,
            onClick: clickableCases,
        },
    ).forEach(([title, details, props]) => {
        test(title, details, async ({mount, expectScreenshot}) => {
            await mount(<TestPersonaWrap {...props} />);

            await expectScreenshot();
        });
    });
});
