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
 *  `undefined` игнорируются
 */
export type ListPropsOverrides = React.HTMLAttributes<HTMLElement> & {
    ref?: React.Ref<HTMLElement>;
} & {
    [key: `data-${string}`]: string | undefined;
};

/**
 * `draggable` исключён: у вьюхи одноимённый слотовый проп, семантику
 *  их стыка определит фаза 4 (dnd); ядро атрибут не ставит
 */
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

/** Слои (выделение — §6, dnd — §8 плана) добавятся аддитивно в следующих фазах */
export type ListProps<T> = ListCoreProps<T>;
