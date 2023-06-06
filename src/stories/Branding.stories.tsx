import React from 'react';

import type {Meta, StoryFn} from '@storybook/react';

import {Branding} from '../demo/Branding/Branding';
import type {BrandingProps} from '../demo/Branding/Branding';

export default {
    title: 'Branding',
    component: Branding,
    args: {
        brand: 'red',
    },
    argTypes: {
        brand: {
            name: 'Color\u00a0scheme',
            type: {name: 'enum', value: ['blue', 'red', 'yellow']},
        },
    },
} as Meta<BrandingProps>;

export const Example: StoryFn<BrandingProps> = (args) => <Branding {...args} />;

Example.decorators = [
    (Story, ctx) => {
        const brand = ctx.args.brand;

        React.useLayoutEffect(() => {
            const className = `yc-root_brand_${brand}`;
            if (brand) {
                document.body.classList.add(className);
            }

            return () => {
                if (brand) {
                    document.body.classList.remove(className);
                }
            };
        }, [brand]);

        return <Story />;
    },
];
