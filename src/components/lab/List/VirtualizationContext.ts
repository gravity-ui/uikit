'use client';
import * as React from 'react';

import type {ListItemContext} from './types';
import type {ListContainerDOMProps} from './useList';

/**
 * Оценка высоты строки ДО рендера: константа или функция от контекста строки
 * (потребитель знает форму своего айтема; заголовки секций приходят с
 * `ctx.kind === 'section'`). Разброс фактических высот закрывает `measure`.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ListEstimateItemSize<T = any> = number | ((ctx: ListItemContext<T>) => number);

/**
 * Props, которые ядро листа передаёт корневому рендереру слоя виртуализации
 * (§7 плана + развилка «поверх lab/Virtualizer»): виртуализатор рендерит
 * скролл-контейнер сам, поэтому контекст несёт рендерер КОРНЯ листа,
 * а не рендерер строк. Ядро не знает, чем рендерер реализован, — оно лишь
 * отдаёт props контейнера, данные и функцию рендера строки.
 */
export interface ListVirtualizedRootProps {
    /**
     * Props корня листа из getContainerProps (role="listbox", id, onKeyDown,
     * aria-*, className, style, ref) — рендерер обязан донести их до своего
     * скролл-контейнера: корень листа И скролл-контейнер — один элемент
     */
    containerProps: ListContainerDOMProps;
    /** id строк в порядке отображения (опции + заголовки секций) */
    rowIds: string[];
    /**
     * Индексы строк в `rowIds`, которые рендерер обязан держать
     * смонтированными всегда: строка с roving tab-stop (выгрузка
     * сфокусированной строки роняет фокус на body, выгрузка tab-stop делает
     * список недостижимым по Tab) и заголовки секций (цели aria-describedby
     * опций — выгруженный заголовок превратил бы ссылку в повисший IDREF)
     */
    persistedIndexes: readonly number[];
    /** Рендер строки по id (результат уже с key) */
    renderRow: (id: string) => React.ReactNode;
    /**
     * Оценка высоты строки по её индексу в `rowIds` — ядро уже разрешило
     * константу/функцию потребителя и дефолт по `size`
     */
    getItemSize: (index: number) => number;
    /** Мерить фактические высоты строк после маунта */
    measure: boolean;
    /** Буфер строк за окном */
    overscan: number;
}

export interface ListVirtualizationContextValue {
    /** Корневой рендерер листа из слоя виртуализации */
    Root: React.ComponentType<ListVirtualizedRootProps>;
    estimateItemSize?: ListEstimateItemSize;
    measure: boolean;
    overscan: number;
}

/**
 * Контекст слоя виртуализации (§7 плана). Определение живёт в ядре и не
 * импортирует tanstack; провайдер и корневой рендерер — в
 * `lab/Virtualizer/ListVirtualizer` (ядром не импортируется; наружу уедет
 * отдельным энтрипоинтом). Ядро по наличию контекста выбирает плоский рендер
 * (дефолт, ноль зависимостей) либо Root из контекста — граница компонента
 * легализует хуки виртуализатора.
 */
export const ListVirtualizationContext = React.createContext<ListVirtualizationContextValue | null>(
    null,
);
