import {block} from '../utils/cn';

const b = block('root');

const rootClassName = b();
const [, lightModifier] = b({theme: 'light'}).split(/\s+/);
const [, darkModifier] = b({theme: 'dark'}).split(/\s+/);

export function updateBodyClassName(theme: string) {
    const bodyEl = document.body;

    if (!bodyEl.classList.contains(rootClassName)) {
        bodyEl.classList.add(rootClassName);
    }

    bodyEl.classList.toggle(lightModifier, theme === 'light');
    bodyEl.classList.toggle(darkModifier, theme === 'dark');
}
