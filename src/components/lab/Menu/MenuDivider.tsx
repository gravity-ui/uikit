import {block} from '../../utils/cn';

import './MenuDivider.scss';

const b = block('menu2-divider');

export function MenuDivider() {
    return <div className={b()} />;
}

MenuDivider.displayName = 'Menu.Divider';
