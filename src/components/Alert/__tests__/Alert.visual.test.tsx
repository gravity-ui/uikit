import * as React from 'react';

import {smokeTest, test} from '~playwright/core';

import {createSmokeScenarios} from '../../../stories/tests-factory/create-smoke-scenarios';
import {block} from '../../utils/cn';
import {Alert} from '../Alert';
import type {AlertProps} from '../types';

export const DEFAULT_ICON_SIZE = 18;

export const bAlert = block('alert');

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

    test('render story: <Size>', async ({mount, expectScreenshot}) => {
        await mount(<AlertStories.Size />);

        await expectScreenshot();
    });

    test('render story: <CustomIcon>', async ({mount, expectScreenshot}) => {
        await mount(<AlertStories.CustomIcon />);

        await expectScreenshot();
    });

    test('render story: <WithoutCloseBtn>', async ({mount, expectScreenshot}) => {
        await mount(<AlertStories.WithoutCloseBtn />);

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

    test('render story: <ActionsLayout>', async ({mount, expectScreenshot}) => {
        await mount(<AlertStories.ActionsLayout />);

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

    test('render with custom css variables', async ({mount, expectScreenshot}) => {
        await mount(
            <AlertStories.Default
                style={
                    {
                        '--g-alert-padding': '4px',
                        '--g-alert-border-radius': '2px',
                        '--g-alert-icon-margin': '8px',
                        '--g-alert-close-btn-margin': '10px',
                        '--g-alert-actions-margin': '10px',
                        '--g-alert-message-margin': '10px',
                        '--g-alert-actions-gap': '10px',
                        '--g-alert-title-text-color': '#ff0000',
                        '--g-alert-title-font-size': '14px',
                        '--g-alert-title-line-height': '16px',
                        '--g-alert-message-text-color': '#00ff00',
                        '--g-alert-message-font-size': '14px',
                        '--g-alert-message-line-height': '16px',
                    } as React.CSSProperties
                }
            />,
        );

        await expectScreenshot();
    });

    smokeTest('smoke', async ({mount, expectScreenshot}) => {
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

        await mount(
            <div style={{width: 400}}>
                {smokeScenarios.map(([title, props]) => (
                    <div key={title}>
                        <h4>{title}</h4>
                        <div>
                            <Alert {...props} />
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
