import React from 'react';

import {test} from '~playwright/core';

import {createSmokeScenarios} from '../../../stories/tests-factory/create-smoke-scenarios';
import type {TocProps} from '../Toc';

import {TestToc} from './helpers';

test.describe('Toc', {tag: '@Toc'}, () => {
    createSmokeScenarios<Partial<TocProps>>({}, {}).forEach(([title, details, props]) => {
        test(title, details, async ({mount, expectScreenshot}) => {
            const root = await mount(<TestToc {...props} />);

            await expectScreenshot({});

            await root.getByText('Disk controls').hover();

            await expectScreenshot({
                nameSuffix: 'hovered',
            });

            await root.getByText('Disk controls').click();

            await expectScreenshot({
                nameSuffix: 'after click',
            });
        });
    });
});
