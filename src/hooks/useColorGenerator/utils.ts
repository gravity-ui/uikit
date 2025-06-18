/* eslint-disable no-bitwise */

export const getHue = (hash: number) => {
    return (Math.abs(hash) % 36000) / 100;
};

export const getHash = (seed: string) => {
    // FNV-1a offset basis
    let hash = 0x811c9dc5;
    const len = seed.length;

    hash ^= len;
    hash = Math.imul(hash, 0x01000193);

    for (let i = 0; i < len; i++) {
        hash ^= seed.charCodeAt(i);

        hash = Math.imul(hash, 0x01000193);
    }

    hash ^= hash >>> 16;
    hash = Math.imul(hash, 0x85ebca6b);
    hash ^= hash >>> 13;
    hash = Math.imul(hash, 0xc2b2ae35);
    hash ^= hash >>> 16;

    hash = Math.imul(hash, 0x27d4eb2d);
    hash ^= hash >>> 15;

    return hash >>> 0;
};

export const normalizeHash = (hash: number, min: number, max: number) => {
    const absHash = Math.abs(hash);

    return Math.floor((absHash % (max - min + 1)) + min);
};

export const extractHashPart = (hash: number, offset: number): number => {
    let part = hash >>> (offset * 10);
    part ^= part >>> 16;
    part = Math.imul(part, 0x85ebca6b);
    part ^= part >>> 13;

    return part >>> 0;
};
