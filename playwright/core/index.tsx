import React from 'react';

import type {JsonObject} from '@playwright/experimental-ct-core/types/component';
import {ComponentFixtures, MountOptions, test as base} from '@playwright/experimental-ct-react';

type CoreFixtures = {
    mountWithWrapper: ComponentFixtures['mount'];
};

export const test = base.extend<CoreFixtures>({
    mountWithWrapper: async ({mount: baseMount}, use) => {
        const mount = async (
            component: JSX.Element,
            options?: MountOptions<JsonObject> | undefined,
        ) => {
            return await baseMount(
                <div style={{padding: 20, width: 'fit-content', height: 'fit-content'}}>
                    {component}
                </div>,
                options,
            );
        };

        await use(mount);
    },
});
