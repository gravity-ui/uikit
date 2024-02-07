import {block, modsClassName} from '../utils/cn';

import {DEFAULT_DIRECTION, ROOT_CLASSNAME} from './constants';
import type {Direction, RealTheme} from './types';

const b = block(ROOT_CLASSNAME);
const rootClassName = b();

export function updateBodyClassName({
    theme,
    nativeScrollbar = false,
    className,
    prevClassName,
}: {
    theme: RealTheme;
    nativeScrollbar?: boolean;
    className?: string;
    prevClassName?: string;
}) {
    const bodyEl = document.body;

    if (!bodyEl.classList.contains(rootClassName)) {
        bodyEl.classList.add(rootClassName);
    }

    if (className) {
        const parsedCustomRootClassNames = className.split(' ');
        parsedCustomRootClassNames.forEach((cls) => {
            if (cls && !bodyEl.classList.contains(cls)) {
                bodyEl.classList.add(cls);
            }
        });
    }

    if (prevClassName) {
        const parsedPrevCustomRootClassNames = prevClassName.split(' ');
        parsedPrevCustomRootClassNames.forEach((cls) => {
            if (cls) {
                bodyEl.classList.remove(cls);
            }
        });
    }

    [...bodyEl.classList].forEach((cls) => {
        if (cls.startsWith(modsClassName(b({theme: true})))) {
            bodyEl.classList.remove(cls);
        }
    });
    bodyEl.classList.add(modsClassName(b({theme})));

    const modifiers = {
        'native-scrollbar': nativeScrollbar,
    };

    for (const [key, value] of Object.entries(modifiers)) {
        bodyEl.classList.toggle(modsClassName(b({[key]: true})), value);
    }
}

export function updateBodyDirection(direction: Direction) {
    const bodyEl = document.body;

    if (direction === DEFAULT_DIRECTION) {
        bodyEl.removeAttribute('dir');
    } else {
        bodyEl.setAttribute('dir', direction);
    }
}
