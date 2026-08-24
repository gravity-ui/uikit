import {createSmokeScenarios} from '@gravity-ui/playwright-tools/component-tests';

import {test} from '~playwright/core';

import type {ListProps} from '../types';

import {
    emptyPlaceholderCases,
    filterPlaceholderCases,
    sizeCases,
    sortHandleAlignCases,
} from './cases';
import {TestList, TestListWithCustomRender} from './helpersPlaywright';

test.describe('List', {tag: '@List'}, () => {
    const defaultProps: ListProps<string> = {
        itemsHeight: 200,
        items: ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight'],
    };

    test('smoke', {tag: ['@smoke']}, async ({mount, expectScreenshot}) => {
        const smokeScenarios = createSmokeScenarios<ListProps<string>>(defaultProps, {
            size: sizeCases,
            filterPlaceholder: filterPlaceholderCases,
            sortHandleAlign: sortHandleAlignCases,
        });

        await mount(
            <div>
                {smokeScenarios.map(([title, props]) => (
                    <div key={title}>
                        <h4>{title}</h4>
                        <div>
                            <TestList {...props} />
                        </div>
                        <hr />
                    </div>
                ))}
            </div>,
        );

        await expectScreenshot({
            themes: ['light'],
        });
    });

    test('smoke empty', {tag: ['@smoke']}, async ({mount, expectScreenshot}) => {
        const smokeScenarios = createSmokeScenarios<ListProps<string>>(
            {
                ...defaultProps,
                items: [],
            },
            {
                filterPlaceholder: filterPlaceholderCases,
                emptyPlaceholder: emptyPlaceholderCases,
            },
        );

        await mount(
            <div>
                {smokeScenarios.map(([title, props]) => (
                    <div key={title}>
                        <h4>{title}</h4>
                        <div>
                            <TestList {...props} />
                        </div>
                        <hr />
                    </div>
                ))}
            </div>,
        );

        await expectScreenshot({
            themes: ['light'],
        });
    });

    test('smoke custom render item', {tag: ['@smoke']}, async ({mount, expectScreenshot}) => {
        const smokeScenarios = createSmokeScenarios<ListProps<string>>(defaultProps, {
            size: sizeCases,
            filterPlaceholder: filterPlaceholderCases,
            sortHandleAlign: sortHandleAlignCases,
        });

        await mount(
            <div>
                {smokeScenarios.map(([title, props]) => (
                    <div key={title}>
                        <h4>{title}</h4>
                        <div>
                            <TestListWithCustomRender {...props} />
                        </div>
                        <hr />
                    </div>
                ))}
            </div>,
        );

        await expectScreenshot({
            themes: ['light'],
        });
    });

    test('smoke virtualized', {tag: ['@smoke']}, async ({mount, expectScreenshot}) => {
        const props: ListProps<string> = {
            ...defaultProps,
            itemHeight: 30,
            virtualized: true,
        };

        await mount(<TestList {...props} />);

        await expectScreenshot({
            themes: ['light'],
        });
    });
});
