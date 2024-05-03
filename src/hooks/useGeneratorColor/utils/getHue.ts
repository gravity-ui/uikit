/* eslint-disable no-bitwise */
import {mathFrac} from './mathFrac';

export const getHue = (hash: number) => {
    const sin = Math.sin(hash); // 0.12345678910 or -0.12345678910
    const fr = sin < 0 ? mathFrac(sin * 1000) : mathFrac(sin * 10_000); // 5678910

    return ~~(Math.abs(fr) * 360);
};
