import {getDarkMediaMatch, supportsMatchMedia} from './getDarkMediaMatch';

export function getSystemTheme() {
    if (supportsMatchMedia) {
        return getDarkMediaMatch().matches ? 'dark' : 'light';
    } else {
        return 'light';
    }
}
