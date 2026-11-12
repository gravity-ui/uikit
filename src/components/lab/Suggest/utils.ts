import type {SuggestOptionProps} from './types';

const LOADING_ROW = Symbol('suggest-loading-row');
const LOADING_ITEM_ID = '__suggest_loading__';

type LoadingItem = {[LOADING_ROW]: string; disabled: true};
export type SuggestListItem<T> = SuggestOptionProps<T> | LoadingItem;

export function isLoadingItem<T>(item: SuggestListItem<T>): item is LoadingItem {
    return LOADING_ROW in item;
}

export function getItemId<T>(item: SuggestListItem<T>): string {
    return isLoadingItem(item) ? item[LOADING_ROW] : item.value;
}

export function buildListItems<T>(
    options: SuggestOptionProps<T>[] = [],
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

export function getItemTextValue<T>(item: SuggestListItem<T>): string {
    if (isLoadingItem(item)) {
        return '';
    }
    for (const content of [item.content, item.children]) {
        if (typeof content === 'string' || typeof content === 'number') {
            return String(content);
        }
    }
    return item.value;
}
