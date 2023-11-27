import {LIST_ITEM_DATA_ATR} from '../constants';
import type {ListItemId} from '../types';

import {createListItemId} from './createListItemId';

export const scrollToListItem = (
    itemId: ListItemId,
    containerRef?: HTMLDivElement | HTMLUListElement | null,
) => {
    if (document) {
        const element = (containerRef || document).querySelector(
            `[${LIST_ITEM_DATA_ATR}="${createListItemId(itemId)}"]`,
        );

        if (element) {
            element.scrollIntoView({
                block: 'nearest',
            });
        }
    }
};
