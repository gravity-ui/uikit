import type {Decorator} from '@storybook/react-webpack5';

import {MobileProvider} from '../../src';

export const WithMobile: Decorator = (Story, context) => {
    const platform = context.globals.platform;

    return (
        <MobileProvider mobile={platform === 'mobile'} platform={platform}>
            <Story key={platform} {...context} />
        </MobileProvider>
    );
};
