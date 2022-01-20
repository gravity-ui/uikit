import bemBlock from 'bem-cn-lite';

export type CnBlock = ReturnType<typeof bemBlock>;

export type CnMods = Record<string, string | boolean>;

export const NAMESPACE = 'yc-';

export function block(name: string): CnBlock {
    return bemBlock(`${NAMESPACE}${name}`);
}
