import {modsClassName} from '../utils/cn';

import {DEFAULT_DIRECTION} from './constants';
import {getDeprecatedRootClassName, getRootClassName} from './getBodyClassName';
import type {Direction, RealTheme} from './types';

const rootClassName = getDeprecatedRootClassName();
const rootNewClassName = getRootClassName();

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

    if (!bodyEl.classList.contains(rootNewClassName)) {
        bodyEl.classList.add(rootNewClassName);
    }

    if (prevClassName) {
        const parsedPrevCustomRootClassNames = prevClassName.split(' ');
        parsedPrevCustomRootClassNames.forEach((cls) => {
            if (cls) {
                bodyEl.classList.remove(cls);
            }
        });
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
        if (cls.startsWith(modsClassName(getDeprecatedRootClassName({theme: true})))) {
            bodyEl.classList.remove(cls);
        }

        if (cls.startsWith(modsClassName(getRootClassName({theme: true})))) {
            bodyEl.classList.remove(cls);
        }
    });
    bodyEl.classList.add(modsClassName(getDeprecatedRootClassName({theme})));
    bodyEl.classList.add(modsClassName(getRootClassName({theme})));

    const modifiers = {
        'native-scrollbar': nativeScrollbar,
    };

    for (const [key, value] of Object.entries(modifiers)) {
        bodyEl.classList.toggle(modsClassName(getDeprecatedRootClassName({[key]: true})), value);
        bodyEl.classList.toggle(modsClassName(getRootClassName({[key]: true})), value);
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
