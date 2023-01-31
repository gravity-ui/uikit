import {StoriesItem, StoriesItemMedia} from '../Stories/types';

export interface StoriesGroupItem {
    items: StoriesItem[];
    /** Custom image for preview, otherwise first StoriesItem.media from StoriesItem will be used */
    thumbnailMedia?: StoriesItemMedia;
}

export type StoriesGroupIndex = {
    groupIndex: number;
    itemIndex: number;
};
