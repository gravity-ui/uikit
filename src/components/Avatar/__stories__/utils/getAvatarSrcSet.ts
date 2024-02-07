import {AVATAR_SIZES} from '../../constants';
import type {AvatarSize} from '../../types/common';

import {getClosestNumber} from './getClosestNumber';
import {getSrcSet} from './getSrcSet';
import type {SrcSetType} from './types';

export const getAvatarSrcSet = (
    size: AvatarSize,
    sizes: Record<number, string>,
    {multipliers = [1, 2, 3, 4]} = {},
) => {
    const availableSizes = Object.keys(sizes)
        .map((item) => Number(item))
        .sort((a, b) => a - b);
    const baseSize = AVATAR_SIZES[size];
    const srcSet = multipliers.map((multiplier) => {
        const targetSize = multiplier * baseSize;
        const appropriateSize = getClosestNumber(targetSize, availableSizes);

        return [sizes[appropriateSize], `${multiplier}x`] as const;
    });

    return getSrcSet(srcSet as SrcSetType<typeof multipliers>);
};
