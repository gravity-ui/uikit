import React from 'react';

import {test} from '~playwright/core';

import {createSmokeScenarios} from '../../../stories/tests-factory/create-smoke-scenarios';
import {sizeCases} from '../../Button/__tests__/cases';
import type {AvatarStackProps} from '../types';

import {maxCases, overlapSizeCases} from './cases';
import {TestAvatarStack, TestAvatarStackWithCustomMore} from './helpersPlaywright';
import {AvatarStackStories} from './stories';

test.describe('AvatarStack', () => {
    test('render story <SingleItem>', async ({mount, expectScreenshot}) => {
        await mount(<AvatarStackStories.SingleItem randomAvatar={false} />);

        await expectScreenshot();
    });

    test('render story <MoreButton>', async ({mount, expectScreenshot}) => {
        await mount(<AvatarStackStories.MoreButton randomAvatar={false} />);

        await expectScreenshot();
    });

    test('render story <MoreButtonOmit>', async ({mount, expectScreenshot}) => {
        await mount(<AvatarStackStories.MoreButtonOmit randomAvatar={false} />);

        await expectScreenshot();
    });

    const defaultProps: AvatarStackProps & {avatarCount?: number} = {};

    createSmokeScenarios(defaultProps, {
        size: sizeCases,
        overlapSize: overlapSizeCases,
        max: maxCases,
        avatarCount: [1],
    }).forEach(([title, details, props]) => {
        test(title, details, async ({mount, expectScreenshot}) => {
            await mount(<TestAvatarStack {...props} />);

            await expectScreenshot();
        });
    });

    createSmokeScenarios(
        defaultProps,
        {
            avatarCount: [1],
        },
        {
            scenarioName: 'custom more',
        },
    ).forEach(([title, details, props]) => {
        test(title, details, async ({mount, expectScreenshot}) => {
            await mount(<TestAvatarStackWithCustomMore {...props} />);

            await expectScreenshot();
        });
    });
});
