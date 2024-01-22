import {withNaming} from '@bem-react/classname';

export type CnMods = Record<string, string | boolean | undefined>;

export const NAMESPACE = 'g-';

export const cn = withNaming({e: '__', m: '_'});
export const block = withNaming({n: NAMESPACE, e: '__', m: '_'});

export type CnBlock = ReturnType<typeof cn>;

/**
 * Extracts modifiers part from className
 */
export function modsClassName(className: string) {
    return className.split(/\s(.*)/)[1];
}
