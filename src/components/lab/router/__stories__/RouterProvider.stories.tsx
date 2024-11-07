import React from 'react';

import type {Meta, StoryObj} from '@storybook/react';

import {Link} from '../../../Link';
import {Flex} from '../../../layout';
import type {Href, RouterOptions} from '../../../types';
import {RouterProvider} from '../router';

const meta: Meta<typeof RouterProvider> = {
    title: 'Lab/RouterProvider',
    component: RouterProvider,
};

export default meta;

type Story = StoryObj<typeof RouterProvider>;

export const Default = {
    render: () => {
        /*
         * declare module '@gravity-ui/uikit' {
         *     interface RouterConfig {
         *          href: {to: string; params: Record<string, string>} | string;
         *          routerOptions: {replace?: boolean};
         *      }
         *  }
         */
        type HrefType = {to: string; params: Record<string, string>} | string;
        return (
            <RouterProvider
                navigate={(href, opts) => console.log('Navigate to: ', {href, opts})}
                useHref={(href: HrefType) =>
                    typeof href === 'string' ? href : href.to.replace('$pastId', href.params.pastId)
                }
            >
                <Flex gap={2} direction="column">
                    <Link
                        view="primary"
                        href={{to: '/posts/$pastId', params: {pastId: 'post-1'}} as unknown as Href}
                        routerOptions={{replace: true} as RouterOptions}
                    >
                        Post 1 (local link)
                    </Link>
                    <Link view="primary" href="https://gravity-ui.com">
                        Gravity UI (external link)
                    </Link>
                </Flex>
            </RouterProvider>
        );
    },
} satisfies Story;
