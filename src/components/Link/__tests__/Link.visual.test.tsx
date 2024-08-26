import React from 'react';

import {test} from '~playwright/core';

import {createSmokeScenarios} from '../../../stories/tests-factory/create-smoke-scenarios';
import type {LinkProps} from '../Link';
import {Link} from '../Link';

import {underlineCases, viewCases, visitableCases} from './cases';

test.describe('Link', {tag: '@Link'}, () => {
    const defaultProps: LinkProps = {
        href: '#',
        target: '_blank',
        children: 'Link',
    };

    createSmokeScenarios<LinkProps>(defaultProps, {
        underline: underlineCases,
        visitable: visitableCases,
        view: viewCases,
    }).forEach(([title, details, props]) => {
        test(title, details, async ({mount, expectScreenshot}) => {
            await mount(<Link {...props} />);

            await expectScreenshot();
        });
    });
});
