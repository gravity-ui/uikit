import React from 'react';

import {expect} from '@playwright/experimental-ct-react';

import {test} from '~playwright/core';

import {createSmokeScenarios} from '../../../stories/tests-factory/create-smoke-scenarios';
import type {UserProps} from '../types';

import {avatarCases, descriptionCases, nameCases, sizeCases} from './cases';
import {TestUser} from './helpers';
import {Default} from './stories';

test.describe('User', {tag: '@User'}, () => {
    test('render story: <Default>', async ({mount}) => {
        const component = await mount(<Default />);

        await expect(component).toHaveScreenshot();
    });

    createSmokeScenarios<Partial<UserProps>>(
        {},
        {
            avatar: avatarCases,
            description: descriptionCases,
            name: nameCases,
            size: sizeCases,
        },
    ).forEach(([title, details, props]) => {
        test(title, details, async ({mount, expectScreenshot}) => {
            await mount(<TestUser {...props} />);

            await expectScreenshot();
        });
    });
});
