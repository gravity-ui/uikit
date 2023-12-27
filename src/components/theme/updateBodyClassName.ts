import {modsClassName} from '../utils/cn';

import {getDeprecatedRootClassName, getRootClassName} from './getBodyClassName';
import type {RealTheme} from './types';

const rootClassName = getDeprecatedRootClassName();
const rootNewClassName = getRootClassName();

export type BodyClassNameModifiers = {
    'native-scrollbar': boolean;
};

const defaultModifiers: BodyClassNameModifiers = {
    'native-scrollbar': false,
};

export function updateBodyClassName(
    newTheme: RealTheme,
    modifiers?: Partial<BodyClassNameModifiers>,
    customRootClassName?: string,
    prevCustomRootClassName?: string,
) {
    const bodyEl = document.body;

    if (!bodyEl.classList.contains(rootClassName)) {
        bodyEl.classList.add(rootClassName);
    }

    if (!bodyEl.classList.contains(rootNewClassName)) {
        bodyEl.classList.add(rootNewClassName);
    }

    if (prevCustomRootClassName) {
        const parsedPrevCustomRootClassNames = prevCustomRootClassName.split(' ');
        parsedPrevCustomRootClassNames.forEach((cls) => {
            if (cls) {
                bodyEl.classList.remove(cls);
            }
        });
    }

    if (customRootClassName) {
        const parsedCustomRootClassNames = customRootClassName.split(' ');
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
    bodyEl.classList.add(modsClassName(getDeprecatedRootClassName({theme: newTheme})));
    bodyEl.classList.add(modsClassName(getRootClassName({theme: newTheme})));

    for (const [key, value] of Object.entries({...defaultModifiers, ...modifiers})) {
        bodyEl.classList.toggle(modsClassName(getDeprecatedRootClassName({[key]: true})), value);
        bodyEl.classList.toggle(modsClassName(getRootClassName({[key]: true})), value);
    }
}
