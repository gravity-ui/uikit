import {i18n} from '../../i18n';
import {Lang} from './configure';

import type {KeysData} from '@gravity-ui/i18n';

export function registerKeyset<T extends KeysData>(data: Record<Lang, T>, keysetName: string) {
    Object.entries(data).forEach(([lang, keys]) => i18n.registerKeyset(lang, keysetName, keys));

    type TKey = Extract<keyof T, string>;
    return i18n.keyset<TKey>(keysetName);
}
