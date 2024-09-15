import {test as base} from '@playwright/experimental-ct-react';

import {BASE_SMOKE_SCENARIO_DETAILS} from '../../src/stories/tests-factory/constants';

import {expectScreenshotFixture} from './expectScreenshotFixture';
import {mountFixture} from './mountFixture';
import type {Fixtures} from './types';

export const test = base.extend<Fixtures>({
    mount: mountFixture,
    expectScreenshot: expectScreenshotFixture,
});

export {expect} from '@playwright/experimental-ct-react';

export const smokeTest = (testSuffix: string, body: Parameters<typeof test>[2]) => {
    test.skip(({browserName}) => {
        return browserName !== 'chromium';
    }, 'Smoke test is only relevant in Chrome');

    test(`smoke ${testSuffix}`, BASE_SMOKE_SCENARIO_DETAILS, body);
};
