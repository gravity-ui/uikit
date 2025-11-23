import type {KeysetData} from '@gravity-ui/i18n';

import {i18n} from './i18n';

/**
 * Add keysets data for a specific language
 * @param language - language code
 * @param data - keyset data
 * @example
 * import {addLanguageKeysets} from '@gravity-ui/uikit/i18n';
 * import type {Keysets, PartialKeysets} from '@gravity-ui/uikit/i18n';
 *
 * // add all keysets data
 * addLanguageKeysets<Keysets>('rs', {
 *     Alert: {
 *         label_close: 'Затвори',
 *         // all other keys
 *     },
 *     // all other keysets
 * });
 *
 * // add some keysets data
 * addLanguageKeysets<PartialKeysets>('rs', {
 *     Alert: {
 *         label_close: 'Затвори',
 *     },
 * });
 */
export function addLanguageKeysets<Keyset extends KeysetData>(language: string, data: Keyset) {
    i18n.registerKeysets(language, data);
}
