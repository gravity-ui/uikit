import * as React from 'react';

import {mergeRefs, useControlledState, useLayoutEffect, useUniqId} from '../../../hooks';

import {composeItemProps} from './composeItemProps';
import type {ListItemContext, ListItemDOMProps, ListProps, ListPropsOverrides} from './types';
import {TYPEAHEAD_TIMEOUT, findTypeaheadMatch, flattenItems, getNextActiveId} from './utils';
import type {ListNavigationCommand} from './utils';

export type ListContainerDOMProps = React.HTMLAttributes<HTMLElement> & {
    ref: React.Ref<HTMLDivElement>;
};

/**
 * Внутреннее ядро листа (§5 плана). Не экспортируется из пакета; форма
 * зафиксирована, чтобы позже открыть аддитивно.
 */
export interface ListInstance<T> {
    /** Props контейнера: role="listbox", onKeyDown (одна машина на список), id, ref */
    getContainerProps(overrides?: ListPropsOverrides): ListContainerDOMProps;
    /** Срез рендера: id в порядке отображения (опции + заголовки секций) */
    visibleIds: string[];
    getItemContext(id: string): ListItemContext<T>;
    getItemProps(id: string, overrides?: ListPropsOverrides): ListItemDOMProps;
}

const NAVIGATION_COMMANDS: Record<string, ListNavigationCommand> = {
    ArrowDown: 'next',
    ArrowUp: 'prev',
    Home: 'first',
    End: 'last',
};

// Внутренняя стратегия синхронизации фокуса (§5 плана): сейчас — только
// roving tabindex; virtual focus для Select добавится новой стратегией,
// не трогая машину переходов
const FOCUS_STRATEGY: 'roving' = 'roving';

