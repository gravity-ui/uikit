import {addComponentKeysets} from '../../../utils/addComponentKeysets';

import en from './en.json';
import ru from './ru.json';

const COMPONENT = 'passwordInput';

export const i18n = addComponentKeysets({en, ru}, COMPONENT);
