import type {Decorator} from '@storybook/react-webpack5';

import {ThemeProvider} from '../../src';

export const WithTheme: Decorator = (Story, context) => {
    return (
        <ThemeProvider theme={context.globals.theme} direction={context.globals.direction}>
            <Story {...context} />
        </ThemeProvider>
    );
};
