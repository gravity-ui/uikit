import {I18N} from '@gravity-ui/i18n';

import {getConfig, subscribeConfigure} from '../utils/configure';

const {lang, fallbackLang} = getConfig();

export const i18n = new I18N({lang, fallbackLang});

subscribeConfigure((config) => {
    i18n.setLang(config.lang);
    i18n.setFallbackLang(config.fallbackLang);
});
