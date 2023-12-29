import type React from 'react';

import type {QAProps} from '../types';
import type {
    KnownItemStructure,
    ListItemId,
    ListItemType,
    ListParsedState,
    ListSizeTypes,
    ListState,
    OverrideItemContext,
    RenderItemContext,
    RenderItemState,
} from '../useList';

export type RenderControlProps = {
    open: boolean;
    toggleOpen(): void;
    clearValue(): void;
    ref: React.Ref<HTMLButtonElement>;
    size: ListSizeTypes;
    value: ListItemId[];
    id: string;
    activeItemId?: ListItemId;
};

export type RenderItem<T> = (
    item: T,
    // required item props to render
    state: RenderItemState,
    // internal list context props
    context: RenderItemContext,
    renderContextProps?: Object,
) => React.JSX.Element;

export type RenderContainerProps<T> = ListParsedState<T> &
    ListState & {
        id: string;
        size: ListSizeTypes;
        renderItem(id: ListItemId, renderContextProps?: Object): React.JSX.Element;
        containerRef: React.RefObject<HTMLDivElement>;
    };

export interface TreeSelectProps<T> extends QAProps, Partial<Omit<ListState, 'selectedById'>> {
    value?: ListItemId[];
    defaultOpen?: boolean;
    defaultValue?: ListItemId[];
    items: ListItemType<T>[];
    open?: boolean;
    id?: string | undefined;
    popupClassName?: string;
    popupWidth?: number;
    popupDisablePortal?: boolean;
    multiple?: boolean;
    /**
     * The ability to set the default behavior for group elements
     *
     * - `expandable`. Click on group item will be produce internal `expanded` state toggle
     * - `selectable`. Click on group item will be produce internal `selected` state toggle
     *
     * @default - 'expandable
     */
    groupsBehavior?: 'expandable' | 'selectable';
    size: ListSizeTypes;
    /**
     * Use slots if you don't need access to internal TreeListState.
     * In other situations use `renderContainer` method
     */
    slotBeforeListBody?: React.ReactNode;
    /**
     * Use slots if you don't need access to internal TreeListState.
     * In other situations use `renderContainer` method
     */
    slotAfterListBody?: React.ReactNode;
    /**
     * Define custom id depended on item data value to use in controlled state component variant
     */
    getId?(item: T): ListItemId;
    /**
     * Ability to override custom toggler btn
     */
    renderControl?(props: RenderControlProps): React.JSX.Element;
    /**
     * Override list item content by you custom node.
     */
    renderItem?: RenderItem<T>;
    renderControlContent(item: T): KnownItemStructure;
    onClose?(): void;
    onUpdate?(value: ListItemId[], selectedItems: T[]): void;
    onOpenChange?(open: boolean): void;
    renderContainer?(props: RenderContainerProps<T>): React.JSX.Element;
    /**
     * If you wont to disable default behavior pass `disabled` as a value;
     */
    onItemClick?:
        | 'disabled'
        | ((defaultClickCallback: () => void, content: OverrideItemContext) => void);
}
