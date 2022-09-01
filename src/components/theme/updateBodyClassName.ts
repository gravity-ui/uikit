import {block} from '../utils/cn';
import {RealTheme} from './types';

const b = block('root');
const rootClassName = b();

function modifier(className: string) {
    return className.split(/\s+/)[1];
}

export function updateBodyClassName(newTheme: RealTheme) {
    const bodyEl = document.body;

    if (!bodyEl.classList.contains(rootClassName)) {
        bodyEl.classList.add(rootClassName);
    }

    [...bodyEl.classList].forEach((cls) => {
        if (cls.startsWith(modifier(b({theme: true})))) {
            bodyEl.classList.remove(cls);
        }
    });
    bodyEl.classList.add(modifier(b({theme: newTheme})));
}
