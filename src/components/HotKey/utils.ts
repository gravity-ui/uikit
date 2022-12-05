export const isMac = (): boolean =>
    typeof navigator !== 'undefined'
        ? /Mac|iP(hone|[oa]d)/.test(navigator.platform)
        : // @ts-expect-error Cannot find name 'os'.ts(2304)
        typeof os !== 'undefined' && os.platform
        ? // @ts-expect-error Cannot find name 'os'.ts(2304)
          os.platform() == 'darwin'
        : false;

export function split(val: string, separator: string | RegExp): string[] {
    return val.trim().split(separator).filter(Boolean);
}
