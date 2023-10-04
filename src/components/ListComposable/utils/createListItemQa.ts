export const createListItemQa = (itemId: string, listId?: string) =>
    listId ? `${listId}-${itemId}` : `${itemId}`;
