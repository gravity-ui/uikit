export const normalizeHash = (hash: number, min: number, max: number) => {
    hash = Math.abs(hash);

    const normalizedHash = Math.floor((hash % (max - min + 1)) + min);

    return normalizedHash;
};
