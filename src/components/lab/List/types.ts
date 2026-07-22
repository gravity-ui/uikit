import type * as React from 'react';

import type {QAProps} from '../../types';

import type {LIST_FOCUS_OWNER_CHANNEL, ListFocusOwnerChannel} from './focusOwnerChannel';

export type ListSize = 's' | 'm' | 'l' | 'xl';

/**
 * ARIA-роль списка — она же роль-модель строк и ячеек (ось A, §15 плана).
 *  Выбирается по содержимому строк: интерактивные потомки валидны только
 *  в grid-модели
 */
export type ListRole =
    /**
     * Список опций: контейнер — `listbox`, строка — `option`.
     *  `option` — ЛИСТОВАЯ роль ARIA: интерактивные потомки (кнопка, чекбокс,
     *  ссылка) внутри неё невалидны, ячеек нет — `getCellProps()` пустой.
     *  Клавиатура: `↑`/`↓`/`Home`/`End`/typeahead, при виртуализации —
     *  `aria-setsize`/`aria-posinset`
     */
    | 'listbox'
    /**
     * Строки с интерактивом: контейнер — `grid`, строка — `row`, контент —
     *  `gridcell` (`getCellProps()`). Ячейка ЛЕГИТИМНО содержит интерактив
     *  (ручка dnd, чекбокс, row-action), `aria-selected` живёт на строке.
     *  Клавиатура: к навигации по строкам добавляются `←`/`→` — вход
     *  в интерактив ячейки и возврат на строку; при виртуализации —
     *  `aria-rowcount`/`aria-rowindex`
     */
    | 'grid';

/**
 * Стратегия синхронизации фокуса с активностью — шаг «б» клавиатурной машины
 *  (ось B, §5/§15 плана). Наружу не торчит: `activedescendant` включает проп
 *  `focusOwner` — DOM-фокус остаётся у внешнего владельца (инпута)
 */
export type ListFocusStrategy = 'roving' | 'activedescendant';

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
 * Обработчики из overrides вызываются и на disabled-строках: цепочка
 *  композиции не гейтуется состоянием (базовый обработчик ядра выходит из
 *  себя сам, но переданный после него вызывается всегда). Если это важно —
 *  проверяйте `ctx.state.disabled` в своём обработчике.
 *
 * `role`/`id`/`tabIndex` принадлежат ядру (ARIA-модель, DOM id строки,
 *  roving tab-stop). В overrides они применяются как переданы — это
 *  осознанный эскейп-хэтч (например, своя роль строки до официальной
 *  параметризации ролей), но затирание молча ломает клавиатурную машину,
 *  поэтому в dev будет предупреждение. Props dnd-адаптера, в отличие от
 *  overrides, эти ключи не проносят вовсе (`ListDndProps`).
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

/**
 * Props ячейки строки. В listbox-режиме `role` отсутствует (ячеек нет), в
 *  grid-режиме — `role="gridcell"`: один и тот же `renderItem` работает в обеих
 *  роль-моделях
 */
export type ListCellDOMProps = Omit<React.HTMLAttributes<HTMLElement>, 'draggable'> &
    React.AriaAttributes & {role?: string; ref?: React.RefCallback<HTMLElement>} & {
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
    /**
     * DOM/a11y-props ЯЧЕЙКИ строки (ось роль-модели, §15 плана). При
     *  `role="grid"` — `role="gridcell"`: интерактив (ручка dnd,
     *  чекбокс, row-action) валиден только внутри ячейки. В listbox-режиме
     *  геттер отдаёт пустой объект, поэтому одна и та же обёртка ячейки
     *  в `renderItem` работает в обеих роль-моделях
     */
    getCellProps(overrides?: ListPropsOverrides): ListCellDOMProps;
}

/** Props внешнего владельца фокуса — инпута комбобокса (§15 плана) */
export type ListFocusOwnerInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    role: string;
};

/**
 * Внешний владелец DOM-фокуса списка (ось B, §15 плана) — объект из
 *  `useListFocusOwner()`. Пока проп `focusOwner` не передан, список живёт в
 *  roving-стратегии: DOM-фокус переезжает на строки.
 *
 * Канал рассчитан на mount/unmount-модель попапа: `aria-expanded` считается
 *  по факту монтирования списка, клавиатурная машина отключается вместе с
 *  ним. Держать закрытый попап смонтированным (keepMounted) не поддержано:
 *  у скрытого списка стрелки продолжали бы двигать активность, а
 *  `aria-expanded` остался бы `true`
 */
export interface ListFocusOwner {
    /**
     * Props инпута: `role="combobox"`, `aria-expanded`, `aria-controls`,
     *  `aria-activedescendant`, `onKeyDown` (клавиатурная машина списка).
     *  Переопределения компонуются по общему контракту (свой `onKeyDown` —
     *  после машины); `role` и `aria-expanded` можно переопределить —
     *  эскейп-хэтч для не-попап паттернов (постоянно видимый фильтруемый
     *  список)
     */
    getInputProps(
        overrides?: React.InputHTMLAttributes<HTMLInputElement>,
    ): ListFocusOwnerInputProps;
    /**
     * Канал ядра — доступен только по module-private символу
     * @internal
     */
    readonly [LIST_FOCUS_OWNER_CHANNEL]: ListFocusOwnerChannel;
}

export interface ListCoreProps<T> extends ListItemGetters<T>, QAProps {
    items: readonly T[];
    'aria-label'?: string;
    'aria-labelledby'?: string;

    /**
     * Активный (подсвеченный) айтем — controlled/uncontrolled.
     *  Это навигация (roving-фокус), не выделение — есть всегда.
     *  `null` — controlled-«нет активного»; `undefined` — uncontrolled
     */
    activeItemId?: string | null;
    defaultActiveItemId?: string;
    onActiveItemUpdate?: (id: string | null) => void;

    /** «Применение» айтема: Enter или клик */
    onItemAction?: (id: string, item: T) => void;

    /** Активация наведением. default: true */
    activateOnHover?: boolean;

    /**
     * ARIA-роль списка (ось роль-модели, §15 плана). default: `'listbox'`;
     *  `'grid'` — когда в строках есть интерактив (кнопка-ручка dnd, чекбокс,
     *  row-action): внутри `option` он невалиден, внутри `gridcell` — валиден.
     *  Описание каждой роли — в JSDoc `ListRole`.
     *
     * Роль задаётся явно, а не выводится из содержимого строк: узнать про
     *  интерактив можно только сканом DOM ПОСЛЕ монтирования — роль
     *  контейнера успела бы уехать в скринридер как `listbox` и смениться
     *  на лету
     */
    role?: ListRole;

    /**
     * Внешний владелец DOM-фокуса — объект из `useListFocusOwner()`
     *  (ось B, §15 плана). Включает стратегию `aria-activedescendant`: фокус
     *  остаётся в инпуте владельца, список только подсвечивает активную строку
     *  и доскролливает к ней. Символьные клавиши в этом режиме уходят
     *  владельцу (фильтрация вместо typeahead)
     */
    focusOwner?: ListFocusOwner;

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
