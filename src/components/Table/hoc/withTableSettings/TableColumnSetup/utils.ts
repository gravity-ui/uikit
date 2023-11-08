import type {TableColumnSetupItem} from '../withTableSettings';

export const LIST_ITEM_HEIGHT = 36;

export const getRequiredItems = (list: TableColumnSetupItem[]) =>
    list
        .filter(({required}) => required)
        .map((column) => ({
            ...column,
            disabled: true,
        }));

export const getConfigurableItems = (list: TableColumnSetupItem[]) =>
    list.filter(({required}) => !required);

export const getListHeight = (list: TableColumnSetupItem[]) => {
    const itemHeight = LIST_ITEM_HEIGHT;

    return Math.min(5, list.length) * itemHeight + itemHeight / 2;
};

export const getRequiredListHeight = (list: TableColumnSetupItem[]) =>
    list.length * LIST_ITEM_HEIGHT;

export const getCountSelected = (items: TableColumnSetupItem[]) =>
    items.reduce((acc, cur) => (cur.selected ? acc + 1 : acc), 0);
