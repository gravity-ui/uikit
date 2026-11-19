'use client';

import * as React from 'react';

import {LangContext, defaultLangOptions} from './useLang';
import type {LangOptions} from './useLang';

export interface LangProviderProps extends React.PropsWithChildren<{}>, Partial<LangOptions> {}

export function LangProvider({children, lang, fallbackLang}: LangProviderProps) {
    const parentOptions = React.useContext(LangContext);
    const value = React.useMemo(
        () =>
            lang || fallbackLang
                ? {
                      ...defaultLangOptions,
                      ...parentOptions,
                      ...(lang ? {lang} : undefined),
                      ...(fallbackLang ? {fallbackLang} : undefined),
                  }
                : parentOptions,
        [parentOptions, lang, fallbackLang],
    );

    return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

LangProvider.displayName = 'LangProvider';
