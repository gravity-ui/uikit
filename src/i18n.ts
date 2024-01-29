import {I18N} from '@gravity-ui/i18n';

import {getConfig, subscribeConfigure} from './components/utils/configure';

const configLang = getConfig().lang;

export const i18n = new I18N({lang: configLang, fallbackLang: configLang});

subscribeConfigure((config) => {
    i18n.setLang(config.lang);
});
