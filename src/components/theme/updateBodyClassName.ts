import {block, blockNew, modsClassName} from '../utils/cn';

import {ROOT_CLASS_NAME} from './constants';
import type {RealTheme} from './types';

const b = block(ROOT_CLASS_NAME);
const bNew = blockNew(ROOT_CLASS_NAME);
const rootClassName = b();
const rootNewClassName = bNew();

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
        if (cls.startsWith(modsClassName(b({theme: true})))) {
            bodyEl.classList.remove(cls);
        }

        if (cls.startsWith(modsClassName(bNew({theme: true})))) {
            bodyEl.classList.remove(cls);
        }
    });
    bodyEl.classList.add(modsClassName(b({theme: newTheme})));
    bodyEl.classList.add(modsClassName(bNew({theme: newTheme})));

    for (const [key, value] of Object.entries({...defaultModifiers, ...modifiers})) {
        bodyEl.classList.toggle(modsClassName(b({[key]: true})), value);
        bodyEl.classList.toggle(modsClassName(bNew({[key]: true})), value);
    }
}
