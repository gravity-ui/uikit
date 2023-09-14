import React from 'react';

import {DirectionProvider} from '@radix-ui/react-direction';
import type {Decorator} from '@storybook/react';

export const WithDirection: Decorator = (Story, context) => {
    const dir = context.globals.direction;

    return (
        <DirectionProvider dir={dir}>
            <div dir={dir}>
                <Story {...context} />
            </div>
        </DirectionProvider>
    );
};
