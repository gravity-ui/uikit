'use client';

import * as React from 'react';

import {block} from '../../utils/cn';
import {warnOnce} from '../../utils/warn';
import {ListItemView} from '../ListItemView/ListItemView';

import {ListSectionHeader} from './SectionHeader';
import {ListVirtualizationContext} from './VirtualizationContext';
import type {
    ListCellDOMProps,
    ListItemContext,
    ListItemDOMProps,
    ListItemHelpers,
    ListProps,
    ListPropsOverrides,
    ListRole,
    ListSize,
} from './types';
import {useList} from './useList';

import './List.scss';

const b = block('list-v2');

// Оценка высоты строки до рендера для слоя виртуализации (§7): min-height
// дефолтной вьюхи (border-box, однострочный контент); разброс фактических
// высот закрывает measure
const ESTIMATED_ITEM_SIZE: Record<ListSize, number> = {s: 24, m: 28, l: 32, xl: 36};

/**
 * Стабильный диспетчер геттеров ядра для мемоизированных строк: сам объект
 * живёт один на маунт листа и дёргает АКТУАЛЬНЫЙ инстанс ядра через ref —
 * строка, пропустившая ре-рендер, не остаётся с устаревшим замыканием
 */
interface ListRowCore {
    getItemProps: (id: string, overrides?: ListPropsOverrides) => ListItemDOMProps;
    getCellProps: (overrides?: ListPropsOverrides) => ListCellDOMProps;
}

interface ListRowProps<T> {
    ctx: ListItemContext<T>;
    /**
     * Инвалидатор мемо для выходов getItemProps, не выраженных в ctx (DOM id,
     * roving tab-stop без активной, aria-нумерация при виртуализации) —
     * значения считает ядро, строка ключ не интерпретирует
     */
    memoKey: string;
    size: ListSize;
    selectionStyle: 'check' | 'highlight';
    /** Идёт перетаскивание (dnd-слой): вьюхе гасится CSS-hover */
    dragActive: boolean;
    /** ARIA-роль списка (ось A, §15): в grid дефолтный рендер кладёт контент в ячейку */
    role: ListRole;
    renderItem: ListProps<T>['renderItem'];
    core: ListRowCore;
}

function ListRowComponent<T>({
    ctx,
    size,
    selectionStyle,
    dragActive,
    role,
    renderItem,
    core,
}: ListRowProps<T>) {
    const helpers: ListItemHelpers = {
        getItemProps: (overrides) => core.getItemProps(ctx.id, overrides),
        getCellProps: (overrides) => core.getCellProps(overrides),
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
            // Во время перетаскивания hover-индикация вьюхи гасится
            // (симметрично приостановке hover-активации в ядре): у либ
            // с синтетическим драгом браузер продолжает вешать :hover
            // на строку под курсором
            ...(dragActive ? {hovered: false} : undefined),
        }),
    };

    if (renderItem) {
        return <React.Fragment>{renderItem(ctx, helpers)}</React.Fragment>;
    }

    if (ctx.content === undefined) {
        // Дефолтный getItemContent отдаёт контент только string-айтемам —
        // объектный айтем без геттера рендерится пустой строкой
        warnOnce(
            '[List] Rows render empty: the default content getter only renders string items. Pass `getItemContent` (or `renderItem`) for object items.',
        );
    }

    return ctx.kind === 'section' ? (
        // Заголовки секций остаются presentation + aria-hidden в обеих
        // роль-моделях: плоская модель §9 сохраняется, в grid-навигации
        // они не участвуют
        <ListSectionHeader {...helpers.getItemProps()} size={size}>
            {ctx.content}
        </ListSectionHeader>
    ) : (
        <ListItemView {...helpers.getItemProps()} {...helpers.getItemViewProps()}>
            {role === 'grid' ? (
                // В grid контент обязан лежать в ячейке: role="row" требует
                // владеть хотя бы одним gridcell. В listbox обёртки нет вовсе —
                // маркап дефолтного рендера остаётся прежним
                <div {...helpers.getCellProps()}>{ctx.content}</div>
            ) : (
                ctx.content
            )}
        </ListItemView>
    );
}

function areListRowPropsEqual<T>(prev: ListRowProps<T>, next: ListRowProps<T>): boolean {
    const a = prev.ctx;
    const c = next.ctx;
    return (
        prev.memoKey === next.memoKey &&
        prev.size === next.size &&
        prev.selectionStyle === next.selectionStyle &&
        prev.dragActive === next.dragActive &&
        prev.role === next.role &&
        prev.renderItem === next.renderItem &&
        prev.core === next.core &&
        a.id === c.id &&
        a.item === c.item &&
        a.index === c.index &&
        a.kind === c.kind &&
        a.content === c.content &&
        a.state.active === c.state.active &&
        a.state.disabled === c.state.disabled &&
        a.state.selected === c.state.selected &&
        a.state.dragging === c.state.dragging &&
        a.state.dropTarget === c.state.dropTarget
    );
}

// Мемоизация строк по ctx-срезу (перф-обязательство §8): обновление
// dropTarget на dragover приходит новым объектом адаптера — пере-рендерятся
// только строки, чей срез изменился, а не весь список. Ctx сравнивается по
// значениям полей (объект пересобирается каждый рендер), поэтому мемо
// работает при стабильных identity items/геттеров/renderItem
const ListRow = React.memo(ListRowComponent, areListRowPropsEqual) as typeof ListRowComponent;

function ListComponent<T>(props: ListProps<T>, ref: React.ForwardedRef<HTMLDivElement>) {
    const {size = 'm', className, style, qa, renderItem, selectionMode} = props;
    const virtualization = React.useContext(ListVirtualizationContext);
    const list = useList(props);

    const listRef = React.useRef(list);
    listRef.current = list;
    const [core] = React.useState<ListRowCore>(() => ({
        getItemProps: (id, overrides) => listRef.current.getItemProps(id, overrides),
        getCellProps: (overrides) => listRef.current.getCellProps(overrides),
    }));

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

    // Смена (старт/финиш drag) стоит одного ре-рендера всех строк окна —
    // в отличие от dropTarget, это происходит не на каждый dragover
    const dragActive = (props.dnd?.draggingId ?? null) !== null;

    const renderRow = (id: string) => (
        <ListRow<T>
            key={id}
            ctx={list.getItemContext(id)}
            memoKey={list.getItemMemoKey(id)}
            size={size}
            selectionStyle={selectionStyle}
            dragActive={dragActive}
            role={list.role}
            renderItem={renderItem}
            core={core}
        />
    );

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
                persistedIndexes={list.persistedRowIndexes}
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
