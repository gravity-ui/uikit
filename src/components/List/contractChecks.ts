import * as React from 'react';

import {tabbable} from 'tabbable';

import {useLayoutEffect} from '../../../hooks';
import {warnOnce} from '../../utils/warn';

import type {ListPropsOverrides} from './types';

// Keys the core owns; a cast in an adapter goes around ListDndProps
const CORE_OWNED_PROPS = ['role', 'id', 'tabIndex'] as const;

const DND_CONTAINER_REF_KEY = Symbol('container');

export function warnOnOverridesCollision(
    overrides: ListPropsOverrides | undefined,
    getterName: string,
) {
    if (process.env.NODE_ENV === 'production' || !overrides) {
        return;
    }
    for (const key of CORE_OWNED_PROPS) {
        if (overrides[key] !== undefined) {
            warnOnce(
                `[List] \`${getterName}\` overrides contain \`${key}\`, which is owned by the list itself (ARIA role, DOM id and roving tabindex). Unlike dnd adapter props, the value is applied as passed — but overriding \`${key}\` can break keyboard navigation and the ARIA model, make sure it is intentional.`,
            );
        }
    }
}

/** Cut out in production too (contract); the warning is dev-only */
export function sanitizeDndProps<P extends object>(dndProps: P): P {
    let result = dndProps as Record<string, unknown>;
    for (const key of CORE_OWNED_PROPS) {
        if (result[key] !== undefined) {
            warnOnce(
                `[List] The dnd adapter returned \`${key}\`, which is owned by the list itself (ARIA role, DOM id and roving tabindex). The value is ignored: spread such props yourself in \`renderItem\` if you really need them.`,
            );
            const {[key]: _ignored, ...rest} = result;
            result = rest;
        }
    }
    return result as P;
}

export interface DndRefStabilityTracker {
    trackContainerRef(ref: unknown): void;
    trackItemRef(id: string, ref: unknown): void;
}

/**
 * Dev check of the "stable ref per id" obligation. Threshold 2: one recreation is
 * legitimate
 */
export function useDndRefStabilityTracker({
    rowById,
}: {
    rowById: ReadonlyMap<string, unknown>;
}): DndRefStabilityTracker {
    const historyRef = React.useRef(
        new Map<string | typeof DND_CONTAINER_REF_KEY, {ref: unknown; changes: number}>(),
    );

    React.useEffect(() => {
        for (const key of historyRef.current.keys()) {
            if (typeof key === 'string' && !rowById.has(key)) {
                historyRef.current.delete(key);
            }
        }
    }, [rowById]);

    const [tracker] = React.useState<DndRefStabilityTracker>(() => {
        if (process.env.NODE_ENV === 'production') {
            return {trackContainerRef: () => {}, trackItemRef: () => {}};
        }
        const track = (
            key: string | typeof DND_CONTAINER_REF_KEY,
            ref: unknown,
            getterName: string,
        ) => {
            if (ref === null || ref === undefined) {
                return;
            }
            const history = historyRef.current;
            const entry = history.get(key);
            if (!entry) {
                history.set(key, {ref, changes: 0});
                return;
            }
            if (entry.ref !== ref) {
                entry.ref = ref;
                entry.changes += 1;
                if (entry.changes >= 2) {
                    warnOnce(
                        `[List] The dnd adapter returns a new \`ref\` identity from \`${getterName}\` on every render. Refs must be stable${getterName === 'getItemDndProps' ? ' per item id' : ''}: an unstable ref re-registers the element in the dnd library on each render — and while dragging the list re-renders on every dropTarget update.`,
                    );
                }
            }
        };
        return {
            trackContainerRef: (ref) => track(DND_CONTAINER_REF_KEY, ref, 'getContainerDndProps'),
            trackItemRef: (id, ref) => track(id, ref, 'getItemDndProps'),
        };
    });

    return tracker;
}

/**
 * Grid is one tab stop: cell content must not be tabbable (rbd dragHandleProps carry
 * tabIndex=0). Warns, never rewrites foreign markup
 */
export function useGridTabStopDevCheck({
    enabled,
    rows,
    getElements,
}: {
    enabled: boolean;
    rows: readonly unknown[];
    getElements: () => Iterable<HTMLElement>;
}) {
    useLayoutEffect(() => {
        if (process.env.NODE_ENV === 'production' || !enabled) {
            return;
        }
        for (const element of getElements()) {
            if (tabbable(element).length > 0) {
                warnOnce(
                    '[List] `role="grid"`: a row contains a tabbable descendant. A grid is a single tab stop — give interactive cell content `tabIndex={-1}`, it stays reachable with Left/Right arrows.',
                );
                return;
            }
        }
    }, [enabled, rows, getElements]);
}
