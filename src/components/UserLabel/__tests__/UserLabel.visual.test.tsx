import React from 'react';

import {test} from '~playwright/core';

import {createSmokeScenarios} from '../../../stories/tests-factory/create-smoke-scenarios';

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
    createSmokeScenarios(
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

    createSmokeScenarios(
        {},
        {
            size: sizeCases,
            view: viewCases,
            children: childrenCases,
            onClick: onClickCases,
            onCloseClick: onCloseClickCases,
        },
    ).forEach(([title, details, props]) => {
        test(`person ${title}`, details, async ({mount, expectScreenshot}) => {
            await mount(<TestUserLabelWithPerson {...props} />);

            await expectScreenshot();
        });
    });

    createSmokeScenarios(
        {},
        {
            size: sizeCases,
            view: viewCases,
            children: childrenCases,
            onClick: onClickCases,
            onCloseClick: onCloseClickCases,
        },
    ).forEach(([title, details, props]) => {
        test(`email ${title}`, details, async ({mount, expectScreenshot}) => {
            await mount(<TestUserLabelWithEmail {...props} />);

            await expectScreenshot();
        });
    });
});
