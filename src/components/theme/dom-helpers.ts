import {block, modsClassName} from '../utils/cn';

import {DEFAULT_DIRECTION, ROOT_CLASSNAME} from './constants';
import type {Direction, RealTheme} from './types';

const b = block(ROOT_CLASSNAME);
const rootClassName = b();

export function updateBodyClassName({
    theme,
    className,
    prevClassName,
}: {
    theme: RealTheme;
    className?: string;
    prevClassName?: string;
}) {
    const bodyEl = document.body;

    // https://html.spec.whatwg.org/multipage/dom.html#dom-document-body-dev
    if (!bodyEl) {
        return;
    }

    if (!bodyEl.classList.contains(rootClassName)) {
        bodyEl.classList.add(rootClassName);
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
        if (cls.startsWith(modsClassName(b({theme: true})))) {
            bodyEl.classList.remove(cls);
        }
    });
    bodyEl.classList.add(modsClassName(b({theme})));
}

export function updateBodyDirection(direction: Direction) {
    const bodyEl = document.body;

    // https://html.spec.whatwg.org/multipage/dom.html#dom-document-body-dev
    if (!bodyEl) {
        return;
    }

    if (direction === DEFAULT_DIRECTION) {
        bodyEl.removeAttribute('dir');
    } else {
        bodyEl.setAttribute('dir', direction);
    }
}

export const supportsMatchMedia =
    typeof window !== 'undefined' && typeof window.matchMedia === 'function';

export const getDarkMediaMatch = () => window.matchMedia('(prefers-color-scheme: dark)');

export function getSystemTheme() {
    if (supportsMatchMedia) {
        return getDarkMediaMatch().matches ? 'dark' : 'light';
    } else {
        return 'light';
    }
}
