import {block} from '../utils/cn';

const b = block('root');

export function updateBodyClassName(theme: string) {
    const bodyEl = document.body;

    if (!bodyEl.classList.contains(b())) {
        bodyEl.classList.add(b());
    }

    bodyEl.classList.toggle(b({theme: 'light'}), theme === 'light');
    bodyEl.classList.toggle(b({theme: 'dark'}), theme === 'dark');
}
