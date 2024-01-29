import React from 'react';

import type {JsonObject} from '@playwright/experimental-ct-core/types/component';
import {test as base} from '@playwright/experimental-ct-react';
import type {MountOptions} from '@playwright/experimental-ct-react';

export const test = base.extend({
    mount: async ({mount: baseMount}, use) => {
        const mount = async (
            component: React.JSX.Element,
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
