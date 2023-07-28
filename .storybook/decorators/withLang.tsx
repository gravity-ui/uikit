import React from 'react';

import {DirectionProvider} from '@radix-ui/react-direction';
import type {Decorator} from '@storybook/react';

import {Lang, configure} from '../../src';

export const WithLang: Decorator = (Story, context) => {
    const lang = context.globals.lang;

    configure({
        lang: lang as Lang,
    });

    return <Story key={lang} {...context} />;
};

export const WithDirection: Decorator = (Story, context) => {
    const dir = context.globals.direction;

    // configure({
    //     lang: lang as Lang,
    // });

    return (
        <DirectionProvider dir={dir}>
            <div dir={dir}>
                <Story {...context} />
            </div>
        </DirectionProvider>
    );

    // return <Story key={lang} {...context} />;
};
