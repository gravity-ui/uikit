import React from 'react';

import type {Decorator} from '@storybook/react';

import {type Lang, configure} from '../../src';

export const WithLang: Decorator = (Story, context) => {
    const lang = context.globals.lang;

    configure({
        lang: lang as Lang,
    });

    return <Story key={lang} {...context} />;
};
