import bemBlock from 'bem-cn-lite';

export type CnBlock = ReturnType<typeof bemBlock>;

export type CnMods = Record<string, string | boolean | undefined>;

export const NAMESPACE = 'yc-';
export const NAMESPACE_NEW = 'g-';

export function block(name: string): CnBlock {
    return bemBlock(`${NAMESPACE}${name}`);
}

export function blockNew(name: string): CnBlock {
    return bemBlock(`${NAMESPACE_NEW}${name}`);
}

/**
 * Extracts modifiers part from className
 */
export function modsClassName(className: string) {
    return className.split(/\s(.*)/)[1];
}
