import React from 'react';

import {test} from '~playwright/core';

import {createSmokeScenarios} from '../../../stories/tests-factory/create-smoke-scenarios';
import {Alert} from '../Alert';
import type {AlertProps} from '../types';

import {
    actionCases,
    alignCases,
    cornersCases,
    layoutCases,
    messageCases,
    themeCases,
    titleCases,
    viewCases,
} from './cases';
import {AlertStories} from './helpersPlaywright';

test.describe('Alert', {tag: '@Alert'}, () => {
    test('render story: <Default>', async ({mount, expectScreenshot}) => {
        await mount(<AlertStories.Default />);

        await expectScreenshot();
    });

    test('render story: <Theme>', async ({mount, expectScreenshot}) => {
        await mount(<AlertStories.Theme />);

        await expectScreenshot();
    });

    test('render story: <CustomIcon>', async ({mount, expectScreenshot}) => {
        await mount(<AlertStories.CustomIcon />);

        await expectScreenshot();
    });

    test('render story: <Corners>', async ({mount, expectScreenshot}) => {
        await mount(<AlertStories.Corners />);

        await expectScreenshot();
    });

    test('render story: <View>', async ({mount, expectScreenshot}) => {
        await mount(<AlertStories.View />);

        await expectScreenshot();
    });

    test('render story: <Layout>', async ({mount, expectScreenshot}) => {
        await mount(<AlertStories.Layout />);

        await expectScreenshot();
    });

    test('render story: <Actions>', async ({mount, expectScreenshot}) => {
        await mount(<AlertStories.Actions />);

        await expectScreenshot();
    });

    test('render story: <Align>', async ({mount, expectScreenshot}) => {
        await mount(<AlertStories.Align />);

        await expectScreenshot();
    });

    const defaultProps: AlertProps = {
        title: 'Title',
        message: 'Message',
    };

    const smokeScenarios = createSmokeScenarios(defaultProps, {
        theme: themeCases,
        view: viewCases,
        layout: layoutCases,
        title: titleCases,
        message: messageCases,
        corners: cornersCases,
        align: alignCases,
        actions: actionCases,
    });

    smokeScenarios.forEach(([title, details, props]) => {
        test(title, details, async ({mount, expectScreenshot}) => {
            await mount(<Alert {...props} />);

            await expectScreenshot();
        });
    });
});
