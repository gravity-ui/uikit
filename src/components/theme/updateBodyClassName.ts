import {block} from '../utils/cn';
import {THEMES} from './constants';
import {RealTheme} from './types';

const b = block('root');

const rootClassName = b();

const themeModifiers = THEMES.map((theme) => {
    const [, modifier] = b({theme}).split(/\s+/);
    return [theme, modifier];
});

export function updateBodyClassName(newTheme: RealTheme) {
    const bodyEl = document.body;

    if (!bodyEl.classList.contains(rootClassName)) {
        bodyEl.classList.add(rootClassName);
    }

    themeModifiers.forEach(([theme, modifier]) => {
        bodyEl.classList.toggle(modifier, theme === newTheme);
    });
}
