import i18n from '../components/ActionsPanel/i18n';
import {configure} from '../utils/configure';

import {addLanguageKeysets} from './addLanguageKeysets';
import type {PartialKeysets} from './types';

describe('addLanguageKeysets', () => {
    test('allow set partial translations', () => {
        addLanguageKeysets<PartialKeysets>('fr', {ActionsPanel: {label_close: 'Fermer'}});
        configure({lang: 'fr'});
        expect(i18n('label_close')).toBe('Fermer');
    });
});
