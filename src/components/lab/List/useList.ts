import * as React from 'react';

import {focusable, tabbable} from 'tabbable';

import {mergeRefs, useControlledState, useLayoutEffect, useUniqId} from '../../../hooks';
import {useDirection} from '../../theme';
import {warnOnce} from '../../utils/warn';

import {ListVirtualizationContext} from './VirtualizationContext';
import {composeItemProps} from './composeItemProps';
import type {
    ListCellDOMProps,
    ListFocusStrategy,
    ListItemContext,
    ListItemDOMProps,
    ListProps,
    ListPropsOverrides,
    ListRole,
} from './types';
import {TYPEAHEAD_TIMEOUT, findTypeaheadMatch, flattenItems, getNextActiveId} from './utils';
import type {ListNavigationCommand, ListRow} from './utils';

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
    /** Props ячейки строки: role="gridcell" в grid-режиме, пусто в listbox */
    getCellProps(overrides?: ListPropsOverrides): ListCellDOMProps;
    /** ARIA-роль списка (ось A, §15): значение пропа `role`, дефолт listbox */
    role: ListRole;
    /**
     * Индекс строки с roving tab-stop в visibleIds (активной, а без активной —
     * первой навигабельной); −1, если опций нет. Рендерер виртуализации (§7)
     * держит её смонтированной всегда
     */
    pinnedRowIndex: number;
    /**
     * Ключ мемоизации строки (§8): меняется, когда у строки меняется что-то,
     * НЕ выраженное в её ctx-срезе — DOM id, roving tab-stop без активной,
     * aria-нумерация при виртуализации. Внутренний канал мемоизации List,
     * не часть контракта renderItem
     */
    getItemMemoKey(id: string): string;
}

const NAVIGATION_COMMANDS: Record<string, ListNavigationCommand> = {
    ArrowDown: 'next',
    ArrowUp: 'prev',
    Home: 'first',
    End: 'last',
};

