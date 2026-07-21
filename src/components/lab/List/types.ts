import type * as React from 'react';

import type {QAProps} from '../../types';

export type ListSize = 's' | 'm' | 'l' | 'xl';

export interface ListItemGetters<T> {
    /** Уникальный id айтема. default: `(i) => i.id`; для string-айтема — сама строка */
    getItemId?: (item: T) => string;
    /** default: `(i) => Boolean(i.disabled)` */
    getItemDisabled?: (item: T) => boolean;
    /**
     * Секции: узел с children рендерится как заголовок + опции.
     *  default: `(i) => i.children`
     */
    getItemChildren?: (item: T) => readonly T[] | undefined;
    /**
     * ЧТО показать: children строки. string-айтем — сам собой.
     *  Структуру (description/слоты) даёт renderItem, не этот геттер.
     */
    getItemContent?: (item: T) => React.ReactNode;
    /**
     * Текст для typeahead. default: content, если он строка.
     *  Accessible name опции этот геттер НЕ задаёт: нестроковому контенту
     *  всё равно нужен собственный текст или aria-label
     */
    getItemTextValue?: (item: T) => string;
}

export interface ListItemContext<T> {
    id: string;
    item: T;
    /** Позиция в visibleIds, включая заголовки секций */
    index: number;
    kind: 'item' | 'section';
    /** Результат getItemContent */
    content?: React.ReactNode;
    state: {
        /** Подсвечен клавиатурой/наведением */
        active: boolean;
        disabled: boolean;
        /** Заполняется только при активном слое выделения */
        selected?: boolean;
        /** Заполняется только при активном слое dnd */
        dragging?: boolean;
        /** Заполняется только при активном слое dnd */
        dropTarget?: 'before' | 'after' | null;
    };
}

/**
 * Переопределения, вливаемые в props строки/контейнера. Композиция:
 *  on*-обработчики цепочкой (переданный — после базового), className —
 *  конкатенация, ref — форк, style — shallow-merge; ключи со значением
 *  `undefined` игнорируются.
 *
 * `draggable` исключён (решение фазы 4): нативный атрибут не проходит через
 *  props-контракт вовсе — ref-based dnd-либы ставят его на элементе сами
 *  (pragmatic-dnd), остальным он не нужен. Ядро ключ никогда не эмитит,
 *  поэтому одноимённый слотовый проп вьюхи (рендерит drag-handle) не
 *  конфликтует со спредом getItemProps
 */
export type ListPropsOverrides = Omit<React.HTMLAttributes<HTMLElement>, 'draggable'> & {
    ref?: React.Ref<HTMLElement>;
} & {
    [key: `data-${string}`]: string | undefined;
};

/** `draggable` исключён — см. ListPropsOverrides */
export type ListItemDOMProps = Omit<React.HTMLAttributes<HTMLElement>, 'draggable'> &
    React.AriaAttributes & {role: string; ref: React.RefCallback<HTMLElement>} & {
        [key: `data-${string}`]: string | undefined;
    };

export interface ListItemViewStateProps {
    size?: ListSize;
    active: boolean;
    disabled: boolean;
    selected?: boolean;
    selectionStyle?: 'check' | 'highlight' | 'none';
    /**
     * На время перетаскивания (dnd-слой, §8) ядро отдаёт `false` — гасит
     *  CSS-:hover вьюхи: курсор позиционирует вставку, а не выбирает строку
     */
    hovered?: boolean;
}

export interface ListItemHelpers {
    /**
     * DOM/a11y-props строки с уже привязанным id. Поведением владеет ядро:
     *  вьюха и кастомный маркап не добавляют своей логики поверх
     */
    getItemProps(overrides?: ListPropsOverrides): ListItemDOMProps;
    /**
     * ctx.state в терминах пропсов вьюхи — чтобы кастомный renderItem
     *  не перевязывал active/selected/disabled руками
     */
    getItemViewProps(): ListItemViewStateProps;
}

export interface ListCoreProps<T> extends ListItemGetters<T>, QAProps {
    items: readonly T[];
    'aria-label'?: string;
    'aria-labelledby'?: string;

    /**
     * Активный (подсвеченный) айтем — controlled/uncontrolled.
     *  Это навигация (roving-фокус), не выделение — есть всегда
     */
    activeItemId?: string;
    defaultActiveItemId?: string;
    onActiveItemUpdate?: (id: string | undefined) => void;

    /** «Применение» айтема: Enter или клик */
    onItemAction?: (id: string, item: T) => void;

    /** Активация наведением. default: true */
    activateOnHover?: boolean;

    /** Кастомный рендер строки; дефолт — List.ItemView / List.SectionHeader */
    renderItem?: (ctx: ListItemContext<T>, helpers: ListItemHelpers) => React.ReactNode;

    /** База id строк + цель внешних aria-controls; default — авто-id */
    id?: string;
    size?: ListSize;
    className?: string;
    style?: React.CSSProperties;
}

