import {i18n} from '../../../i18n';
import {Lang} from '../../utils/configure';
import en from './en.json';
import ru from './ru.json';

const COMPONENT = 'Stories';

i18n.registerKeyset(Lang.En, COMPONENT, en);
i18n.registerKeyset(Lang.Ru, COMPONENT, ru);

export default i18n.keyset(COMPONENT);
