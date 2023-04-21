import {getClosestNumber} from '../utils/getClosestNumber';
import {getSrcSet} from '../utils/getSrcSet';
import {SrcSetType} from '../utils/getSrcSet/types';
import {SIZES} from './constants';
import type {UserAvatarSize} from './types';

export function getAvatarSrcSet(
    size: UserAvatarSize,
    sizes: Record<number, string>,
    {multipliers = [1, 2, 3, 4]} = {},
) {
    const availableSizes = Object.keys(sizes)
        .map((size) => Number(size))
        .sort((a, b) => a - b);
    const baseSize = SIZES[size];
    const srcSet = multipliers.map((multiplier) => {
        const targetSize = multiplier * baseSize;
        const appropriateSize = getClosestNumber(targetSize, availableSizes);

        return [sizes[appropriateSize], `${multiplier}x`] as const;
    });

    return getSrcSet(srcSet as SrcSetType<typeof multipliers>);
}
