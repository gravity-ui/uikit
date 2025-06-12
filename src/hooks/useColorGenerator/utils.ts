/* eslint-disable no-bitwise */

export const getHue = (hash: number) => {
    return Math.abs(hash) % 360;
};

export const hashFnv32a = (seed: string, start: number) => {
    let hval = start;

    for (let index = 0; index < seed.length; index++) {
        hval ^= seed.charCodeAt(index);
        hval += (hval << 1) + (hval << 4) + (hval << 7) + (hval << 8) + (hval << 24);
    }

    return hval >>> 0;
};

export const getHash = (seed: string) => {
    return hashFnv32a(seed, 0x73_6f_6d_65) ^ hashFnv32a(seed, 0x64_6f_72_61);
};

export const normalizeHash = (hash: number, min: number, max: number) => {
    const absHash = Math.abs(hash);

    return Math.floor((absHash % (max - min + 1)) + min);
};
