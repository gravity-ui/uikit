import React from 'react';

import {test} from '~playwright/core';

import {createSmokeScenarios} from '../../../stories/tests-factory/create-smoke-scenarios';

import {
    childrenCases,
    colorCases,
    ellipsisCases,
    variantCases,
    whiteSpaceCases,
    wordBreakCases,
} from './cases';
import {TestText} from './helpersPlaywright';

test.describe('Text', {tag: '@Text'}, () => {
    createSmokeScenarios(
        {},
        {
            color: colorCases,
            variant: variantCases,
            ellipsis: ellipsisCases,
            whiteSpace: whiteSpaceCases,
            wordBreak: wordBreakCases,
            children: childrenCases,
        },
    ).forEach(([title, details, props]) => {
        test(title, details, async ({mount, expectScreenshot}) => {
            await mount(<TestText {...props} />);

            await expectScreenshot();
        });
    });
});
