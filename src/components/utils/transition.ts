import type {NoStrictEntityMods} from '@bem-react/classname';

import {modsClassName} from './cn';
import type {CnBlock} from './cn';

export function getCSSTransitionClassNames(b: CnBlock, mods?: NoStrictEntityMods) {
    return {
        appear: modsClassName(b({...mods, appear: true})),
        appearActive: modsClassName(b({...mods, appear: 'active'})),
        appearDone: modsClassName(b({...mods, appear: 'done'})),
        enter: modsClassName(b({...mods, enter: true})),
        enterActive: modsClassName(b({...mods, enter: 'active'})),
        enterDone: modsClassName(b({...mods, enter: 'done'})),
        exit: modsClassName(b({...mods, exit: true})),
        exitActive: modsClassName(b({...mods, exit: 'active'})),
        exitDone: modsClassName(b({...mods, exit: 'done'})),
    };
}
