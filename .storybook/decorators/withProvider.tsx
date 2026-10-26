import type {Decorator} from '@storybook/react-webpack5';

import {Platform, Provider} from '../../src';

export const WithProvider: Decorator = (Story, context) => {
    return (
        <Provider
            theme={context.globals.theme}
            direction={context.globals.direction}
            mobile={context.globals.platform === 'mobile'}
            platform={Platform.BROWSER}
        >
            <Story key={context.globals.platform} {...context} />
        </Provider>
    );
};
