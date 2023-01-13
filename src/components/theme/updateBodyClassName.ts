import {block, modsClassName} from '../utils/cn';
import {ROOT_CLASS_NAME} from './constants';
import {RealTheme} from './types';

const b = block(ROOT_CLASS_NAME);
const rootClassName = b();

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

    const parsedCustomRootClassNames = customRootClassName.split(' ');
    parsedCustomRootClassNames.forEach((cls) => {
        if (cls && !bodyEl.classList.contains(cls)) {
            bodyEl.classList.add(cls);
        }
    });

    [...bodyEl.classList].forEach((cls) => {
        if (cls.startsWith(modsClassName(b({theme: true})))) {
            bodyEl.classList.remove(cls);
        }
    });
    bodyEl.classList.add(modsClassName(b({theme: newTheme})));

    for (const [key, value] of Object.entries({...defaultModifiers, ...modifiers})) {
        bodyEl.classList.toggle(modsClassName(b({[key]: true})), value);
    }
}
