import React from 'react';

import type {JsonObject} from '@playwright/experimental-ct-core/types/component';
import {ComponentFixtures, MountOptions, test as base} from '@playwright/experimental-ct-react';

type CustomFixtures = {
    mount: ComponentFixtures['mount'];
};

export const test = base.extend<CustomFixtures>({
    mount: async ({mount: baseMount}, use) => {
        const mount = async (
            component: JSX.Element,
            options?: MountOptions<JsonObject> | undefined,
        ) => {
            return baseMount(
                <div style={{padding: 20, width: 'fit-content', height: 'fit-content'}}>
                    {component}
                </div>,
                options,
            );
        };

        await use(mount);
    },
});
