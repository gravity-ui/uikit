import {smokeTest, test} from '~playwright/core';

import {createSmokeScenarios} from '../../../stories/tests-factory/create-smoke-scenarios';
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

    smokeTest('', async ({mount, expectScreenshot}) => {
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

    smokeTest('menu group', async ({mount, expectScreenshot}) => {
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

    smokeTest('menu item', async ({mount, expectScreenshot}) => {
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

    smokeTest('menu item with icons', async ({mount, expectScreenshot}) => {
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
