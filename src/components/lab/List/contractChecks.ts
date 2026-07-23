import * as React from 'react';

import {tabbable} from 'tabbable';

import {useLayoutEffect} from '../../../hooks';
import {warnOnce} from '../../utils/warn';

import type {ListPropsOverrides} from './types';

// Ключи, которыми владеет ядро: ARIA-роль строки (option либо row, §15),
// DOM id строки и roving tab-stop.
// Типы dnd-адаптера их уже исключают (ListDndProps), но каст в
// адаптере потребителя обойдёт типы молча — а затирание role/id ломает
// клавиатурную машину целиком (она гейтуется на DOM id строки)
const CORE_OWNED_PROPS = ['role', 'id', 'tabIndex'] as const;

// Ключ контейнера в dev-трекере стабильности ref dnd-адаптера: NUL не
// встречается в потребительских id строк
const DND_CONTAINER_REF_KEY = '\u0000container';

// В overrides ПОТРЕБИТЕЛЯ ключи ядра не отбрасываются — в отличие от props
// адаптера это осознанный эскейп-хэтч (например, своя роль строки до
// официальной параметризации ролей), но затирание молча ломает клавиатурную
// машину — предупреждаем
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
 * Санитайзер props dnd-адаптера: ключи ядра ВЫРЕЗАЮТСЯ — и в проде, это
 * поведение контракта («такие ключи игнорируются»), а не диагностика;
 * warning — только в dev
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
    /** ref из getContainerDndProps */
    trackContainerRef(ref: unknown): void;
    /** ref из getItemDndProps(id) */
    trackItemRef(id: string, ref: unknown): void;
}

/**
 * Dev-детекция нарушения обязательства §8 «ref в геттерах адаптера
 * стабилен (per id — в getItemDndProps)»: нестабильный callback молча
 * промахивается мимо кеша форков — React отцепляет/прицепляет ref, и
 * dnd-либа перерегистрирует элемент на каждый рендер, а во время
 * перетаскивания лист ре-рендерится на каждое обновление dropTarget.
 * Порог 2: одна легитимная смена (потребитель пересоздал адаптер/либу)
 * допускается; систематическая нестабильность даёт вторую смену сразу
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
 * Контракт grid: список — ОДИН tab-stop (APG). Интерактив ячейки
 * достижим ←/→, а в Tab-порядке его быть не должно — иначе список
 * разворачивается в N+1 tab-stop (практический случай — dragHandleProps
 * из rbd со своим tabIndex=0). Ядро чужой маркап не переписывает
 * (потребитель мог сделать элемент tabbable намеренно, а либа вернёт
 * свой tabIndex на следующем же рендере) — вместо этого предупреждаем.
 * Проверка только в dev и только на смену набора строк
 */
export function useGridTabStopDevCheck({
    enabled,
    rows,
    getElements,
}: {
    enabled: boolean;
    /** Только сигнал пересканирования — смена набора строк */
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
