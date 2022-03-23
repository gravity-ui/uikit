import React from 'react';
import {Story as StoryType, StoryContext} from '@storybook/react';
import {I18N} from '@yandex-cloud/i18n';

export function withLang(Story: StoryType, context: StoryContext) {
    const lang = context.globals.lang;

    I18N.setDefaultLang(lang);

    return <Story key={lang} {...context} />;
}
