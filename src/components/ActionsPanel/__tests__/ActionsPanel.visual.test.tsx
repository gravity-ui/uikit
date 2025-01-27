import {expect} from '@playwright/experimental-ct-react';

import {smokeTest, test} from '~playwright/core';

import {createSmokeScenarios} from '../../../stories/tests-factory/create-smoke-scenarios';
import {ActionsPanel} from '../ActionsPanel';
import type {ActionsPanelProps} from '../types';

import {TestActionsPanelWithNote} from './helpersPlaywright';

test.describe('ActionsPanel', {tag: '@ActionsPanel'}, () => {
    const noop = () => {
        // nothing
    };

    const actionsWithNoteAndGroups: ActionsPanelProps['actions'] = [
        {
            id: 'action_1',
            button: {
                props: {
                    children: 'Action 1',
                    onClick: noop,
                    view: 'normal-contrast',
                },
            },
            dropdown: {
                item: {
                    action: noop,
                    text: 'Action 1',
                },
                group: '1',
            },
        },
        {
            id: 'action_2',
            button: {
                props: {
                    children: 'Action 2',
                    onClick: noop,
                },
            },
            dropdown: {
                item: {
                    action: noop,
                    text: 'Action 2',
                },
                group: '1',
            },
        },
        {
            id: 'action_3',
            button: {
                props: {
                    children: 'Action 3',
                    onClick: noop,
                },
            },
            dropdown: {
                item: {
                    action: noop,
                    text: 'Action 3',
                },
                group: '2',
            },
        },
        {
            id: 'action_4',
            button: {
                props: {
                    children: 'Action 4',
                    onClick: noop,
                },
            },
            dropdown: {
                item: {
                    action: noop,
                    text: 'Action 4',
                },
                group: '2',
            },
        },
    ];

    const collapsedActionsWithNoteAndGroups = actionsWithNoteAndGroups.map((item) => {
        return {
            ...item,
            collapsed: true,
        };
    });

    const defaultProps: ActionsPanelProps = {
        actions: actionsWithNoteAndGroups,
    };

    smokeTest('', async ({mount, expectScreenshot}) => {
        const smokeScenarios = createSmokeScenarios<ActionsPanelProps>(defaultProps, {
            maxRowActions: [2],
            onClose: [['closable', noop]],
        });

        await mount(
            <div>
                {smokeScenarios.map(([title, props]) => (
                    <div key={title}>
                        <h4>{title}</h4>
                        <div
                            style={{
                                width: 600,
                            }}
                        >
                            <div>
                                <ActionsPanel {...props} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>,
        );

        await expectScreenshot({
            themes: ['light'],
        });
    });

    smokeTest('with note', async ({mount, expectScreenshot}) => {
        const smokeScenarios = createSmokeScenarios<ActionsPanelProps>(defaultProps, {
            maxRowActions: [2],
            onClose: [['closable', noop]],
        });

        await mount(
            <div>
                {smokeScenarios.map(([title, props]) => (
                    <div key={title}>
                        <h4>{title}</h4>
                        <div
                            style={{
                                width: 600,
                            }}
                        >
                            <div>
                                <TestActionsPanelWithNote {...props} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>,
        );

        await expectScreenshot({
            themes: ['light'],
        });
    });

    smokeTest('group', async ({mount, page, expectScreenshot}) => {
        const root = await mount(
            <div
                style={{
                    width: 600,
                    minHeight: 500,
                }}
            >
                <TestActionsPanelWithNote actions={collapsedActionsWithNoteAndGroups} />
            </div>,
        );

        await expectScreenshot({
            themes: ['light'],
        });

        await root.getByRole('button').click();
        await expect(page.locator('[role="menu"]')).toBeVisible({
            timeout: 3000,
        });

        await expectScreenshot({
            themes: ['light'],
            nameSuffix: 'opened',
        });
    });

    smokeTest('with submenu', async ({mount, page, expectScreenshot}) => {
        const actionsSubmenu: ActionsPanelProps['actions'] = [
            {
                id: 'button-with-sub-menu',
                button: {
                    props: {
                        children: 'Sub-menu',
                        view: 'outlined-contrast',
                        onClick: noop,
                        qa: 'sub-menu-trigger',
                    },
                },
                dropdown: {
                    item: {
                        text: 'Sub-menu',
                        items: [
                            {
                                action: noop,
                                text: 'Edit',
                            },
                            {
                                action: noop,
                                text: 'Delete',
                                theme: 'danger',
                            },
                        ],
                    },
                },
            },
            {
                id: 'nested-menu',
                collapsed: true,
                button: {
                    props: {
                        children: 'Nested',
                        onClick: noop,
                        qa: 'nested-menu-trigger',
                    },
                },
                dropdown: {
                    item: {
                        action: noop,
                        text: 'Action 3',
                    },
                    group: '2',
                },
            },
        ];

        const root = await mount(
            <div
                style={{
                    width: 600,
                    minHeight: 500,
                }}
            >
                <TestActionsPanelWithNote actions={actionsSubmenu} />
            </div>,
        );

        await expectScreenshot({
            themes: ['light'],
        });

        await root.getByTestId('sub-menu-trigger').click();
        await expect(page.locator('[role="menu"]')).toBeVisible({
            timeout: 3000,
        });

        await expectScreenshot({
            themes: ['light'],
            nameSuffix: 'opened submenu',
        });
    });
});