export function useList<T>(props: ListProps<T>): ListInstance<T> {
    const {
        items,
        getItemId,
        getItemDisabled,
        getItemChildren,
        getItemContent,
        getItemTextValue,
        onItemAction,
        activateOnHover = true,
    } = props;

    const fallbackId = useUniqId();
    const listId = props.id ?? fallbackId;

    // У перегрузок useControlledState нет варианта «value и defaultValue могут
    // быть undefined одновременно», хотя реализация с ним корректна; для
    // активности «нет активного» — легитимное состояние, кастуем к сигнатуре
    // реализации локально
    const [activeItemId, setActiveItemId] = (
        useControlledState as (
            value: string | undefined,
            defaultValue: string | undefined,
            onChange?: (value: string | undefined) => void,
        ) => [string | undefined, (value: string | undefined) => void]
    )(props.activeItemId, props.defaultActiveItemId, props.onActiveItemUpdate);

    const {rows, rowById, domIdToId} = React.useMemo(
        () =>
            flattenItems(listId, items, {
                getItemId,
                getItemDisabled,
                getItemChildren,
                getItemContent,
                getItemTextValue,
            }),
        [
            listId,
            items,
            getItemId,
            getItemDisabled,
            getItemChildren,
            getItemContent,
            getItemTextValue,
        ],
    );

    // Активный есть, только если такая опция существует в items:
    // controlled activeItemId с несуществующим id => активного нет
    const activeRow = activeItemId === undefined ? undefined : rowById.get(activeItemId);
    const effectiveActiveId = activeRow?.kind === 'item' ? activeRow.id : undefined;

    const firstNavigableId = React.useMemo(
        () => rows.find((row) => row.kind === 'item')?.id,
        [rows],
    );

    const containerRef = React.useRef<HTMLDivElement>(null);
    const elementsRef = React.useRef(new Map<string, HTMLElement>());
    const refCallbacksRef = React.useRef(new Map<string, React.RefCallback<HTMLElement>>());
    const getItemRefCallback = (id: string) => {
        let refCallback = refCallbacksRef.current.get(id);
        if (!refCallback) {
            refCallback = (element) => {
                if (element) {
                    elementsRef.current.set(id, element);
                } else {
                    elementsRef.current.delete(id);
                }
            };
            refCallbacksRef.current.set(id, refCallback);
        }
        return refCallback;
    };

    React.useEffect(() => {
        for (const id of refCallbacksRef.current.keys()) {
            if (!rowById.has(id)) {
                refCallbacksRef.current.delete(id);
            }
        }
    }, [rowById]);

    // Кэш форкнутых ref: без него композиция создавала бы новый callback на
    // каждый рендер, и React дёргал бы ref потребителя null/узел на каждое
    // движение активности
    const forkedRefsRef = React.useRef(
        new WeakMap<object, WeakMap<object, React.RefCallback<HTMLElement>>>(),
    );
    const forkRefCached = (
        base: React.Ref<HTMLElement>,
        override: React.Ref<HTMLElement>,
    ): React.RefCallback<HTMLElement> => {
        let byOverride = forkedRefsRef.current.get(base as object);
        if (!byOverride) {
            byOverride = new WeakMap();
            forkedRefsRef.current.set(base as object, byOverride);
        }
        let forked = byOverride.get(override as object);
        if (!forked) {
            forked = mergeRefs(base, override);
            byOverride.set(override as object, forked);
        }
        return forked;
    };

    // Шаг «б» клавиатурной машины — синхронизация фокуса с активностью (§5)
    const syncFocusToActive = React.useCallback((id: string) => {
        if (FOCUS_STRATEGY === 'roving') {
            elementsRef.current.get(id)?.focus();
        }
    }, []);

    // Фокус переезжает эффектом от ФАКТИЧЕСКОЙ активности, а не от запрошенной:
    // controlled-родитель мог отклонить обновление — тогда фокус остаётся на
    // месте, а onFocus сфокусированной строки не даёт второго onActiveItemUpdate
    const pendingFocusIdRef = React.useRef<string | null>(null);
    useLayoutEffect(() => {
        if (pendingFocusIdRef.current !== null && pendingFocusIdRef.current === effectiveActiveId) {
            pendingFocusIdRef.current = null;
            syncFocusToActive(effectiveActiveId);
        }
    }, [effectiveActiveId, syncFocusToActive]);
    useLayoutEffect(() => {
        // Запрос фокуса живёт один коммит: активность не применилась сразу —
        // фокус не переезжает вовсе
        pendingFocusIdRef.current = null;
    });

    const commitActive = (id: string | undefined) => {
        if (id === undefined) {
            return;
        }
        pendingFocusIdRef.current = id;
        setActiveItemId(id);
    };

    const typeaheadRef = React.useRef<{query: string; timer?: number}>({query: ''});
    React.useEffect(
        () => () => {
            window.clearTimeout(typeaheadRef.current.timer);
        },
        [],
    );
    const handleTypeaheadChar = (char: string) => {
        const typeahead = typeaheadRef.current;
        window.clearTimeout(typeahead.timer);
        typeahead.query += char;
        typeahead.timer = window.setTimeout(() => {
            typeahead.query = '';
        }, TYPEAHEAD_TIMEOUT);

        commitActive(findTypeaheadMatch(rows, effectiveActiveId, typeahead.query));
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        // Реагируем только на клавиатуру с самих строк: вложенные интерактивные
        // элементы (кнопки в endContent и т.п.) машина не перехватывает
        if (
            !(event.target instanceof HTMLElement) ||
            !domIdToId.has(event.target.id) ||
            event.defaultPrevented
        ) {
            return;
        }

        const command = NAVIGATION_COMMANDS[event.key];
        if (command) {
            event.preventDefault();
            commitActive(getNextActiveId(command, rows, effectiveActiveId));
            return;
        }

        if (event.key === 'Enter') {
            const row =
                effectiveActiveId === undefined ? undefined : rowById.get(effectiveActiveId);
            if (row && !row.disabled) {
                event.preventDefault();
                onItemAction?.(row.id, row.item);
            }
            return;
        }

        if (event.key === ' ') {
            if (event.ctrlKey || event.metaKey || event.altKey) {
                return;
            }
            // Приоритет Space (APG): при непустом typeahead-буфере пробел — часть
            // поиска; иначе Space зарезервирован слоем выделения (§6). Дефолтный
            // скролл страницы гасим в обоих случаях
            event.preventDefault();
            if (typeaheadRef.current.query) {
                handleTypeaheadChar(' ');
            }
            return;
        }

        if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
            event.preventDefault();
            handleTypeaheadChar(event.key);
        }
    };

    const getContainerProps = (overrides?: ListPropsOverrides): ListContainerDOMProps => {
        const baseProps = {
            role: 'listbox',
            id: listId,
            'aria-label': props['aria-label'],
            'aria-labelledby': props['aria-labelledby'],
            onKeyDown: handleKeyDown,
            ref: containerRef,
        };
        return composeItemProps(baseProps, overrides, {
            forkRef: forkRefCached,
        }) as ListContainerDOMProps;
    };

    const getItemProps = (id: string, overrides?: ListPropsOverrides): ListItemDOMProps => {
        const row = rowById.get(id);
        if (!row) {
            return (overrides ?? {}) as ListItemDOMProps;
        }

        if (row.kind === 'section') {
            // Одна presentation снимает роль, но не прячет текст узла —
            // без aria-hidden listbox получил бы голые текст-ноды между опциями
            const baseProps = {
                id: row.domId,
                role: 'presentation',
                'aria-hidden': true,
                ref: getItemRefCallback(id),
            };
            return composeItemProps(baseProps, overrides, {
                forkRef: forkRefCached,
            }) as ListItemDOMProps;
        }

        const active = row.id === effectiveActiveId;
        const baseProps = {
            id: row.domId,
            role: 'option',
            // Roving: один tab-stop на список; без активного — первая навигабельная
            tabIndex:
                active || (effectiveActiveId === undefined && row.id === firstNavigableId) ? 0 : -1,
            'aria-disabled': row.disabled || undefined,
            'data-active': active ? '' : undefined,
            'data-disabled': row.disabled ? '' : undefined,
            ref: getItemRefCallback(id),
            onClick: (event: React.MouseEvent) => {
                if (row.disabled || event.defaultPrevented) {
                    return;
                }
                setActiveItemId(row.id);
                onItemAction?.(row.id, row.item);
            },
            onFocus: () => {
                setActiveItemId(row.id);
            },
            onPointerEnter:
                activateOnHover && !row.disabled
                    ? () => {
                          // Hover меняет активность и roving tabIndex, но не переносит
                          // DOM-фокус; фокус догонит активность при первом клавиатурном
                          // взаимодействии
                          setActiveItemId(row.id);
                      }
                    : undefined,
        };
        return composeItemProps(baseProps, overrides, {
            forkRef: forkRefCached,
        }) as unknown as ListItemDOMProps;
    };

    const getItemContext = (id: string): ListItemContext<T> => {
        const row = rowById.get(id);
        if (!row) {
            throw new Error(`[List] Unknown item id "${id}"`);
        }
        return {
            id: row.id,
            item: row.item,
            index: row.index,
            kind: row.kind,
            content: row.content,
            state: {
                active: row.id === effectiveActiveId,
                disabled: row.disabled,
            },
        };
    };

    const visibleIds = React.useMemo(() => rows.map((row) => row.id), [rows]);

    return {getContainerProps, visibleIds, getItemContext, getItemProps};
}
