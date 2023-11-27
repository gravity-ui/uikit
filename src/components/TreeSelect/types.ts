import type React from 'react';

import type {
    GetItemContent,
    ListItemId,
    ListItemType,
    ListSizeTypes,
    RenderItem,
    RenderItemContext,
} from '../ListNext/types';
import type {QAProps} from '../types';

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

export interface TreeSelectProps<T> extends QAProps {
    value?: string[];
    defaultOpen?: boolean;
    defaultValue?: ListItemId[];
    items: ListItemType<T>[];
    open?: boolean;
    id?: string | undefined;
    popupClassName?: string;
    popupWidth?: number;
    popupDisablePortal?: boolean;
    disabledItemsStateMap: Record<ListItemId, boolean>;
    expandedItemsMap: Record<ListItemId, boolean>;
    multiple?: boolean;
    /**
     * Is it possible to select group elements or not
     * @default - 'expandable
     */
    groupsBehavior?: 'expandable' | 'selectable';
    virtualized?: boolean;
    /**
     * If you need custom action button in group,
     * use `getItemContent` and pass it as a `endIcon` prop.
     * ```tsx
     * getItemContent={({title}: T, {isGroup}) => ({
     *  title,
     *  endIcon: isGroup ? buttonNodeWithLogic : undefined
     * })}
     * ```
     */
    groupAction?: 'none' | 'items-count';
    size: ListSizeTypes;
    slotBeforeListBody?: React.ReactNode;
    slotAfterListBody?: React.ReactNode;
    listContainerClassName?: string;
    /**
     * Define custom id depended on item data value to use in controlled state component variant
     */
    getId?(item: T): ListItemId;
    /**
     * Ability to override custom toggler btn
     */
    renderControl?(props: RenderControlProps): React.JSX.Element;
    /**
     * Required function to map you custom data to list item props.
     * This function need to calculate item size by availability of `subtitle` prop
     */
    getItemContent: GetItemContent<T>;
    /**
     * For example wrap item with divider or some custom react node
     */
    itemWrapper?(node: React.JSX.Element, context: RenderItemContext): React.JSX.Element;
    onClose?(): void;
    containerWrapper?(
        originalNode: React.JSX.Element,
        context: {items: ListItemType<T>[]},
    ): React.JSX.Element;
    renderItem?: RenderItem<T>;
    onUpdate?(value: string[]): void;
    onOpenChange?(open: boolean): void;
}
