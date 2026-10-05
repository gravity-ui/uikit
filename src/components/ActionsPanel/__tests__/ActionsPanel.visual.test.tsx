import {createSmokeScenarios} from '@gravity-ui/playwright-tools/component-tests';
import {expect} from '@playwright/experimental-ct-react';

import {test} from '~playwright/core';

import {Menu, MenuItem} from '../../Menu';
import {ActionsPanel} from '../ActionsPanel';
import type {ActionsPanelProps} from '../types';

import {
    TestActionsPanelMenuItemProps,
    TestActionsPanelNestedAction,
    TestActionsPanelWithNote,
} from './helpersPlaywright';

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
            menu: {
                item: {
                    onClick: noop,
                    children: 'Action 1',
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
            menu: {
                item: {
                    onClick: noop,
                    children: 'Action 2',
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
            menu: {
                item: {
                    onClick: noop,
                    children: 'Action 3',
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
            menu: {
                item: {
                    onClick: noop,
                    children: 'Action 4',
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

    test('smoke', {tag: ['@smoke']}, async ({mount, expectScreenshot}) => {
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

    test('smoke with note', {tag: ['@smoke']}, async ({mount, expectScreenshot}) => {
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

    test('smoke group', {tag: ['@smoke']}, async ({mount, page, expectScreenshot}) => {
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
        });
    });

    test('smoke with submenu', {tag: ['@smoke']}, async ({mount, page, expectScreenshot}) => {
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
                menu: {
                    item: {
                        children: [
                            'Sub-menu',
                            <Menu key="submenu" size="s">
                                <MenuItem onClick={noop}>Edit</MenuItem>
                                <MenuItem onClick={noop} theme="danger">
                                    Delete
                                </MenuItem>
                            </Menu>,
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
                menu: {
                    item: {
                        onClick: noop,
                        children: 'Action 3',
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
        });
    });

    test('runs an action from a nested overflow menu', async ({mount, page}) => {
        await mount(<TestActionsPanelNestedAction />);

        await page.getByRole('button', {name: 'Show more'}).click();
        await page.getByRole('menuitem', {name: 'More'}).hover();
        await page.getByRole('menuitem', {name: 'Run'}).click();
        await expect(page.getByTestId('menu-action-result')).toHaveText('run');
    });

    test('passes MenuItem props to the overflow menu', async ({mount, page}) => {
        await mount(<TestActionsPanelMenuItemProps />);

        const openMenu = async () => page.getByRole('button', {name: 'Show more'}).click();
        const result = page.getByTestId('menu-action-result');

        await openMenu();
        await expect(page.getByRole('menuitemcheckbox', {name: 'Selected'})).toHaveAttribute(
            'aria-checked',
            'true',
        );
        await page.getByRole('menuitem', {name: 'Run'}).click();
        await expect(result).toHaveText('run');
    });
});
