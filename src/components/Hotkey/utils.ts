export const isMac = (): boolean =>
    typeof navigator !== 'undefined' ? /Mac|iP(hone|[oa]d)/.test(navigator.platform) : false;

export function split(val: string, separator: string | RegExp): string[] {
    return val.trim().split(separator).filter(Boolean);
}
