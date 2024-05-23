import React from 'react';

import type {MountFixture, PlaywrightFixture} from './types';

export const mountFixture: PlaywrightFixture<MountFixture> = async ({mount: baseMount}, use) => {
    const mount: MountFixture = async (component, options) => {
        const {wrapDivStyles, ...restOptions} = options || {};

        return await baseMount(
            <div
                style={{padding: 20, width: 'fit-content', height: 'fit-content', ...wrapDivStyles}}
                className="playwright-wrapper-test"
            >
                {component}
            </div>,
            restOptions,
        );
    };

    await use(mount);
};