/**
 * Слой выделения (§6 плана). Пока `selectionMode` не передан, слоя нет:
 *  ни `aria-selected`/`aria-multiselectable`, ни `ctx.state.selected`,
 *  ни выделения по Space («не выбран» ≠ «не выбирается» для SR)
 */
export interface ListSelectionProps {
    /** Включает слой. Отдельного `'none'` нет — его выражает отсутствие пропа */
    selectionMode?: 'single' | 'multiple';
    /** Наружу массив (сериализуемо), внутри Set */
    selectedIds?: readonly string[];
    defaultSelectedIds?: readonly string[];
    onSelectedUpdate?: (ids: string[]) => void;
}

/** Цель вставки: строка и грань, у которой рисуется индикатор */
export interface ListDropTarget {
    id: string;
    position: 'before' | 'after';
}

/**
 * Props, которые отдаёт dnd-адаптер. Сверх общих ограничений
 *  `ListPropsOverrides` исключены `role`, `id` и `tabIndex`: ими владеет
 *  ядро (ARIA-модель listbox, DOM id строки, roving tab-stop), а композиция
 *  для не-`on*` ключей работает по правилу «последний побеждает» — адаптер
 *  затёр бы их молча. Практический случай — объект `attributes` из
 *  `useSortable` (dnd-kit): `{role: 'button', tabIndex: 0, ...}`; его нужно
 *  спредить не через адаптер, а самому — и только там, где это осознанно
 */
export type ListDndProps = Omit<ListPropsOverrides, 'role' | 'id' | 'tabIndex'>;

/**
 * Слой dnd (§8 плана): контракт без привязки к dnd-либе — потребитель
 *  приносит свою, адаптер транслирует её в props и состояние; данные двигает
 *  потребитель (`moveItem`), ядро только отражает состояние и мёржит props.
 *  Скоуп — ref/props-based либы (референсы: pragmatic-drag-and-drop и
 *  dnd-kit); либы с компонентами-обёртками и обязательными слотами внутри
 *  контейнера (hello-pangea) контрактом невыразимы — итог спайка фазы 4.
 *
 * Оба геттера опциональны: «state-only адаптер» легален (паттерн dnd-kit —
 *  props-половину закрывает потребитель per-item хуком в своём компоненте
 *  строки через renderItem, адаптер несёт только draggingId/dropTarget).
 *
 * Обязательства адаптера:
 *  - ref'ы в ОБОИХ геттерах стабильны (per id — в getItemDndProps):
 *    композиция ядра кеширует форки по identity, поэтому новый callback
 *    на каждый рендер дёргал бы перерегистрацию элемента в либе — а во
 *    время перетаскивания лист ре-рендерится на каждое обновление
 *    dropTarget;
 *  - props из геттеров НЕ ЗАМЫКАЮТ рендер-стейт: строки мемоизируются по
 *    своему ctx-срезу (перф-обязательство §8) и могут не перечитать геттер
 *    после ре-рендера листа. Обработчику, которому нужны свежие данные
 *    (`items`, `draggingId` в момент drop), читать их через ref, а не из
 *    замыкания рендера;
 *  - обновления dropTarget дедуплицируются до setState (иначе re-render
 *    на каждый пиксель dragover);
 *  - state-половина (draggingId, а с индикаторной моделью и dropTarget)
 *    заполняется ДАЖЕ при чисто композиционной интеграции, когда props идут
 *    мимо адаптера (обёртки/хуки в renderItem): без draggingId ядро не
 *    приостановит активацию по наведению и не погасит hover-индикацию вьюхи
 *    на время перетаскивания.
 */
export interface ListDndAdapter {
    /**
     * Props на корень листа (зона сброса). ref — для либ, регистрирующих
     *  элемент (pragmatic-dnd не отдаёт props вовсе)
     */
    getContainerDndProps?(): ListDndProps;
    /**
     * Props на строку; вливаются в getItemProps контрактом композиции
     *  (после базовых props ядра, до overrides потребителя) — только в опции,
     *  заголовки секций не участвуют в dnd
     */
    getItemDndProps?(id: string): ListDndProps;
    /** Кто перетаскивается — источник ctx.state.dragging и data-dragging */
    draggingId?: string | null;
    /**
     * Цель вставки — источник ctx.state.dropTarget и data-drop-target;
     *  индикатор вставки лист рисует сам. Декларативно: либа обновляет
     *  state → новый объект адаптера (императивного setDropTarget нет)
     */
    dropTarget?: ListDropTarget | null;
}

export interface ListProps<T> extends ListCoreProps<T>, ListSelectionProps {
    /**
     * Слой dnd (§8 плана). Пока проп не передан, слоя не существует:
     *  ни полей dragging/dropTarget в ctx.state, ни data-атрибутов
     */
    dnd?: ListDndAdapter;
}
