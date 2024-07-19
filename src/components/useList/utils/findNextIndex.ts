import type {ListItemId} from '../types';

interface FindNextItemsProps {
    list: string[];
    index: number;
    step: number;
    disabledItemsById?: Record<ListItemId, boolean>;
}

export const findNextIndex = ({list, index, step, disabledItemsById = {}}: FindNextItemsProps) => {
    const dataLength = list.length;
    let currentIndex = (index + dataLength) % dataLength;

    for (let i = 0; i < dataLength; i += 1) {
        const id = list[currentIndex];

        if (id && !disabledItemsById[id]) {
            return currentIndex;
        }
        currentIndex = (currentIndex + dataLength + step) % dataLength;
    }

    return undefined;
};
