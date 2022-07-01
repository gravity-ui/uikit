import {getDarkMediaMatch} from './getDarkMediaMatch';

export function getSystemTheme() {
    if (typeof window === 'object') {
        return getDarkMediaMatch().matches ? 'dark' : 'light';
    } else {
        return 'light';
    }
}
