import React, {Component, KeyboardEvent as ReactKeyboardEvent, ReactNode} from 'react';

export interface ListProps<T> {
    /** Список элементов */
    items: T[];
    /** Высота элемента в `px` (или функция, возвращающая значение высоты для элемента). */
    itemHeight?: number | ((item: T) => number);
    /** Высота списка элементов (или функция, возвращающая значение высоты для списка). Может быть полезно, чтобы задавать высоту списка динамически. */
    itemsHeight?: number | ((items: T[]) => number);
    /** Кастомное имя класса которое будет добавлено к контейнеру элемента */
    itemClassName?: string;
    itemsClassName?: string;

    theme?: string;
    view?: string;
    tone?: string;
    size?: string;
    className?: string;

    /** Функция рендера, получающая на вход элемент и возвращающая React-ноду */
    renderItem?: (item: T, isItemActive: boolean, itemIndex: number) => ReactNode;
    /** Функция фильтрации, которая принимает введенную строку в инпут поиска/фильтрации, и возвращает функцию, которая получает на вход элемент и возвращает boolean */
    filterItem?: (filter: string) => (item: T) => boolean;
    /** Функция, которая вызывается после отрабатывания внутренней фильтрации */
    onFilterEnd?: ({items}: {items: T[]}) => void;

    /** Флаг, включающий поле фильтра */
    filterable?: boolean;
    /** Значение фильтра (при использовании внешней сортировки) */
    filter?: string;
    /** Placeholder для поля фильтра */
    filterPlaceholder?: string;
    /** Placeholder для пустого списка */
    emptyPlaceholder?: string;
    /** Класс для стилизации инпута фильтра */
    filterClassName?: string;
    /** Обработчик изменения фильтра (при использовании внешней сортировки) */
    onFilterUpdate?: (filter: string) => void;

    /** Флаг, включающий виртуализацию. При выключенном флаге будут отрисованы все элементы разом */
    virtualized?: boolean;
    /** Флаг, включающий сортировку списка */
    sortable?: boolean;
    /** Выравнивание индикатора сортировки (слева или справа) */
    sortHandleAlign?: 'left' | 'right';
    /** Обработчик события сортировки */
    onSortEnd?: ({oldIndex, newIndex}: {oldIndex: number; newIndex: number}) => void;

    /** При выставленном флаге выделение элемента пропадает при уходе курсора с элемента или потере списком фокуса, при снятом - последний выделенный элемент остается выделенным всегда */
    deactivateOnLeave?: boolean;
    /** При заданном значении элемент с этим индексом рендерится как активный */
    activeItemIndex?: number;
    /** При заданном значении элемент с этим индексом рендерится как выбранный (цвет фона из `--yc-color-selection`) */
    selectedItemIndex?: number;

    /** Обработчик клика по элементу */
    onItemClick?: (item: T, index: number, fromKeyboard?: boolean) => void;
}

export class List<T = any> extends Component<ListProps<T>> {
    static moveListElement<T>(list: T[], oldIndex: number, newIndex: number): T[];

    getActiveItem: () => number | null;
    activateItem: (index: number, scrollTo = true) => void;
    onKeyDown: (event: KeyboardEvent | ReactKeyboardEvent) => void;
}

export const listDefaultProps: Partial<ListProps<any>>;

export class ListItem extends React.Component {
    getRef: () => React.RefObject<HTMLDivElement>;
}
