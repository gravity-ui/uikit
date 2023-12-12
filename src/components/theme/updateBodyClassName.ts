import {modsClassName} from '../utils/cn';

import {getBodyRootClassName, getDeprecatedBodyRootClassName} from './getBodyClassName';
import type {RealTheme} from './types';

const rootClassName = getDeprecatedBodyRootClassName();
const rootNewClassName = getBodyRootClassName();

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
) {
    const bodyEl = document.body;

    if (!bodyEl.classList.contains(rootClassName)) {
        bodyEl.classList.add(rootClassName);
    }

    if (!bodyEl.classList.contains(rootNewClassName)) {
        bodyEl.classList.add(rootNewClassName);
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
        if (cls.startsWith(modsClassName(getDeprecatedBodyRootClassName({theme: true})))) {
            bodyEl.classList.remove(cls);
        }

        if (cls.startsWith(modsClassName(getBodyRootClassName({theme: true})))) {
            bodyEl.classList.remove(cls);
        }
    });
    bodyEl.classList.add(modsClassName(getDeprecatedBodyRootClassName({theme: newTheme})));
    bodyEl.classList.add(modsClassName(getBodyRootClassName({theme: newTheme})));

    for (const [key, value] of Object.entries({...defaultModifiers, ...modifiers})) {
        bodyEl.classList.toggle(
            modsClassName(getDeprecatedBodyRootClassName({[key]: true})),
            value,
        );
        bodyEl.classList.toggle(modsClassName(getBodyRootClassName({[key]: true})), value);
    }
}
