import {smokeTest, test} from '~playwright/core';

import {createSmokeScenarios} from '../../../stories/tests-factory/create-smoke-scenarios';
import type {LinkProps} from '../Link';
import {Link} from '../Link';

import {underlineCases, viewCases, visitableCases} from './cases';

test.describe('Link', {tag: '@Link'}, () => {
    smokeTest('', async ({mount, expectScreenshot}) => {
        const defaultProps: LinkProps = {
            href: '#',
            target: '_blank',
            children: 'Link',
        };

        const viewSmokeScenarios = createSmokeScenarios<LinkProps>(
            defaultProps,
            {
                view: viewCases,
            },
            {},
        );

        await mount(
            <div>
                {viewSmokeScenarios.map(([title, viewCaseProps]) => {
                    const fullSmokeScenarios = createSmokeScenarios<LinkProps>(viewCaseProps, {
                        underline: underlineCases,
                        visitable: visitableCases,
                    });

                    return (
                        <div key={title}>
                            <h2>{title}</h2>
                            {fullSmokeScenarios.map(([fullTitle, props]) => {
                                return (
                                    <div key={fullTitle}>
                                        <h4>{fullTitle}</h4>
                                        <div>
                                            <Link {...props} />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}
            </div>,
        );

        await expectScreenshot({});
    });
});
