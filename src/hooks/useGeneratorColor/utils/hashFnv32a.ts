/* eslint-disable no-bitwise */
// hash in [-2^31, 2^31 - 1]
export const hashFnv32a = (token: string, start: number) => {
    let hval = start;

    for (let index = 0; index < token.length; index++) {
        hval ^= token.charCodeAt(index);
        hval += (hval << 1) + (hval << 4) + (hval << 7) + (hval << 8) + (hval << 24);
    }

    return hval >>> 0;
};
