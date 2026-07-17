'use client';

import * as React from 'react';

import {block} from '../../utils/cn';
import {ListItemView} from '../ListItemView/ListItemView';

import {ListSectionHeader} from './SectionHeader';
import {ListVirtualizationContext} from './VirtualizationContext';
import type {ListItemContext, ListItemHelpers, ListProps, ListSize} from './types';
import {useList} from './useList';

import './List.scss';

const b = block('list-v2');

// Оценка высоты строки до рендера для слоя виртуализации (§7): min-height
// дефолтной вьюхи (border-box, однострочный контент); разброс фактических
// высот закрывает measure
const ESTIMATED_ITEM_SIZE: Record<ListSize, number> = {s: 24, m: 28, l: 32, xl: 36};

function ListComponent<T>(props: ListProps<T>, ref: React.ForwardedRef<HTMLDivElement>) {
    const {size = 'm', className, style, qa, renderItem, selectionMode} = props;
    const virtualization = React.useContext(ListVirtualizationContext);
    const list = useList(props);

    // Кэш контекстов для оценки высоты строк слоем виртуализации (см. ниже);
    // объявлен безусловно (правила хуков), используется только при активном слое
    const sizingContextsRef = React.useRef<{
        ids: string[];
        byId: Map<string, ListItemContext<T>>;
    }>({ids: list.visibleIds, byId: new Map()});

    // Маппинг слоя выделения на индикацию вьюхи — как в существующем Select:
    // multiple — галочка (выделение не конкурирует с подсветкой активного),
    // single — подсветка строки
    const selectionStyle = selectionMode === 'multiple' ? 'check' : 'highlight';

    const defaultRenderItem = (ctx: ListItemContext<T>, helpers: ListItemHelpers) =>
        ctx.kind === 'section' ? (
            <ListSectionHeader {...helpers.getItemProps()} size={size}>
                {ctx.content}
            </ListSectionHeader>
        ) : (
            <ListItemView {...helpers.getItemProps()} {...helpers.getItemViewProps()}>
                {ctx.content}
            </ListItemView>
        );

    const renderRowContent = renderItem ?? defaultRenderItem;

    const renderRow = (id: string) => {
        const ctx = list.getItemContext(id);
        const helpers: ListItemHelpers = {
            getItemProps: (overrides) => list.getItemProps(id, overrides),
            getItemViewProps: () => ({
                size,
                active: ctx.state.active,
                disabled: ctx.state.disabled,
                // selected/selectionStyle — только при включённом слое:
                // у вьюхи нет дефолта selectionStyle, без него выделение
                // не видно
                ...(ctx.state.selected === undefined
                    ? undefined
                    : {selected: ctx.state.selected, selectionStyle}),
            }),
        };
        return <React.Fragment key={id}>{renderRowContent(ctx, helpers)}</React.Fragment>;
    };

    const containerProps = list.getContainerProps({
        ref: ref ?? undefined,
        className: b({size}, className),
        style,
        'data-qa': qa,
    });

    // Слой виртуализации (§7): при активном контексте корень рендерит
    // виртуализатор из слоя (он же скролл-контейнер, overflow ставит сам);
    // высоту (height/max-height) обязан ограничить потребитель
    if (virtualization) {
        // Оценка потребителя: константа или функция от контекста строки;
        // дефолт — по size листа
        const estimate = virtualization.estimateItemSize ?? ESTIMATED_ITEM_SIZE[size];
        // Кэш контекстов оценки: при скролле tanstack вызывает estimateItemSize
        // для всего незамеренного хвоста на каждом проходе измерений — сборка
        // нового контекста каждый раз расточительна. Контексты идут только
        // в estimateItemSize (не в рендер), поэтому неактуальный active/selected
        // для высоты безвреден; кэш сбрасывается при смене набора строк
        const cache = sizingContextsRef.current;
        if (cache.ids !== list.visibleIds) {
            cache.ids = list.visibleIds;
            cache.byId = new Map();
        }
        const getSizingContext = (index: number) => {
            const id = list.visibleIds[index];
            let ctx = cache.byId.get(id);
            if (ctx === undefined) {
                ctx = list.getItemContext(id);
                cache.byId.set(id, ctx);
            }
            return ctx;
        };
        const getItemSize =
            typeof estimate === 'function'
                ? (index: number) => estimate(getSizingContext(index))
                : () => estimate;
        return (
            <virtualization.Root
                containerProps={containerProps}
                rowIds={list.visibleIds}
                pinnedIndex={list.pinnedRowIndex}
                renderRow={renderRow}
                getItemSize={getItemSize}
                measure={virtualization.measure}
                overscan={virtualization.overscan}
            />
        );
    }

    return <div {...containerProps}>{list.visibleIds.map((id) => renderRow(id))}</div>;
}

/**
 * Навигируемый listbox: массив строк — ноль конфигурации, объекты — один
 * геттер. Слои выделения/виртуализации/dnd подключаются отдельно и не
 * протекают в ядро.
 */
export const List = Object.assign(
    React.forwardRef(ListComponent) as unknown as (<T>(
        props: ListProps<T> & {ref?: React.Ref<HTMLDivElement>},
    ) => React.ReactElement) & {displayName?: string},
    {
        ItemView: ListItemView,
        SectionHeader: ListSectionHeader,
    },
);

List.displayName = 'List';
