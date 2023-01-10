import {block, modsClassName} from '../utils/cn';
import {RealTheme} from './types';

const b = block('root');
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
) {
    const bodyEl = document.body;

    if (!bodyEl.classList.contains(rootClassName)) {
        bodyEl.classList.add(rootClassName);
    }

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
