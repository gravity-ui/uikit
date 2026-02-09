import {createSmokeScenarios} from '@gravity-ui/playwright-tools/component-tests';

import {test} from '~playwright/core';

import type {DisclosureProps} from '../Disclosure';
import {Disclosure} from '../Disclosure';

import {arrowPositionCases, disabledCases, sizeCases} from './cases';

test.describe('Disclosure', {tag: '@Disclosure'}, () => {
    test('smoke smoke, collapsed', {tag: ['@smoke']}, async ({mount, expectScreenshot}) => {
        const defaultProps: DisclosureProps = {
            summary: <div>Summary</div>,
            children: <div>Content</div>,
            expanded: false,
        };

        const smokeScenarios = createSmokeScenarios(defaultProps, {
            size: sizeCases,
            disabled: disabledCases,
            arrowPosition: arrowPositionCases,
        });

        await mount(
            <div>
                {smokeScenarios.map(([title, props]) => (
                    <div key={title}>
                        <h4>{title}</h4>
                        <div>
                            <Disclosure {...props} />
                        </div>
                    </div>
                ))}
            </div>,
        );

        await expectScreenshot({
            themes: ['light'],
        });
    });

    test('smoke smoke, expanded', {tag: ['@smoke']}, async ({mount, expectScreenshot}) => {
        const defaultProps: DisclosureProps = {
            summary: <div>Summary</div>,
            children: <div>Content</div>,
            expanded: true,
        };

        const smokeScenarios = createSmokeScenarios(defaultProps, {
            size: sizeCases,
            disabled: disabledCases,
            arrowPosition: arrowPositionCases,
        });

        await mount(
            <div>
                {smokeScenarios.map(([title, props]) => (
                    <div key={title}>
                        <h4>{title}</h4>
                        <div>
                            <Disclosure {...props} />
                        </div>
                    </div>
                ))}
            </div>,
        );

        await expectScreenshot({
            themes: ['light'],
        });
    });
});
