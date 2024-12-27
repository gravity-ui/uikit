import type * as React from 'react';

import {smokeTest, test} from '~playwright/core';

import {createSmokeScenarios} from '../../../stories/tests-factory/create-smoke-scenarios';
import type {Toast} from '../Toast/Toast';
import type {ToastProps} from '../types';

import {actionsCases, isClosableCases, themeCases, titleCases} from './cases';
import {TestToast, TestToastWithIcon} from './helpers';
import {ToastStories} from './helpersPlaywright';

const wrapperOptions = {
    width: 312,
};

function getToastActions(contrastButton = true): React.ComponentProps<typeof Toast>['actions'] {
    return [
        {onClick() {}, label: 'Action', view: contrastButton ? 'normal-contrast' : 'normal'},
        {onClick() {}, label: 'Something More', view: 'outlined'},
    ];
}

const simpleToastProps: React.ComponentProps<typeof Toast> = {
    actions: getToastActions(),
    removeCallback: () => {},
    name: 'simple-toast',
    isClosable: true,
    title: 'Do some actions',
    content: 'We address you some concerns regarding your last actions in UI',
};

test.describe('Toast', {tag: '@Toaster'}, () => {
    test('render story: <ToastPlayground> (normal)', async ({mount, expectScreenshot}) => {
        await mount(
            <ToastStories.ToastPlayground
                {...simpleToastProps}
                actions={getToastActions(false)}
                theme="normal"
            />,
            wrapperOptions,
        );

        await expectScreenshot();
    });

    test('render story: <ToastPlayground> (info)', async ({mount, expectScreenshot}) => {
        await mount(
            <ToastStories.ToastPlayground {...simpleToastProps} theme="info" />,
            wrapperOptions,
        );

        await expectScreenshot();
    });

    test('render story: <ToastPlayground> (success)', async ({mount, expectScreenshot}) => {
        await mount(
            <ToastStories.ToastPlayground {...simpleToastProps} theme="success" />,
            wrapperOptions,
        );

        await expectScreenshot();
    });

    test('render story: <ToastPlayground> (warning)', async ({mount, expectScreenshot}) => {
        await mount(
            <ToastStories.ToastPlayground {...simpleToastProps} theme="warning" />,
            wrapperOptions,
        );

        await expectScreenshot();
    });

    test('render story: <ToastPlayground> (danger)', async ({mount, expectScreenshot}) => {
        await mount(
            <ToastStories.ToastPlayground {...simpleToastProps} theme="danger" />,
            wrapperOptions,
        );

        await expectScreenshot();
    });

    test('render story: <ToastPlayground> (utility)', async ({mount, expectScreenshot}) => {
        await mount(
            <ToastStories.ToastPlayground {...simpleToastProps} theme="utility" />,
            wrapperOptions,
        );

        await expectScreenshot();
    });

    smokeTest('', async ({mount, expectScreenshot}) => {
        const smokeScenarios = createSmokeScenarios<ToastProps>(
            {
                name: 'toast',
                content: <div>toast content</div>,
            },
            {
                title: titleCases,
                theme: themeCases,
                actions: actionsCases,
                isClosable: isClosableCases,
            },
        );

        await mount(
            <div>
                {smokeScenarios.map(([title, props]) => (
                    <div key={title}>
                        <h4>{title}</h4>
                        <div>
                            <TestToast {...props} />
                        </div>
                    </div>
                ))}
            </div>,
        );

        await expectScreenshot({
            themes: ['light'],
        });
    });

    smokeTest('with icons', async ({mount, expectScreenshot}) => {
        const smokeScenarios = createSmokeScenarios<ToastProps>(
            {
                name: 'toast',
                content: <div>toast content</div>,
            },
            {
                title: titleCases,
                theme: themeCases,
                actions: actionsCases,
                isClosable: isClosableCases,
            },
        );

        await mount(
            <div>
                {smokeScenarios.map(([title, props]) => (
                    <div key={title}>
                        <h4>{title}</h4>
                        <div>
                            <TestToastWithIcon {...props} />
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
