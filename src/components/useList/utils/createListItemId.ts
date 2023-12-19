export const createListItemId = (itemId: string, listId?: string) =>
    listId ? `${listId}-${itemId}` : `${itemId}`;
