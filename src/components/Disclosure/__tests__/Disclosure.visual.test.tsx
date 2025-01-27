import {smokeTest, test} from '~playwright/core';

import {createSmokeScenarios} from '../../../stories/tests-factory/create-smoke-scenarios';
import type {DisclosureProps} from '../Disclosure';
import {Disclosure} from '../Disclosure';

import {arrowPositionCases, disabledCases, sizeCases} from './cases';

test.describe('Disclosure', {tag: '@Disclosure'}, () => {
    smokeTest('smoke, collapsed', async ({mount, expectScreenshot}) => {
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

    smokeTest('smoke, expanded', async ({mount, expectScreenshot}) => {
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