const EMPTY_SELECTION: readonly string[] = [];

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
function warnOnOverridesCollision(overrides: ListPropsOverrides | undefined, getterName: string) {
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

function warnOnDndPropsCollision<P extends object>(dndProps: P): P {
    for (const key of CORE_OWNED_PROPS) {
        if (key in dndProps && (dndProps as Record<string, unknown>)[key] !== undefined) {
            warnOnce(
                `[List] The dnd adapter returned \`${key}\`, which is owned by the list itself (ARIA role, DOM id and roving tabindex). The value is ignored: spread such props yourself in \`renderItem\` if you really need them.`,
            );
            const {[key]: _ignored, ...rest} = dndProps as Record<string, unknown>;
            return warnOnDndPropsCollision(rest) as P;
        }
    }
    return dndProps;
}

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
        selectionMode,
        // Ось роль-модели (§15): роль задаётся явно, роли строки и ячейки
        // следуют за ней
        role = 'listbox',
    } = props;

    const fallbackId = useUniqId();
    const listId = props.id ?? fallbackId;

    // Вторая ось §15 — стратегия синхронизации фокуса: её включает факт
    // наличия внешнего владельца. Дефолт (listbox + roving) — поведение
    // фаз 1–4
    const focusOwner = props.focusOwner ?? null;
    const focusStrategy: ListFocusStrategy = focusOwner ? 'activedescendant' : 'roving';
    // Вход в интерактив ячейки и возврат — только в roving: в
    // activedescendant стрелки принадлежат каретке инпута, а
    // aria-activedescendant указывает на ОДИН элемент (§15, трудный угол)
    const cellNavigation = role === 'grid' && focusStrategy === 'roving';
    const direction = useDirection();

    // Слой виртуализации (§7): ядро знает только о факте его включения —
    // aria-setsize/posinset появляются лишь когда в DOM лежит окно строк
    const virtualized = React.useContext(ListVirtualizationContext) !== null;

    // Слой dnd (§8): пока проп не передан, слоя не существует — ни полей
    // dragging/dropTarget в ctx.state, ни data-атрибутов, ни мёржа props.
    // Ядро не импортирует ни одну dnd-либу: адаптер приносит потребитель,
    // ядро только отражает его состояние и компонует его props
    const dnd = props.dnd ?? null;
    const draggingId = dnd ? (dnd.draggingId ?? null) : null;
    const dropTarget = dnd ? (dnd.dropTarget ?? null) : null;

    // «Нет активного» — легитимное состояние: controlled выражает его null
    // (undefined — uncontrolled, как selectedKey у react-aria). null же
    // закрывает и дырку перегрузок useControlledState «value и defaultValue
    // undefined одновременно»: с дефолтом `?? null` вызов подходит под
    // перегрузку «uncontrolled с дефолтом» без каста
    const [activeItemId, setActiveItemId] = useControlledState<string | null>(
        props.activeItemId,
        props.defaultActiveItemId ?? null,
        props.onActiveItemUpdate,
    );

    // Слой выделения (§6): наружу массив, внутри Set. Пока selectionMode не
    // передан, состояние существует, но ни во что не превращается — ни в aria,
    // ни в ctx.state, ни в жесты
    const [selectedIds, setSelectedIds] = useControlledState<readonly string[], string[]>(
        props.selectedIds,
        props.defaultSelectedIds ?? EMPTY_SELECTION,
        props.onSelectedUpdate,
    );
    const selectedSet = React.useMemo(() => new Set(selectedIds), [selectedIds]);

    if (
        !selectionMode &&
        (props.selectedIds !== undefined ||
            props.defaultSelectedIds !== undefined ||
            props.onSelectedUpdate !== undefined)
    ) {
        warnOnce(
            '[List] `selectedIds`, `defaultSelectedIds` and `onSelectedUpdate` have no effect without `selectionMode`.',
        );
    }
    if (selectionMode === 'single' && selectedIds.length > 1) {
        // Несколько aria-selected="true" в listbox без aria-multiselectable —
        // невалидная ARIA
        warnOnce(
            '[List] `selectionMode="single"` expects at most one selected id, but `selectedIds` contains several.',
        );
    }

    const toggleSelection = (row: ListRow<T>) => {
        if (!selectionMode || row.kind !== 'item' || row.disabled) {
            return;
        }
        if (selectionMode === 'single') {
            // Повторный жест по выбранной строке не снимает выделение
            // (радио-семантика) и не дёргает колбэк
            if (selectedIds.length === 1 && selectedIds[0] === row.id) {
                return;
            }
            setSelectedIds([row.id]);
            return;
        }
        const next = selectedIds.filter((id) => id !== row.id);
        if (next.length === selectedIds.length) {
            next.push(row.id);
        }
        setSelectedIds(next);
    };

    /** Жест «применения» строки: сначала выделение, затем onItemAction (§6) */
    const applyRow = (row: ListRow<T>) => {
        toggleSelection(row);
        onItemAction?.(row.id, row.item);
    };

    const {rows, rowById, domIdToId, optionsCount} = React.useMemo(
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

    // «Свежее» окружение обработчиков строк: сами обработчики замыкают только
    // id строки и этот ref, поэтому строка, пропустившая ре-рендер по
    // мемоизации (§8), не держит устаревших rowById/selectedIds — состояние
    // читается в момент события, а не в момент последнего рендера строки.
    // dragActive — состояние dnd-слоя: во время перетаскивания hover-активация
    // приостанавливается (см. onPointerEnter). Цель вставки тоже означает
    // «идёт перетаскивание»: адаптер, заполняющий только dropTarget, всё
    // равно получает приостановку
    const dragActive = draggingId !== null || dropTarget !== null;
    const latestRef = React.useRef({
        rowById,
        applyRow,
        setActiveItemId,
        activateOnHover,
        dragActive,
    });
    latestRef.current = {rowById, applyRow, setActiveItemId, activateOnHover, dragActive};

    // Активный есть, только если такая опция существует в items:
    // controlled activeItemId с несуществующим id (или null) => активного нет
    const activeRow = activeItemId === null ? undefined : rowById.get(activeItemId);
    const effectiveActiveId = activeRow?.kind === 'item' ? activeRow.id : undefined;

    const firstNavigableId = React.useMemo(
        () => rows.find((row) => row.kind === 'item')?.id,
        [rows],
    );

    // Строка с roving tab-stop — зеркало логики tabIndex в getItemProps.
    // Слой виртуализации пинит её в окне: выгрузка сфокусированной строки
    // роняет фокус на body, выгрузка tab-stop теряет список из Tab-порядка
    const pinnedRowId = effectiveActiveId ?? firstNavigableId;
    const pinnedRowIndex = pinnedRowId === undefined ? -1 : (rowById.get(pinnedRowId)?.index ?? -1);

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

    // Dev-детекция нарушения обязательства §8 «ref в геттерах адаптера
    // стабилен (per id — в getItemDndProps)»: нестабильный callback молча
    // промахивается мимо кеша форков — React отцепляет/прицепляет ref, и
    // dnd-либа перерегистрирует элемент на каждый рендер, а во время
    // перетаскивания лист ре-рендерится на каждое обновление dropTarget.
    // Порог 2: одна легитимная смена (потребитель пересоздал адаптер/либу)
    // допускается; систематическая нестабильность даёт вторую смену сразу
    const dndRefHistoryRef = React.useRef(new Map<string, {ref: unknown; changes: number}>());
    const trackDndRefStability = (key: string, ref: unknown, getterName: string) => {
        if (ref === null || ref === undefined) {
            return;
        }
        const history = dndRefHistoryRef.current;
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

    React.useEffect(() => {
        for (const id of refCallbacksRef.current.keys()) {
            if (!rowById.has(id)) {
                refCallbacksRef.current.delete(id);
            }
        }
        for (const key of dndRefHistoryRef.current.keys()) {
            if (key !== DND_CONTAINER_REF_KEY && !rowById.has(key)) {
                dndRefHistoryRef.current.delete(key);
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

    // Шаг «б» клавиатурной машины — синхронизация фокуса с активностью (§5).
    // Единственное, что различает две стратегии оси B (§15): шаг «а»
    // (вычисление перехода активности) у них общий.
    // Прокруткой управляем сами: нативный скролл focus() у Chromium
    // ЦЕНТРИРУЕТ полностью невидимый элемент (а на границе вьюпорта
    // следующая строка всегда полностью невидима — при обходе стрелками
    // это скачки на полэкрана); scrollIntoView с block: 'nearest'
    // доскролливает ровно недостающую высоту (в jsdom метода нет)
    const syncFocusToActive = React.useCallback(
        (id: string) => {
            const element = elementsRef.current.get(id);
            if (!element) {
                return;
            }
            if (focusStrategy === 'roving') {
                element.focus({preventScroll: true});
            }
            // В activedescendant DOM-фокус не двигается вовсе: строку
            // «подсвечивает» aria-activedescendant владельца, а доскролл
            // остаётся за списком
            element.scrollIntoView?.({block: 'nearest'});
        },
        [focusStrategy],
    );

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

    const getActiveRow = () =>
        effectiveActiveId === undefined ? undefined : rowById.get(effectiveActiveId);

    /**
     * Вход в интерактив ячейки и возврат на строку — клавиатура grid (§15).
     * Именно это делает кнопку внутри строки (ручка dnd, row-action)
     * достижимой с клавиатуры, а не только валидной по ролям.
     * Возвращает true, если событие обработано
     */
    const handleCellNavigation = (
        event: React.KeyboardEvent,
        rowElement: HTMLElement,
        fromCell: boolean,
    ): boolean => {
        const forwardKey = direction === 'rtl' ? 'ArrowLeft' : 'ArrowRight';
        const backwardKey = direction === 'rtl' ? 'ArrowRight' : 'ArrowLeft';
        if (event.key !== forwardKey && event.key !== backwardKey) {
            return false;
        }
        const targets = focusable(rowElement);
        const currentIndex = fromCell ? targets.indexOf(event.target as HTMLElement) : -1;
        const nextTarget =
            event.key === forwardKey
                ? targets[currentIndex + 1]
                : (targets[currentIndex - 1] ?? (fromCell ? rowElement : undefined));
        if (!nextTarget) {
            return false;
        }
        event.preventDefault();
        nextTarget.focus();
        return true;
    };

    /**
     * Шаг «а» клавиатурной машины (§5): переходы активности. Одинаков в обеих
     * стратегиях фокуса — источник события у них разный (строка в roving,
     * инпут владельца в activedescendant), сами переходы те же
     */
    const handleNavigationKeys = (event: React.KeyboardEvent) => {
        const command = NAVIGATION_COMMANDS[event.key];
        if (command) {
            event.preventDefault();
            commitActive(getNextActiveId(command, rows, effectiveActiveId));
            return;
        }

        if (event.key === 'Enter') {
            const row = getActiveRow();
            if (row && !row.disabled) {
                event.preventDefault();
                applyRow(row);
            }
            return;
        }

        if (event.key === ' ') {
            if (event.ctrlKey || event.metaKey || event.altKey) {
                return;
            }
            // Символьные клавиши (пробел — тоже символ) в activedescendant
            // уходят владельцу фокуса: он печатает в инпут, а фильтр
            // заменяет typeahead (§15)
            if (focusStrategy === 'activedescendant') {
                return;
            }
            // Приоритет Space (APG): при непустом typeahead-буфере пробел — часть
            // поиска; иначе Space работает только в слое выделения (§6). Дефолтный
            // скролл страницы гасим в обоих случаях
            event.preventDefault();
            if (typeaheadRef.current.query) {
                handleTypeaheadChar(' ');
                return;
            }
            if (!selectionMode) {
                return;
            }
            const row = getActiveRow();
            if (row && !row.disabled) {
                applyRow(row);
            }
            return;
        }

        if (
            focusStrategy === 'roving' &&
            event.key.length === 1 &&
            !event.ctrlKey &&
            !event.metaKey &&
            !event.altKey
        ) {
            event.preventDefault();
            handleTypeaheadChar(event.key);
        }
    };

    /**
     * Клавиатура корня списка (roving): машина слушает только сами строки —
     * вложенные интерактивные элементы (кнопки в endContent и т.п.) она не
     * перехватывает. Исключение — grid: из ячейки ядру принадлежат ровно ←/→
     * (возврат на строку), остальные клавиши остаются вложенному виджету
     * (↑/↓ у ручки rbd — это её клавиатурный drag-and-drop)
     */
    const handleContainerKeyDown = (event: React.KeyboardEvent) => {
        if (!(event.target instanceof HTMLElement) || event.defaultPrevented) {
            return;
        }
        if (!domIdToId.has(event.target.id)) {
            if (cellNavigation) {
                const rowElement = event.target.closest<HTMLElement>('[role="row"]');
                if (rowElement && domIdToId.has(rowElement.id)) {
                    handleCellNavigation(event, rowElement, true);
                }
            }
            return;
        }
        if (cellNavigation && handleCellNavigation(event, event.target, false)) {
            return;
        }
        handleNavigationKeys(event);
    };

    /**
     * Клавиатура внешнего владельца фокуса (activedescendant): гейта на
     * строку-цель нет — события приходят из инпута, который живёт снаружи
     * корня списка
     */
    const handleFocusOwnerKeyDown = (event: React.KeyboardEvent) => {
        if (event.defaultPrevented) {
            return;
        }
        handleNavigationKeys(event);
    };

    // Контракт grid: список — ОДИН tab-stop (APG). Интерактив ячейки
    // достижим ←/→, а в Tab-порядке его быть не должно — иначе список
    // разворачивается в N+1 tab-stop (практический случай — dragHandleProps
    // из rbd со своим tabIndex=0). Ядро чужой маркап не переписывает
    // (потребитель мог сделать элемент tabbable намеренно, а либа вернёт
    // свой tabIndex на следующем же рендере) — вместо этого предупреждаем.
    // Проверка только в dev и только на смену набора строк
    useLayoutEffect(() => {
        if (process.env.NODE_ENV === 'production' || !cellNavigation) {
            return;
        }
        for (const element of elementsRef.current.values()) {
            if (tabbable(element).length > 0) {
                warnOnce(
                    '[List] `role="grid"`: a row contains a tabbable descendant. A grid is a single tab stop — give interactive cell content `tabIndex={-1}`, it stays reachable with Left/Right arrows.',
                );
                return;
            }
        }
    }, [cellNavigation, rows]);

    // Публикация связки владельцу фокуса (§15): id списка для aria-controls,
    // DOM id активной строки для aria-activedescendant и сама машина.
    // Эффект без зависимостей — обработчик пересоздаётся каждый рендер, а
    // связка на стороне владельца дедуплицируется по значениям
    const activeDomId =
        effectiveActiveId === undefined ? undefined : rowById.get(effectiveActiveId)?.domId;
    useLayoutEffect(() => {
        focusOwner?.connect({listId, activeDomId, onKeyDown: handleFocusOwnerKeyDown});
    });
    useLayoutEffect(() => () => focusOwner?.disconnect(), [focusOwner]);

    const getContainerProps = (overrides?: ListPropsOverrides): ListContainerDOMProps => {
        const baseProps = {
            // Ось роль-модели (§15): grid — когда в строках есть интерактив
            role,
            id: listId,
            'aria-label': props['aria-label'],
            'aria-labelledby': props['aria-labelledby'],
            // Только со слоем выделения и только для multiple
            'aria-multiselectable': selectionMode === 'multiple' || undefined,
            // Аналог aria-setsize listbox-режима: при виртуализации в DOM
            // лежит только окно строк. Нумерация — по строкам данных,
            // заголовки секций не считаются
            'aria-rowcount': role === 'grid' && virtualized ? optionsCount : undefined,
            // Идёт перетаскивание (dnd-слой): CSS-хук для кастомного маркапа —
            // погасить свои hover-стили на время drag (дефолтной вьюхе ядро
            // гасит их пропом hovered={false} через getItemViewProps)
            'data-drag-active': dragActive ? '' : undefined,
            onKeyDown: handleContainerKeyDown,
            ref: containerRef,
        };
        warnOnOverridesCollision(overrides, 'getContainerProps');
        // Props dnd-адаптера (зона сброса) — между базовыми и overrides:
        // обработчики цепочкой после наших, ref — форк, а overrides
        // потребителя компонуются последними, как и без слоя
        let withDnd = baseProps;
        if (dnd?.getContainerDndProps) {
            const dndProps = warnOnDndPropsCollision(dnd.getContainerDndProps());
            if (process.env.NODE_ENV !== 'production') {
                trackDndRefStability(DND_CONTAINER_REF_KEY, dndProps.ref, 'getContainerDndProps');
            }
            withDnd = composeItemProps(baseProps, dndProps, {forkRef: forkRefCached});
        }
        return composeItemProps(withDnd, overrides, {
            forkRef: forkRefCached,
        }) as ListContainerDOMProps;
    };

    const getItemProps = (id: string, overrides?: ListPropsOverrides): ListItemDOMProps => {
        warnOnOverridesCollision(overrides, 'getItemProps');
        const row = rowById.get(id);
        if (!row) {
            // getItemContext на неизвестный id кидает; здесь мягче (геттер
            // может пережить строку на кадр), но молчать нельзя — спред
            // без props ядра тихо убивает роль/id/клавиатуру этой строки
            warnOnce(
                `[List] \`getItemProps\` was called with an unknown item id "${id}" — it is not in \`items\`, so only the passed overrides were returned.`,
            );
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
        const selected = selectionMode ? selectedSet.has(row.id) : undefined;
        const dragging = dnd ? row.id === draggingId : undefined;
        let rowDropTarget: 'before' | 'after' | null | undefined;
        if (dnd) {
            rowDropTarget = dropTarget?.id === row.id ? dropTarget.position : null;
        }
        const isGrid = role === 'grid';
        const baseProps = {
            id: row.domId,
            // Ось роль-модели (§15): в grid строка — row, а её контент
            // лежит в gridcell (getCellProps)
            role: isGrid ? 'row' : 'option',
            // Roving: один tab-stop на список; без активного — первая
            // навигабельная. В activedescendant строки из Tab-порядка уходят
            // вовсе: DOM-фокус живёт у внешнего владельца
            tabIndex:
                focusStrategy === 'roving'
                    ? active || (effectiveActiveId === undefined && row.id === firstNavigableId)
                        ? 0
                        : -1
                    : undefined,
            'aria-disabled': row.disabled || undefined,
            // «не выбран» ≠ «не выбирается»: со слоем выделения aria-selected
            // есть на каждой строке, без слоя — ни на одной. В grid атрибут
            // живёт на строке (role="row"), а не на ячейке
            'aria-selected': selected,
            // При виртуализации в DOM лежит только окно строк — без явной
            // нумерации SR объявит «3 из 12» на списке из тысяч опций.
            // Нумерация по строкам данных: заголовки секций не считаются (§7)
            'aria-setsize': virtualized && !isGrid ? optionsCount : undefined,
            'aria-posinset': virtualized && !isGrid ? row.posInSet : undefined,
            // Grid-эквивалент posinset; тотал — aria-rowcount на контейнере
            'aria-rowindex': virtualized && isGrid ? row.posInSet : undefined,
            'data-active': active ? '' : undefined,
            'data-disabled': row.disabled ? '' : undefined,
            'data-selected': selected ? '' : undefined,
            // Слой dnd: присутствием, но у data-drop-target — со значением
            // грани: индикатору (и CSS потребителя) нужно различать before/after
            'data-dragging': dragging ? '' : undefined,
            'data-drop-target': rowDropTarget ?? undefined,
            ref: getItemRefCallback(id),
            // Обработчики читают состояние через latestRef в момент события:
            // мемоизированная строка (§8) может пропустить ре-рендер и остаться
            // со старым замыканием — оно не должно быть устаревшим
            onClick: (event: React.MouseEvent) => {
                const latest = latestRef.current;
                const currentRow = latest.rowById.get(id);
                if (!currentRow || currentRow.disabled || event.defaultPrevented) {
                    return;
                }
                latest.setActiveItemId(currentRow.id);
                latest.applyRow(currentRow);
            },
            onFocus: () => {
                latestRef.current.setActiveItemId(id);
            },
            onPointerEnter: () => {
                // Hover меняет активность и roving tabIndex, но не переносит
                // DOM-фокус; фокус догонит активность при первом клавиатурном
                // взаимодействии. Disabled-строки hover не активирует.
                // Во время перетаскивания (dnd-слой, draggingId != null)
                // hover-активация приостановлена: курсор позиционирует вставку,
                // а не выбирает строку — иначе синтетические драги (dnd-kit,
                // hello-pangea; у нативного HTML5 dnd pointer-события подавляет
                // браузер) таскали бы подсветку за перетаскиваемым элементом.
                // Прецедент — флаг sorting в onItemActivate старого List
                const latest = latestRef.current;
                const currentRow = latest.rowById.get(id);
                if (
                    !latest.activateOnHover ||
                    latest.dragActive ||
                    !currentRow ||
                    currentRow.disabled
                ) {
                    return;
                }
                latest.setActiveItemId(currentRow.id);
            },
        };
        // Props dnd-адаптера — между базовыми и overrides потребителя; только
        // в опции (заголовки секций в dnd не участвуют). Ref адаптера обязан
        // быть стабильным per id (§8) — форк кешируется по identity пары
        let withDnd = baseProps;
        if (dnd?.getItemDndProps) {
            const dndProps = warnOnDndPropsCollision(dnd.getItemDndProps(row.id));
            if (process.env.NODE_ENV !== 'production') {
                trackDndRefStability(row.id, dndProps.ref, 'getItemDndProps');
            }
            withDnd = composeItemProps(baseProps, dndProps, {forkRef: forkRefCached});
        }
        return composeItemProps(withDnd, overrides, {
            forkRef: forkRefCached,
        }) as unknown as ListItemDOMProps;
    };

    // Ячейка строки (§15): в grid контент обязан лежать в gridcell — только
    // там интерактивные потомки валидны. В listbox ячеек нет, и геттер отдаёт
    // пустой объект: один и тот же renderItem работает в обеих роль-моделях
    const getCellProps = (overrides?: ListPropsOverrides): ListCellDOMProps => {
        const baseProps = role === 'grid' ? {role: 'gridcell'} : {};
        return composeItemProps(baseProps, overrides, {
            forkRef: forkRefCached,
        }) as ListCellDOMProps;
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
                // Слоевые поля: без слоя ключей нет вовсе (§4.2)
                ...(selectionMode && row.kind === 'item'
                    ? {selected: selectedSet.has(row.id)}
                    : undefined),
                ...(dnd && row.kind === 'item'
                    ? {
                          dragging: row.id === draggingId,
                          dropTarget: dropTarget?.id === row.id ? dropTarget.position : null,
                      }
                    : undefined),
            },
        };
    };

    const getItemMemoKey = (id: string): string => {
        const row = rowById.get(id);
        if (!row) {
            return '';
        }
        // Всё, что влияет на выход getItemProps, но не выражено в ctx-срезе:
        // DOM id (меняется с props.id листа), roving tab-stop без активной
        // строки, aria-нумерация при виртуализации, обе оси §15 (роли строки
        // и наличие tabIndex)
        const tabStop = row.index === pinnedRowIndex;
        const numbering =
            virtualized && row.kind === 'item' ? `${row.posInSet}/${optionsCount}` : '';
        return `${row.domId}|${tabStop ? 1 : 0}|${numbering}|${role}|${focusStrategy}`;
    };

    const visibleIds = React.useMemo(() => rows.map((row) => row.id), [rows]);

    return {
        getContainerProps,
        visibleIds,
        getItemContext,
        getItemProps,
        getCellProps,
        role,
        pinnedRowIndex,
        getItemMemoKey,
    };
}
