import type {AvatarSize} from '../types/common';

export const getAvatarDisplayText = (text: string, size: AvatarSize) => {
    if (size === '3xs') {
        return text[0].toUpperCase();
    }

    const words = text.split(/[^\p{L}]+/u);

    if (words.length <= 1) {
        return text.slice(0, 2).toUpperCase();
    }

    return [words[0][0], words[1][0]].filter(Boolean).join('').toUpperCase();
};
