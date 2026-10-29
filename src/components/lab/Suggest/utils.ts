import type {SuggestOption} from './types';

const LOADING_ROW = Symbol('suggest-loading-row');
const LOADING_ITEM_ID = '__suggest_loading__';

type LoadingItem = {[LOADING_ROW]: string; disabled: true};
export type SuggestListItem<T> = SuggestOption<T> | LoadingItem;

export function isLoadingItem<T>(item: SuggestListItem<T>): item is LoadingItem {
    return LOADING_ROW in item;
}

export function getItemId<T>(item: SuggestListItem<T>): string {
    return isLoadingItem(item) ? item[LOADING_ROW] : item.value;
}

export function buildListItems<T>(
    options: SuggestOption<T>[] = [],
    loading = false,
): SuggestListItem<T>[] {
    if (!loading) {
        return options;
    }
    // Internal rows share the List ID namespace with consumer options.
    const optionIds = new Set(options.map((option) => option.value));
    let id = LOADING_ITEM_ID;
    while (optionIds.has(id)) {
        id = `_${id}`;
    }
    return [...options, {[LOADING_ROW]: id, disabled: true}];
}
