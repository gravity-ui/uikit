'use client';

import * as React from 'react';

import {ListVirtualizationContext} from '../List/VirtualizationContext';
import type {
    ListEstimateItemSize,
    ListVirtualizationContextValue,
    ListVirtualizedRootProps,
} from '../List/VirtualizationContext';

import {Virtualizer} from './Virtualizer';

const DEFAULT_OVERSCAN = 5;

/**
 * Корневой рендерер листа при активной виртуализации (§7 плана + развилка
 * «поверх lab/Virtualizer»). Ядро листа tanstack не импортирует — его тянет
 * только этот модуль; граница компонента легализует хуки виртуализатора.
 *
 * Скролл-контейнер — корневой div самого Virtualizer, на него доезжают все
 * props корня листа (role="listbox", клавиатурная машина, className/style
 * потребителя), т.е. корень листа и скролл-контейнер — один элемент.
 * Строку Virtualizer оборачивает в свой позиционируемый div
 * (role="presentation" — прозрачен для a11y-дерева) и меряет её через него.
 */
function VirtualizedListRoot({
    containerProps,
    rowIds,
    pinnedIndex,
    renderRow,
    getItemSize,
    measure,
    overscan,
}: ListVirtualizedRootProps) {
    const {ref, ...restContainerProps} = containerProps;

    // Строка с roving tab-stop всегда в окне: её выгрузка роняет фокус на
    // body (клавиатура умирает) либо выкидывает список из Tab-порядка
    const persistedIndexes = React.useMemo(
        () => (pinnedIndex >= 0 ? [[pinnedIndex]] : undefined),
        [pinnedIndex],
    );

    return (
        <Virtualizer
            {...restContainerProps}
            containerRef={ref}
            count={rowIds.length}
            getItemKey={(index) => rowIds[index]}
            getItemSize={getItemSize}
            overscan={overscan}
            measure={measure}
            persistedIndexes={persistedIndexes}
            renderRow={({index}) => renderRow(rowIds[index])}
        />
    );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ListVirtualizerProps<T = any> {
    /** `<List>` внутри (контекст листа проходит сквозь обёртку) */
    children: React.ReactNode;
    /**
     * Оценка высоты строки ДО рендера: константа или функция от контекста
     * строки — `(ctx) => (ctx.item.description ? 56 : 36)`; заголовки секций
     * приходят с `ctx.kind === 'section'`. Разброс фактических высот
     * закрывает `measure`. default — по `size` листа
     */
    estimateItemSize?: ListEstimateItemSize<T>;
    /**
     * Мерить фактические высоты строк после маунта (ResizeObserver).
     * default: true — строки переменной высоты (секция ≠ опция) работают
     * из коробки; выключение — оптимизация для заведомо одинаковых строк
     */
    measure?: boolean;
    /** Буфер строк за окном. default 5 */
    overscan?: number;
}

/**
 * Слой виртуализации List (§7 плана): оборачивает `<List>`, список рендерит
 * только видимое окно строк. Скролл-контейнер — корень самого List
 * (`overflow: auto` он получает автоматически); ограничить высоту
 * (height/max-height) обязан потребитель — иначе окно вырождается в полный
 * список.
 *
 * Пока НЕ экспортируется из пакета (обкатка в лабе): наружу слой уедет
 * отдельным энтрипоинтом, чтобы tanstack не попадал в общий граф модулей.
 *
 * SSR: виртуализатор на сервере не знает размеров вьюпорта и отдаёт пустое
 * окно — в HTML не попадает ни одной строки, содержимое появляется после
 * гидрации (возможен флик).
 *
 * ```tsx
 * <ListVirtualizer estimateItemSize={(ctx) => (ctx.item.description ? 56 : 36)}>
 *     <List aria-label="Logs" style={{maxHeight: 400}} items={thousands} />
 * </ListVirtualizer>
 * ```
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ListVirtualizer<T = any>({
    children,
    estimateItemSize,
    measure = true,
    overscan = DEFAULT_OVERSCAN,
}: ListVirtualizerProps<T>) {
    const value = React.useMemo<ListVirtualizationContextValue>(
        () => ({Root: VirtualizedListRoot, estimateItemSize, measure, overscan}),
        [estimateItemSize, measure, overscan],
    );
    return (
        <ListVirtualizationContext.Provider value={value}>
            {children}
        </ListVirtualizationContext.Provider>
    );
}
