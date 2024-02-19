import {LIST_ITEM_DATA_ATR} from '../constants';
import type {ListItemId} from '../types';

export const scrollToListItem = (
    itemId: ListItemId,
    containerElement?: HTMLDivElement | HTMLUListElement | null,
) => {
    if (document) {
        const element = (containerElement || document).querySelector(
            `[${LIST_ITEM_DATA_ATR}="${itemId}"]`,
        );

        if (element) {
            element.scrollIntoView?.({
                block: 'nearest',
            });
        }
    }
};
