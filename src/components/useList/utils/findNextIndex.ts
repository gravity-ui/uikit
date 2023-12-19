interface FindNextItemsProps {
    list: string[];
    index: number;
    step: number;
    disabledItems?: Record<string, boolean>;
}

export const findNextIndex = ({list, index, step, disabledItems = {}}: FindNextItemsProps) => {
    const dataLength = list.length;
    let currentIndex = (index + dataLength) % dataLength;

    for (let i = 0; i < dataLength; i += 1) {
        if (list[currentIndex] && !disabledItems[currentIndex]) {
            return currentIndex;
        }
        currentIndex = (currentIndex + dataLength + step) % dataLength;
    }

    return undefined;
};
