import {resolve} from 'path';

import type {PlaywrightTestConfig} from '@playwright/experimental-ct-react';
import {defineConfig, devices} from '@playwright/experimental-ct-react';
import react from '@vitejs/plugin-react';

function pathFromRoot(p: string) {
    return resolve(__dirname, '../', p);
}

const reporter: PlaywrightTestConfig['reporter'] = [];

reporter.push(
    ['list'],
    [
        'html',
        {
            open: process.env.CI ? 'never' : 'on-failure',
            outputFolder: resolve(process.cwd(), 'playwright-report'),
        },
    ],
);

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig = {
    testDir: pathFromRoot('src'),
    testMatch: '**/__tests__/*.visual.test.tsx',
    updateSnapshots: process.env.UPDATE_REQUEST ? 'all' : 'missing',
    snapshotPathTemplate:
        '{testDir}/{testFileDir}/../__snapshots__/{testFileName}-snapshots/{arg}{-projectName}-linux{ext}',
    /* The base directory, relative to the config file, for snapshot files created with toMatchSnapshot and toHaveScreenshot. */
    /* Maximum time one test can run for. */
    timeout: 10 * 1000,
    /* Run tests in files in parallel */
    fullyParallel: true,
    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: Boolean(process.env.CI),
    /* Retry on CI only */
    retries: process.env.CI ? 2 : 0,
    /* Opt out of parallel tests on CI. */
    workers: process.env.CI ? 8 : undefined,
    /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    reporter,
    /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
    use: {
        testIdAttribute: 'data-qa',
        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
        trace: 'on-first-retry',
        headless: true,
        /* Port to use for Playwright component endpoint. */
        screenshot: 'only-on-failure',
        timezoneId: 'UTC',
        ctViteConfig: {plugins: [react()]},
    },
    /* Configure projects for major browsers */
    projects: [
        {
            name: 'chromium',
            use: {...devices['Desktop Chrome']},
        },
        {
            name: 'webkit',
            use: {...devices['Desktop Safari']},
        },
    ],
};

export default defineConfig(config);
