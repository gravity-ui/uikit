import * as React from 'react';

import {tabbable} from 'tabbable';

import {useLayoutEffect} from '../../../hooks';
import {warnOnce} from '../../utils/warn';

import type {ListPropsOverrides} from './types';

// The keys owned by the core: the ARIA role of a row (option or row), the DOM
// id of a row and the roving tab stop.
// The dnd adapter types exclude them already (ListDndProps), but a cast inside
// a consumer's adapter goes around the types silently — and overwriting
// role/id breaks the keyboard machinery completely (it is gated on the DOM id
// of a row)
const CORE_OWNED_PROPS = ['role', 'id', 'tabIndex'] as const;

// The container key in the dev tracker of dnd adapter ref stability: NUL never
// occurs in consumer row ids
const DND_CONTAINER_REF_KEY = '\u0000container';

// In the CONSUMER's overrides the core keys are not dropped — unlike adapter
// props, this is a deliberate escape hatch (a custom row role before roles are
// officially parameterized, for example), but overwriting them silently breaks
// the keyboard machinery, hence the warning
export function warnOnOverridesCollision(
    overrides: ListPropsOverrides | undefined,
    getterName: string,
) {
    if (process.env.NODE_ENV === 'production' || !overrides) {
        return;
    }
    for (const key of CORE_OWNED_PROPS) {
        if (key in overrides && (overrides as Record<string, unknown>)[key] !== undefined) {
            warnOnce(
                `[List] \`${getterName}\` overrides contain \`${key}\`, which is owned by the list itself (ARIA role, DOM id and roving tabindex). Unlike dnd adapter props, the value is applied as passed — but overriding \`${key}\` can break keyboard navigation and the ARIA model, make sure it is intentional.`,
            );
        }
    }
}

/**
 * The sanitizer of dnd adapter props: the core keys are CUT OUT, in production
 * as well — that is contract behavior ("such keys are ignored") rather than
 * diagnostics; the warning is dev-only
 */
export function sanitizeDndProps<P extends object>(dndProps: P): P {
    for (const key of CORE_OWNED_PROPS) {
        if (key in dndProps && (dndProps as Record<string, unknown>)[key] !== undefined) {
            warnOnce(
                `[List] The dnd adapter returned \`${key}\`, which is owned by the list itself (ARIA role, DOM id and roving tabindex). The value is ignored: spread such props yourself in \`renderItem\` if you really need them.`,
            );
            const {[key]: _ignored, ...rest} = dndProps as Record<string, unknown>;
            return sanitizeDndProps(rest) as P;
        }
    }
    return dndProps;
}

export interface DndRefStabilityTracker {
    /** The ref from getContainerDndProps */
    trackContainerRef(ref: unknown): void;
    /** The ref from getItemDndProps(id) */
    trackItemRef(id: string, ref: unknown): void;
}

/**
 * Dev-time detection of a violated adapter obligation — "the ref of an adapter
 * getter is stable (per id in getItemDndProps)": an unstable callback silently
 * misses the cache of forks, React detaches and re-attaches the ref, and the
 * dnd library re-registers the element on every render — while dragging, the
 * list re-renders on every dropTarget update.
 * The threshold is 2: one legitimate change (the consumer recreated the
 * adapter or the library) is allowed; systematic instability produces the
 * second change immediately
 */
export function useDndRefStabilityTracker({
    rowById,
}: {
    rowById: ReadonlyMap<string, unknown>;
}): DndRefStabilityTracker {
    const historyRef = React.useRef(new Map<string, {ref: unknown; changes: number}>());

    React.useEffect(() => {
        for (const key of historyRef.current.keys()) {
            if (key !== DND_CONTAINER_REF_KEY && !rowById.has(key)) {
                historyRef.current.delete(key);
            }
        }
    }, [rowById]);

    const [tracker] = React.useState<DndRefStabilityTracker>(() => {
        const track = (key: string, ref: unknown, getterName: string) => {
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
 * The grid contract: a list is ONE tab stop (APG). The interactive content of
 * a cell is reachable with ←/→ and must not be in the Tab order — otherwise
 * the list unfolds into N+1 tab stops (the practical case is dragHandleProps
 * from rbd with a tabIndex=0 of its own). The core does not rewrite foreign
 * markup (the consumer may have made the element tabbable on purpose, and the
 * library would put its tabIndex back on the very next render) — it warns
 * instead. Dev only, and only when the set of rows changes
 */
export function useGridTabStopDevCheck({
    enabled,
    rows,
    getElements,
}: {
    enabled: boolean;
    /** A re-scan signal only — the set of rows has changed */
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
