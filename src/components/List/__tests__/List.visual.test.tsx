import {createSmokeScenarios} from '@gravity-ui/playwright-tools/component-tests';

import {test} from '~playwright/core';

import type {ListProps} from '../types';

import type {Mailbox} from './cases';
import {sizeCases} from './cases';
import {TestList, TestListWithItemView, TestListWithSections} from './helpersPlaywright';

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
});
