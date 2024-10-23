import React from 'react';

import type {Decorator} from '@storybook/react';

import {configure} from '../../src';

export const WithLang: Decorator = (Story, context) => {
    const lang = context.globals.lang;

    configure({lang});

    return <Story key={lang} {...context} />;
};
