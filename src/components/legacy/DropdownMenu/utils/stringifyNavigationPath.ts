export function stringifyNavigationPath(path?: number[]) {
    return path?.join(' ') ?? '';
}
