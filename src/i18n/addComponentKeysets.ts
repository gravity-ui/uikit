import type {KeyData, KeysData} from '@gravity-ui/i18n';

import {i18n} from './i18n';

/**
 * Add component's keysets data
 *
 * @param data - keysets data by languages
 * @param componentName - name of the component
 * @returns function to get keys' translations for current language
 *
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
    const t = i18n.keyset<TKey>(componentName);

    return t as typeof t & {
        /**
         * Keyset data is used only for type inference, the value is always undefined.
         */
        keysetData: {[Key in Name]: Record<TKey, KeyData>};
    };
}
