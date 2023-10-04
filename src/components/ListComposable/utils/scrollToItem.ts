import type {ListItemId} from '../types';

import {createListItemQa} from './createListItemQa';

export const scrollToItem = (itemId: ListItemId, containerRef?: HTMLDivElement) => {
    if (document) {
        const element = (containerRef || document).querySelector(
            `[data-qa="${createListItemQa(itemId)}"]`,
        );

        if (element) {
            element.scrollIntoView({
                block: 'nearest',
            });
        }
    }
};
