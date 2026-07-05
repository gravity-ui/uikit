/**
 * Escapes an item id into a token safe for an HTML `id` attribute (no whitespace, ASCII only,
 * usable as a selector fragment). Every character outside `[A-Za-z0-9-]` — including `_`, which is
 * reserved as the escape delimiter — is replaced by `_<hex codeunit>_`. The mapping is injective, so
 * distinct item ids never collide on the same DOM id (e.g. `"a b"` → `a_20_b`, `"a_b"` → `a_5f_b`).
 */
export function sanitizeItemIdForDom(itemId: string): string {
    return itemId.replace(/[^a-zA-Z0-9-]/g, (ch) => `_${ch.charCodeAt(0).toString(16)}_`);
}

/** Builds the DOM `id` of an item row from the container id and the (sanitized) item id. */
export function buildItemDomId(listId: string, itemId: string): string {
    return `${listId}-item-${sanitizeItemIdForDom(itemId)}`;
}
