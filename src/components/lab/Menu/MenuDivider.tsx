import {Divider} from '../../Divider';
import {block} from '../../utils/cn';

import './MenuDivider.scss';

const b = block('lab-menu-divider');

export function MenuDivider() {
    return <Divider className={b()} />;
}

MenuDivider.displayName = 'Menu.Divider';
