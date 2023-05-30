import {I18N} from '@gravity-ui/i18n';

import {getConfig, subscribeConfigure} from './components/utils/configure';

export const i18n = new I18N();

i18n.setLang(getConfig().lang);

subscribeConfigure((config) => {
    i18n.setLang(config.lang);
});
