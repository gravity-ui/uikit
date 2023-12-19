export const reorderArray = <T extends unknown>(
    list: T[],
    startIndex: number,
    endIndex: number,
): T[] => {
    const result = [...list];
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};
