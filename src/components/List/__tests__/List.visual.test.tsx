import React from 'react';

import {test} from '~playwright/core';

import {createSmokeScenarios} from '../../../stories/tests-factory/create-smoke-scenarios';
import type {ListProps} from '../types';

import {
    emptyPlaceholderCases,
    filterPlaceholderCases,
    sizeCases,
    sortHandleAlignCases,
} from './cases';
import {TestFilterableList, TestList, TestListWithCustomRender} from './helpersPlaywright';

test.describe('List', {tag: '@List'}, () => {
    const defaultProps: ListProps<string> = {
        itemsHeight: 200,
        items: ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight'],
    };

    createSmokeScenarios(defaultProps, {
        size: sizeCases,
    }).forEach(([title, details, props]) => {
        test(title, details, async ({mount, expectScreenshot}) => {
            const root = await mount(<TestList {...props} />);

            await expectScreenshot();

            root.getByText('one').hover();

            await expectScreenshot({
                screenshotPostfix: 'after hover on first item',
            });
        });
    });

    createSmokeScenarios(
        {
            ...defaultProps,
            items: [],
        },
        {
            size: sizeCases,
            emptyPlaceholder: emptyPlaceholderCases,
        },
    ).forEach(([title, details, props]) => {
        test(`empty ${title}`, details, async ({mount, expectScreenshot}) => {
            await mount(<TestList {...props} />);

            await expectScreenshot();
        });
    });

    createSmokeScenarios(defaultProps, {
        size: sizeCases,
    }).forEach(([title, details, props]) => {
        test(`custom render item ${title}`, details, async ({mount, expectScreenshot}) => {
            await mount(<TestListWithCustomRender {...props} />);

            await expectScreenshot();
        });
    });

    createSmokeScenarios(
        {
            ...defaultProps,
            sortable: true,
        },
        {
            size: sizeCases,
            sortHandleAlign: sortHandleAlignCases,
        },
    ).forEach(([title, details, props]) => {
        test(`with sort ${title}`, details, async ({mount, expectScreenshot}) => {
            await mount(<TestList {...props} />);

            await expectScreenshot();
        });
    });

    createSmokeScenarios(
        {
            ...defaultProps,
        },
        {
            size: sizeCases,
            filterPlaceholder: filterPlaceholderCases,
        },
    ).forEach(([title, details, props]) => {
        test(`filterable ${title}`, details, async ({mount, page, expectScreenshot}) => {
            await mount(<TestFilterableList {...props} />);

            await expectScreenshot();

            await page.keyboard.type('on');

            await expectScreenshot({
                screenshotPostfix: 'after apply filter',
            });
        });
    });

    createSmokeScenarios(
        {
            ...defaultProps,
            itemHeight: 30,
            virtualized: true,
        },
        {},
    ).forEach(([title, details, props]) => {
        test(`virtualized ${title}`, details, async ({mount, expectScreenshot}) => {
            await mount(<TestList {...props} />);

            await expectScreenshot();
        });
    });
});
