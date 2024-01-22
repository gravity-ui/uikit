import React from 'react';

import type {Decorator} from '@storybook/react';

export const WithStrictMode: Decorator = (Story, context) => {
    const children = <Story {...context} />;

    if (context.parameters?.disableStrictMode) {
        return children;
    }

    return <React.StrictMode>{children}</React.StrictMode>;
};
