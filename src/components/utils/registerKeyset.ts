import {i18n} from '../../i18n';
import {Lang} from './configure';

type KeysData = Parameters<typeof i18n.registerKeyset>[2];

export function registerKeyset<T extends KeysData>(data: Record<Lang, T>, keysetName: string) {
    Object.entries(data).forEach(([lang, keys]) => i18n.registerKeyset(lang, keysetName, keys));

    return i18n.keyset(keysetName);
}
