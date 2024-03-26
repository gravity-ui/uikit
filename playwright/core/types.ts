import type {JsonObject} from '@playwright/experimental-ct-core/types/component';
import type {MountOptions, MountResult} from '@playwright/experimental-ct-react';
import type {
    Locator,
    PageScreenshotOptions,
    PlaywrightTestArgs,
    PlaywrightTestOptions,
    PlaywrightWorkerArgs,
    PlaywrightWorkerOptions,
    TestFixture,
} from '@playwright/test';

interface ComponentFixtures {
    mount<HooksConfig extends JsonObject>(
        component: JSX.Element,
        options?: MountOptions<HooksConfig>,
    ): Promise<MountResult>;
}

type PlaywrightTestFixtures = PlaywrightTestArgs & PlaywrightTestOptions & ComponentFixtures;
type PlaywrightWorkerFixtures = PlaywrightWorkerArgs & PlaywrightWorkerOptions;
type PlaywrightFixtures = PlaywrightTestFixtures & PlaywrightWorkerFixtures;
export type PlaywrightFixture<T> = TestFixture<T, PlaywrightFixtures>;

export type Fixtures = {
    mount: MountFixture;
    expectScreenshot: ExpectScreenshotFixture;
};

export type MountFixture = ComponentFixtures['mount'];

export interface ExpectScreenshotFixture {
    (props?: CaptureScreenshotParams): Promise<void>;
}

interface CaptureScreenshotParams extends PageScreenshotOptions {
    screenshotName?: string;
    component?: Locator;
}
