import React from 'react';

import {test} from '~playwright/core';

import {createSmokeScenarios} from '../../../stories/tests-factory/create-smoke-scenarios';
import type {UserLabelProps} from '../types';

import {
    childrenCases,
    onClickCases,
    onCloseClickCases,
    sizeCases,
    typeCases,
    viewCases,
} from './cases';
import {TestUserLabel, TestUserLabelWithEmail, TestUserLabelWithPerson} from './helpers';

test.describe('UserLabel', {tag: '@UserLabel'}, () => {
    createSmokeScenarios<Partial<UserLabelProps>>(
        {},
        {
            size: sizeCases,
            view: viewCases,
            type: typeCases,
            children: childrenCases,
            onClick: onClickCases,
            onCloseClick: onCloseClickCases,
        },
    ).forEach(([title, details, props]) => {
        test(title, details, async ({mount, expectScreenshot}) => {
            await mount(<TestUserLabel {...props} />);

            await expectScreenshot();
        });
    });

    createSmokeScenarios<Partial<UserLabelProps>>(
        {},
        {
            size: sizeCases,
            view: viewCases,
            children: childrenCases,
            onClick: onClickCases,
            onCloseClick: onCloseClickCases,
        },
        {
            scenarioName: 'person',
        },
    ).forEach(([title, details, props]) => {
        test(title, details, async ({mount, expectScreenshot}) => {
            await mount(<TestUserLabelWithPerson {...props} />);

            await expectScreenshot();
        });
    });

    createSmokeScenarios<Partial<UserLabelProps>>(
        {},
        {
            size: sizeCases,
            view: viewCases,
            children: childrenCases,
            onClick: onClickCases,
            onCloseClick: onCloseClickCases,
        },
        {
            scenarioName: 'email',
        },
    ).forEach(([title, details, props]) => {
        test(title, details, async ({mount, expectScreenshot}) => {
            await mount(<TestUserLabelWithEmail {...props} />);

            await expectScreenshot();
        });
    });
});
