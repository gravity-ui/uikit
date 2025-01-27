import {smokeTest, test} from '~playwright/core';

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
