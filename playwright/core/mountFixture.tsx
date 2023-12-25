import React from 'react';

import type {JsonObject} from '@playwright/experimental-ct-core/types/component';
import type {MountOptions} from '@playwright/experimental-ct-react';

import type {MountFixture, PlaywrightFixture} from './types';

export const mountFixture: PlaywrightFixture<MountFixture> = async ({mount: baseMount}, use) => {
    const mount = async (
        component: JSX.Element,
        options?: MountOptions<JsonObject> | undefined,
    ) => {
        return await baseMount(
            <div
                style={{padding: 20, width: 'fit-content', height: 'fit-content'}}
                className="playwright-wrapper-test"
            >
                {component}
            </div>,
            options,
        );
    };

    await use(mount);
};
