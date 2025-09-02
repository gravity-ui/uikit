import * as React from 'react';

import type {KeyData, KeysData} from '@gravity-ui/i18n';

import {useLang} from '../components/theme/useLang';

import {i18n} from './i18n';

/**
 * Add component's keysets data
 * @param data - keysets data by languages
 * @param componentName - name of the component
 * @returns function to get keys' translations for current language
 * @example
 * ```
 * import {addComponentKeysets} from '@gravity-ui/uikit/i18n';
 * import en from './en.json';
 * import ru from './ru.json';
 *
 * const t = addComponentKeysets({en, ru}, 'Alert');
 *
 * console.log(t('label_close')); // 'Close'
 * ```
 */
export function addComponentKeysets<const T extends KeysData, const Name extends string>(
    data: Record<string, T>,
    componentName: Name,
) {
    Object.entries(data).forEach(([lang, keys]) => i18n.registerKeyset(lang, componentName, keys));

    type TKey = Extract<keyof T, string>;
    const translateFunction = i18n.keyset<TKey>(componentName);

    type TType = typeof translateFunction;

    const useTranslation: () => {t: TType} = () => {
        const langConfig = useLang();
        const {lang = 'en', fallbackLang = 'en'} = i18n;
        const t = React.useCallback<TType>(
            (...params) => {
                i18n.setLang(langConfig.lang);
                i18n.setFallbackLang(langConfig.fallbackLang);
                const result = translateFunction(...params);
                i18n.setLang(lang);
                i18n.setFallbackLang(fallbackLang);
                return result;
            },
            [fallbackLang, lang, langConfig.fallbackLang, langConfig.lang],
        );
        return {t};
    };
    Object.assign(translateFunction, {
        useTranslation,
        Translation: ({children}: {children: (props: {t: TType}) => React.ReactNode}) => {
            return children(useTranslation());
        },
    });

    return translateFunction as TType & {
        Translation: React.ComponentType<{children: (props: {t: TType}) => React.ReactNode}>;
        useTranslation: () => {t: TType};
        /**
         * Keyset data is used only for type inference, the value is always undefined.
         */
        keysetData: {[Key in Name]: Record<TKey, KeyData>};
    };
}
