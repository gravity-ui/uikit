import {createSmokeScenarios} from '@gravity-ui/playwright-tools/component-tests';

import {test} from '~playwright/core';

import type {ListProps} from '../types';

import type {Mailbox} from './cases';
import {selectionModeCases, sizeCases} from './cases';
import {
    TestList,
    TestListWithItemView,
    TestListWithSections,
    TestVirtualizedList,
} from './helpersPlaywright';

test.describe('List', {tag: '@List'}, () => {
    test('smoke', {tag: ['@smoke']}, async ({mount, expectScreenshot}) => {
        const smokeScenarios = createSmokeScenarios<Partial<ListProps<Mailbox>>>(
            {},
            {size: sizeCases},
        );

        await mount(
            <div>
                {smokeScenarios.map(([title, props]) => (
                    <div key={title}>
                        <h4>{title}</h4>
                        <div style={{width: 260}}>
                            <TestList {...props} />
                        </div>
                        <hr />
                    </div>
                ))}
            </div>,
        );

        await expectScreenshot({themes: ['light']});
    });

    test('smoke selection', {tag: ['@smoke']}, async ({mount, expectScreenshot}) => {
        const smokeScenarios = createSmokeScenarios<Partial<ListProps<Mailbox>>>(
            // The mode is in the base props: the scenarios of a case set one prop at a time, and
            // a size scenario without a mode would be a list without a selection at all
            {selectionMode: 'multiple', defaultSelectedIds: ['inbox']},
            {selectionMode: selectionModeCases, size: sizeCases},
        );

        await mount(
            <div>
                {smokeScenarios.map(([title, props]) => (
                    <div key={title}>
                        <h4>{title}</h4>
                        <div style={{width: 260}}>
                            <TestList {...props} />
                        </div>
                        <hr />
                    </div>
                ))}
            </div>,
        );

        await expectScreenshot({themes: ['light']});
    });

    test('smoke sections', {tag: ['@smoke']}, async ({mount, expectScreenshot}) => {
        const smokeScenarios = createSmokeScenarios<Partial<ListProps<Mailbox>>>(
            {},
            {size: sizeCases},
        );

        await mount(
            <div>
                {smokeScenarios.map(([title, props]) => (
                    <div key={title}>
                        <h4>{title}</h4>
                        <div style={{width: 260}}>
                            <TestListWithSections {...props} />
                        </div>
                        <hr />
                    </div>
                ))}
            </div>,
        );

        await expectScreenshot({themes: ['light']});
    });

    test('smoke item view', {tag: ['@smoke']}, async ({mount, expectScreenshot}) => {
        const smokeScenarios = createSmokeScenarios<Partial<ListProps<Mailbox>>>(
            {selectionMode: 'multiple', defaultSelectedIds: ['inbox']},
            {size: sizeCases},
        );

        await mount(
            <div>
                {smokeScenarios.map(([title, props]) => (
                    <div key={title}>
                        <h4>{title}</h4>
                        <div style={{width: 260}}>
                            <TestListWithItemView {...props} />
                        </div>
                        <hr />
                    </div>
                ))}
            </div>,
        );

        await expectScreenshot({themes: ['light']});
    });

    test('smoke virtualized', {tag: ['@smoke']}, async ({mount, expectScreenshot}) => {
        const component = await mount(
            <div style={{width: 260}}>
                <TestVirtualizedList />
            </div>,
        );

        // The window of rows appears after the virtualizer has measured the container
        await component.getByRole('option').first().waitFor();

        await expectScreenshot({themes: ['light']});
    });
});
