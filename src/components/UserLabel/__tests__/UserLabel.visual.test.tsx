import {smokeTest, test} from '~playwright/core';

import {createSmokeScenarios} from '../../../stories/tests-factory/create-smoke-scenarios';
import type {UserLabelProps} from '../types';

import {
    childrenCases,
    onClickCases,
    onCloseClickCases,
    sizeCases,
    typeCases,
    viewCases,
} from './cases';
import {TestUserLabel, TestUserLabelWithEmail, TestUserLabelWithPerson} from './helpers';

test.describe('UserLabel', {tag: '@UserLabel'}, () => {
    smokeTest('user', async ({mount, expectScreenshot}) => {
        const smokeScenarios = createSmokeScenarios<Partial<UserLabelProps>>(
            {},
            {
                size: sizeCases,
                view: viewCases,
                type: typeCases,
                children: childrenCases,
                onClick: onClickCases,
                onCloseClick: onCloseClickCases,
            },
        );

        await mount(
            <div>
                {smokeScenarios.map(([title, props]) => (
                    <div key={title}>
                        <h4>{title}</h4>
                        <div>
                            <TestUserLabel {...props} />
                        </div>
                    </div>
                ))}
            </div>,
        );

        await expectScreenshot({
            themes: ['light'],
        });
    });

    smokeTest('person', async ({mount, expectScreenshot}) => {
        const smokeScenarios = createSmokeScenarios<Partial<UserLabelProps>>(
            {},
            {
                size: sizeCases,
                view: viewCases,
                children: childrenCases,
                onClick: onClickCases,
                onCloseClick: onCloseClickCases,
            },
        );

        await mount(
            <div>
                {smokeScenarios.map(([title, props]) => (
                    <div key={title}>
                        <h4>{title}</h4>
                        <div>
                            <TestUserLabelWithPerson {...props} />
                        </div>
                    </div>
                ))}
            </div>,
        );

        await expectScreenshot({
            themes: ['light'],
        });
    });

    smokeTest('email', async ({mount, expectScreenshot}) => {
        const smokeScenarios = createSmokeScenarios<Partial<UserLabelProps>>(
            {},
            {
                size: sizeCases,
                view: viewCases,
                children: childrenCases,
                onClick: onClickCases,
                onCloseClick: onCloseClickCases,
            },
        );

        await mount(
            <div>
                {smokeScenarios.map(([title, props]) => (
                    <div key={title}>
                        <h4>{title}</h4>
                        <div>
                            <TestUserLabelWithEmail {...props} />
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
