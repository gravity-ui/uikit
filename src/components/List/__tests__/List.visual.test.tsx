import {smokeTest, test} from '~playwright/core';

import {createSmokeScenarios} from '../../../stories/tests-factory/create-smoke-scenarios';
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

    smokeTest('', async ({mount, expectScreenshot}) => {
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

    smokeTest('empty', async ({mount, expectScreenshot}) => {
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

    smokeTest('custom render item', async ({mount, expectScreenshot}) => {
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

    smokeTest('virtualized', async ({mount, expectScreenshot}) => {
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
