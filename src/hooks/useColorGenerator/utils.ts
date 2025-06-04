/* eslint-disable no-bitwise */

export const mathFrac = (x: number) => x - ~~x;

export const getHue = (hash: number) => {
    const sin = Math.sin(hash); // 0.12345678910 or -0.12345678910
    const fr = sin < 0 ? mathFrac(sin * 1000) : mathFrac(sin * 10_000); // 5678910

    return ~~(Math.abs(fr) * 360);
};

export const normalizeHash = (hash: number, min: number, max: number) => {
    hash = Math.abs(hash);

    return Math.floor((hash % (max - min + 1)) + min);
};

export const hashFnv32a = (seed: string, start: number) => {
    let hval = start;

    for (let index = 0; index < seed.length; index++) {
        hval ^= seed.charCodeAt(index);
        hval += (hval << 1) + (hval << 4) + (hval << 7) + (hval << 8) + (hval << 24);
    }

    return hval >>> 0;
};
