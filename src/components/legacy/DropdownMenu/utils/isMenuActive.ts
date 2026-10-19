import {stringifyNavigationPath} from './stringifyNavigationPath';

export function isMenuActive(path: number[], activeMenuPath: number[]) {
    return stringifyNavigationPath(path) === stringifyNavigationPath(activeMenuPath);
}
