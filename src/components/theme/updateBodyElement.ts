import {block, blockNew, modsClassName} from '../utils/cn';

import {DEFAULT_DIRECTION, ROOT_CLASS_NAME} from './constants';
import type {Direction, RealTheme} from './types';

const b = block(ROOT_CLASS_NAME);
const bNew = blockNew(ROOT_CLASS_NAME);
const rootClassName = b();
const rootNewClassName = bNew();

interface Props {
    theme: RealTheme;
    direction: Direction;
    nativeScrollbar?: boolean;
    className?: string;
}

export function updateBodyElement({theme, direction, nativeScrollbar = false, className}: Props) {
    const bodyEl = document.body;

    if (!bodyEl.classList.contains(rootClassName)) {
        bodyEl.classList.add(rootClassName);
    }

    if (!bodyEl.classList.contains(rootNewClassName)) {
        bodyEl.classList.add(rootNewClassName);
    }

    if (className) {
        const parsedCustomRootClassNames = className.split(' ');
        parsedCustomRootClassNames.forEach((cls) => {
            if (cls && !bodyEl.classList.contains(cls)) {
                bodyEl.classList.add(cls);
            }
        });
    }

    [...bodyEl.classList].forEach((cls) => {
        if (cls.startsWith(modsClassName(b({theme: true})))) {
            bodyEl.classList.remove(cls);
        }

        if (cls.startsWith(modsClassName(bNew({theme: true})))) {
            bodyEl.classList.remove(cls);
        }
    });
    bodyEl.classList.add(modsClassName(b({theme})));
    bodyEl.classList.add(modsClassName(bNew({theme})));

    const modifiers = {
        'native-scrollbar': nativeScrollbar,
    };

    for (const [key, value] of Object.entries(modifiers)) {
        bodyEl.classList.toggle(modsClassName(b({[key]: true})), value);
        bodyEl.classList.toggle(modsClassName(bNew({[key]: true})), value);
    }

    if (direction === DEFAULT_DIRECTION) {
        bodyEl.removeAttribute('dir');
    } else {
        bodyEl.setAttribute('dir', direction);
    }
}
