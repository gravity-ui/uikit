export const getAvatarDisplayText = (text: string) => {
    const words = text.split(' ');
    const result =
        words.length > 1 ? [words[0][0], words[1][0]].filter(Boolean).join('') : text.slice(0, 2);

    return result.toUpperCase();
};
