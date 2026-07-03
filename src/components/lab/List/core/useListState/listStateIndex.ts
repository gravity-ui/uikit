import type {ListChildrenState, ListItemGetters} from '../types';

/**
 * Precomputed structural index of the item forest. All per-node maps are keyed by item id.
 * `visibleIds` is derived from this index plus the expansion set (see `computeVisibleIds`)
 * without touching the getters, so expanding a node never re-traverses the forest.
 *
 * The index is rebuilt into **fresh maps** on every `items` reference (see
 * `reconcileListStateIndex`) — it never mutates a previously produced index, so it is safe to
 * compute during render under React concurrent mode. The previous index is used only as a
 * read-only source to reuse unchanged subtrees, which keeps *getter* work proportional to the
 * change; the map allocation itself is O(total nodes) of cheap `Map.set` calls.
 */
export interface ListStateIndex<T> {
    /** The `items` reference this index was reconciled from — used to short-circuit rebuilds */
    sourceItems: T[];
    /** Top-level item ids in order */
    rootIds: string[];
    itemById: Map<string, T>;
    levelById: Map<string, number>;
    parentById: Map<string, string | undefined>;
    /** `undefined` = leaf or unloaded folder; `[]` = loaded empty folder */
    childrenIdsById: Map<string, string[] | undefined>;
    childrenStateById: Map<string, ListChildrenState | undefined>;
    disabledById: Map<string, boolean>;
}

type StructuralGetters<T> = Required<
    Pick<
        ListItemGetters<T>,
        'getItemId' | 'getItemChildren' | 'getItemDisabled' | 'getItemChildrenState'
    >
>;

const isString = (value: unknown): value is string => typeof value === 'string';

/**
 * Resolves the structural getters `useListState` consumes, applying the "read from the item"
 * defaults. Content/textValue getters are view/behavior concerns and are not resolved here.
 */
function resolveStructuralGetters<T>(getters: ListItemGetters<T>): StructuralGetters<T> {
    return {
        getItemId:
            getters.getItemId ?? ((item) => (isString(item) ? item : (item as {id: string}).id)),
        getItemChildren:
            getters.getItemChildren ??
            ((item) => (isString(item) ? undefined : (item as {children?: T[]}).children)),
        getItemDisabled:
            getters.getItemDisabled ??
            ((item) => (isString(item) ? false : Boolean((item as {disabled?: boolean}).disabled))),
        getItemChildrenState:
            getters.getItemChildrenState ??
            ((item) =>
                isString(item)
                    ? undefined
                    : (item as {childrenState?: ListChildrenState}).childrenState),
    };
}

/**
 * Rebuilds the structural index for a new `items` reference into fresh maps, reusing the
 * previous index where possible:
 *
 * - a node whose item **reference** and position (`level`, `parentId`) are unchanged has its
 *   whole subtree copied over from `previous` — no getters are called for it;
 * - a changed / new / moved node is rebuilt from its getters and its children reconciled
 *   recursively.
 *
 * Because the result is always a brand-new index (fresh maps, fresh wrapper), the previous
 * index is never mutated: the function is a pure function of `items`/`getters`, and `previous`
 * only affects how much work is reused, never the result. Removed nodes simply never make it
 * into the new maps — no pruning step is needed. Reconciling the same `items` reference is a
 * no-op that returns `previous` unchanged.
 */
export function reconcileListStateIndex<T>(
    items: T[],
    getters: ListItemGetters<T>,
    previous: ListStateIndex<T> | null,
): ListStateIndex<T> {
    if (previous && previous.sourceItems === items) {
        return previous;
    }

    const {getItemId, getItemChildren, getItemDisabled, getItemChildrenState} =
        resolveStructuralGetters(getters);

    const itemById = new Map<string, T>();
    const levelById = new Map<string, number>();
    const parentById = new Map<string, string | undefined>();
    const childrenIdsById = new Map<string, string[] | undefined>();
    const childrenStateById = new Map<string, ListChildrenState | undefined>();
    const disabledById = new Map<string, boolean>();

    const seen = process.env.NODE_ENV === 'production' ? null : new Set<string>();
    const markSeen = (id: string) => {
        if (process.env.NODE_ENV !== 'production' && seen) {
            if (seen.has(id)) {
                console.error(
                    `[useListState] Duplicate item id "${id}". Item ids must be unique — pass getItemId to derive stable, unique ids.`,
                );
            }
            seen.add(id);
        }
    };

    // Copies a whole unchanged subtree from `previous` into the fresh maps without calling any
    // getters. `previous` is guaranteed non-null here (only reached from the reuse fast-path).
    const copyReusedSubtree = (id: string) => {
        const prev = previous as ListStateIndex<T>;
        markSeen(id);
        itemById.set(id, prev.itemById.get(id) as T);
        levelById.set(id, prev.levelById.get(id) as number);
        parentById.set(id, prev.parentById.get(id));
        childrenStateById.set(id, prev.childrenStateById.get(id));
        disabledById.set(id, prev.disabledById.get(id) as boolean);
        const childIds = prev.childrenIdsById.get(id);
        childrenIdsById.set(id, childIds);
        if (childIds) {
            for (let i = 0; i < childIds.length; i++) {
                copyReusedSubtree(childIds[i]);
            }
        }
    };

    const reconcileNode = (item: T, level: number, parentId: string | undefined): string => {
        const id = getItemId(item);

        // Unchanged reference at the same position ⇒ the whole subtree is intact; copy it over.
        if (
            previous &&
            previous.itemById.get(id) === item &&
            previous.levelById.get(id) === level &&
            previous.parentById.get(id) === parentId
        ) {
            copyReusedSubtree(id);
            return id;
        }

        markSeen(id);
        itemById.set(id, item);
        levelById.set(id, level);
        parentById.set(id, parentId);
        disabledById.set(id, getItemDisabled(item));
        childrenStateById.set(id, getItemChildrenState(item));

        const childItems = getItemChildren(item);
        let childIds: string[] | undefined;
        if (childItems === undefined) {
            childIds = undefined;
        } else {
            childIds = new Array<string>(childItems.length);
            for (let i = 0; i < childItems.length; i++) {
                childIds[i] = reconcileNode(childItems[i], level + 1, id);
            }
        }
        childrenIdsById.set(id, childIds);

        return id;
    };

    const rootIds = items.map((item) => reconcileNode(item, 0, undefined));

    return {
        sourceItems: items,
        rootIds,
        itemById,
        levelById,
        parentById,
        childrenIdsById,
        childrenStateById,
        disabledById,
    };
}

/**
 * Flattens the visible nodes in display order. Only descends into expanded subtrees, so the
 * cost is O(visible nodes): expanding a node in a large mostly-collapsed forest never walks
 * the hidden nodes (the L1.1 bench-smoke invariant).
 */
export function computeVisibleIds<T>(
    index: ListStateIndex<T>,
    expandedIds: ReadonlySet<string>,
): string[] {
    const result: string[] = [];

    const walk = (ids: string[]) => {
        for (let i = 0; i < ids.length; i++) {
            const id = ids[i];
            result.push(id);

            const childIds = index.childrenIdsById.get(id);
            if (childIds !== undefined && childIds.length > 0 && expandedIds.has(id)) {
                walk(childIds);
            }
        }
    };

    walk(index.rootIds);

    return result;
}
