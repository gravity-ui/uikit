import {createSmokeScenarios} from '@gravity-ui/playwright-tools/component-tests';

import {test} from '~playwright/core';

import type {MenuItemProps, MenuProps} from '../Menu';
import type {MenuGroupProps} from '../MenuGroup';

import {activeCases, disabledCases, selectedCases, sizeCases, themeCases} from './cases';
import type {
    TestMenuGroupProps,
    TestMenuItemProps,
    TestMenuItemWithIconsProps,
    TestMenuProps,
} from './helpers';
import {TestMenu, TestMenuGroup, TestMenuItem, TestMenuItemWithIcons} from './helpers';

test.describe('Menu', {tag: '@Menu'}, () => {
    const defaultMenuProps: MenuProps = {};

    test('smoke', {tag: ['@smoke']}, async ({mount, expectScreenshot}) => {
        const smokeScenarios = createSmokeScenarios<TestMenuProps>(defaultMenuProps, {
            size: sizeCases,
        });

        await mount(
            <div>
                {smokeScenarios.map(([title, props]) => (
                    <div key={title}>
                        <h4>{title}</h4>
                        <div>
                            <TestMenu {...props} />
                        </div>
                    </div>
                ))}
            </div>,
        );

        await expectScreenshot({});
    });

    const defaultMenuGroupProps: MenuGroupProps = {
        label: 'Group title',
    };

    test('smoke menu group', {tag: ['@smoke']}, async ({mount, expectScreenshot}) => {
        const smokeScenarios = createSmokeScenarios<TestMenuGroupProps>(defaultMenuGroupProps, {});

        await mount(
            <div>
                {smokeScenarios.map(([title, props]) => (
                    <div key={title}>
                        <h4>{title}</h4>
                        <div>
                            <TestMenuGroup {...props} />
                        </div>
                    </div>
                ))}
            </div>,
        );

        await expectScreenshot({});
    });

    const menuItemQa = 'menu-item';

    const defaultMenuItemProps: MenuItemProps = {
        qa: menuItemQa,
        children: 'Menu item content',
    };

    test('smoke menu item', {tag: ['@smoke']}, async ({mount, expectScreenshot}) => {
        const smokeScenarios = createSmokeScenarios<TestMenuItemProps>(defaultMenuItemProps, {
            disabled: disabledCases,
            active: activeCases,
            selected: selectedCases,
            theme: themeCases,
        });

        await mount(
            <div>
                {smokeScenarios.map(([title, props]) => (
                    <div key={title}>
                        <h4>{title}</h4>
                        <div>
                            <TestMenuItem {...props} />
                        </div>
                    </div>
                ))}
            </div>,
        );

        await expectScreenshot({});
    });

    test('smoke menu item with icons', {tag: ['@smoke']}, async ({mount, expectScreenshot}) => {
        const smokeScenarios = createSmokeScenarios<TestMenuItemWithIconsProps>(
            defaultMenuItemProps,
            {
                disabled: disabledCases,
                active: activeCases,
                selected: selectedCases,
                theme: themeCases,
            },
        );

        await mount(
            <div>
                {smokeScenarios.map(([title, props]) => (
                    <div key={title}>
                        <h4>{title}</h4>
                        <div>
                            <TestMenuItemWithIcons {...props} />
                        </div>
                    </div>
                ))}
            </div>,
        );

        await expectScreenshot({});
    });
});
