import React from 'react';
import {Story as StoryType, StoryContext} from '@storybook/react';
import {Lang, configure} from '../../src/components/utils/configure';

export function withLang(Story: StoryType, context: StoryContext) {
    const lang = context.globals.lang;

    configure({
        lang: lang as Lang,
    });

    return <Story key={lang} {...context} />;
}
