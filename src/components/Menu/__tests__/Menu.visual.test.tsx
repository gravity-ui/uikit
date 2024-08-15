import React from 'react';

import {test} from '~playwright/core';

import {createSmokeScenarios} from '../../../stories/tests-factory/create-smoke-scenarios';
import type {MenuProps} from '../Menu';
import type {MenuGroupProps} from '../MenuGroup';
import type {MenuItemProps} from '../MenuItem';

import {activeCases, disabledCases, selectedCases, sizeCases, themeCases} from './cases';
import {TestMenu, TestMenuGroup, TestMenuItem, TestMenuItemWithIcons} from './helpers';

test.describe('Menu', {tag: '@Menu'}, () => {
    const defaultMenuProps: MenuProps = {};

    createSmokeScenarios(defaultMenuProps, {
        size: sizeCases,
    }).forEach(([title, details, props]) => {
        test(title, details, async ({mount, expectScreenshot}) => {
            const root = await mount(<TestMenu {...props} />);

            await expectScreenshot();

            await root.locator('ul li').locator('nth=0').hover();

            await expectScreenshot({
                screenshotPostfix: 'after hover on item',
            });
        });
    });

    const defaultMenuGroupProps: MenuGroupProps = {
        label: 'Group title',
    };

    createSmokeScenarios(defaultMenuGroupProps, {}).forEach(([title, details, props]) => {
        test(`menu group ${title}`, details, async ({mount, expectScreenshot}) => {
            const root = await mount(<TestMenuGroup {...props} />);

            await expectScreenshot();

            await root.locator('ul li').locator('nth=0').hover();

            await expectScreenshot({
                screenshotPostfix: 'after hover on item',
            });
        });
    });

    const menuItemQa = 'menu-item';

    const defaultMenuItemProps: MenuItemProps = {
        qa: menuItemQa,
        children: 'Menu item content',
    };

    createSmokeScenarios(defaultMenuItemProps, {
        disabled: disabledCases,
        active: activeCases,
        selected: selectedCases,
        theme: themeCases,
    }).forEach(([title, details, props]) => {
        test(`menu item ${title}`, details, async ({mount, expectScreenshot}) => {
            const root = await mount(<TestMenuItem {...props} />);

            await expectScreenshot();

            if (!props.disabled) {
                await root.getByTestId(menuItemQa).hover();

                await expectScreenshot({
                    screenshotPostfix: 'after hover on item',
                });
            }
        });
    });

    createSmokeScenarios(defaultMenuItemProps, {
        disabled: disabledCases,
        active: activeCases,
        selected: selectedCases,
        theme: themeCases,
    }).forEach(([title, details, props]) => {
        test(`menu item with icons ${title}`, details, async ({mount, expectScreenshot}) => {
            const root = await mount(<TestMenuItemWithIcons {...props} />);

            await expectScreenshot();

            if (!props.disabled) {
                await root.getByTestId(menuItemQa).hover();

                await expectScreenshot({
                    screenshotPostfix: 'after hover on item',
                });
            }
        });
    });
});
