import {I18N} from '@yandex-cloud/i18n';
import {getConfig, subscribeConfigure, Lang} from './components/utils/configure';

export const i18n = new I18N();

// @TODO remove in major version
if (getConfig().lang) {
    i18n.setLang(getConfig().lang as Lang);
}

// @TODO uncomment in major version
// i18n.setLang(getConfig().lang || Lang.En);

subscribeConfigure((config) => {
    if (config.lang) {
        i18n.setLang(config.lang);
    }
});
