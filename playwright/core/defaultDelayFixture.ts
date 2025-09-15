import type {PlaywrightFixture} from './types';

const DEFAULT_MOUNT_TEST_DELAY_MS = 1000;

export const defaultDelayFixture: PlaywrightFixture<() => Promise<void>> = async ({page}, use) => {
    const defaultDelay = async () => await page.waitForTimeout(DEFAULT_MOUNT_TEST_DELAY_MS);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    await use(defaultDelay);
};
