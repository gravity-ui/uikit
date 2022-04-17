import {i18n, I18N} from '../../../i18n';
import en from './en.json';
import ru from './ru.json';

const COMPONENT = 'Stories';

i18n.registerKeyset(I18N.LANGS.en, COMPONENT, en);
i18n.registerKeyset(I18N.LANGS.ru, COMPONENT, ru);

export default i18n.keyset(COMPONENT);
