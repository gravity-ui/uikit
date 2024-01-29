import React from 'react';

import type {Decorator} from '@storybook/react';

import {configure} from '../../src';
import type {Lang} from '../../src';

export const WithLang: Decorator = (Story, context) => {
    const lang = context.globals.lang;

    configure({
        lang: lang as Lang,
    });

    return <Story key={lang} {...context} />;
};
