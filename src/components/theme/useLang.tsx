import * as React from 'react';

import {useSyncExternalStore} from 'use-sync-external-store/shim';

import type {StringWithSuggest} from '../../types/utils';
import type {Lang} from '../../utils/configure';
import {getConfig, subscribeConfigure} from '../../utils/configure';

export interface LangOptions {
    lang: StringWithSuggest<Lang>;
    fallbackLang: StringWithSuggest<Lang>;
}

export const defaultLangOptions: LangOptions = {lang: 'en', fallbackLang: 'en'};

export const LangContext = React.createContext<LangOptions | undefined>(undefined);

export function useLang(): LangOptions {
    const config = useSyncExternalStore(subscribeConfigure, getConfig, getConfig);

    const context = React.useContext(LangContext);

    return context || config;
}
