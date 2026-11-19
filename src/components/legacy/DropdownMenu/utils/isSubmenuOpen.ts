export function isSubmenuOpen(path?: number[], activeMenuPath?: number[]) {
    return path?.every((item, index) => item === activeMenuPath?.[index]) ?? false;
}
