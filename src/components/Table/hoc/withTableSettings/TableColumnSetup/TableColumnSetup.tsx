'use client';

import * as React from 'react';

import {Gear, Grip, Lock} from '@gravity-ui/icons';
import {DragDropContext, Draggable, Droppable} from '@hello-pangea/dnd';
import type {
    DraggableChildrenFn,
    DraggableProvided,
    DraggableStateSnapshot,
    OnDragEndResponder,
} from '@hello-pangea/dnd';

import {useControlledState, useUniqId} from '../../../../../hooks';
import {createOnKeyDownHandler} from '../../../../../hooks/useActionHandlers/useActionHandlers';
import {Button} from '../../../../Button';
import {Icon} from '../../../../Icon';
import type {PopupPlacement} from '../../../../Popup';
import {Text} from '../../../../Text';
import {TreeSelect} from '../../../../TreeSelect/TreeSelect';
import type {
    TreeSelectProps,
    TreeSelectRenderContainer,
    TreeSelectRenderItem,
} from '../../../../TreeSelect/types';
import {TextInput} from '../../../../controls/TextInput';
import {Flex} from '../../../../layout/Flex/Flex';
import type {ListItemViewContentType, ListItemViewProps} from '../../../../useList';
import {ListContainerView, ListItemView, useListFilter} from '../../../../useList';
import {block} from '../../../../utils/cn';
import type {TableColumnConfig} from '../../../Table';
import type {TableSetting} from '../withTableSettings';

import i18n from './i18n';

import './TableColumnSetup.scss';

const b = block('inner-table-column-setup');
const controlsCn = b('controls');
const filterInputCn = b('filter-input');
const emptyPlaceholderCn = b('empty-placeholder');

const reorderArray = <T extends unknown>(list: T[], startIndex: number, endIndex: number): T[] => {
    const result = [...list];
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

const prepareStickyState = (
    itemsById: Record<string, TableColumnSetupItem>,
    visibleFlattenIds: string[],
) => {
    let lastStickyStartIdx = 0;
    for (; lastStickyStartIdx !== visibleFlattenIds.length; lastStickyStartIdx++) {
        const visibleFlattenId = visibleFlattenIds[lastStickyStartIdx];
        const item = itemsById[visibleFlattenId];

        if (item?.sticky !== 'left' && item?.sticky !== 'start') {
            break;
        }
    }

    let firstStickyEndIdx = visibleFlattenIds.length;
    for (; firstStickyEndIdx !== 0; firstStickyEndIdx--) {
        const visibleFlattenId = visibleFlattenIds[firstStickyEndIdx - 1];
        const item = itemsById[visibleFlattenId];

        if (item?.sticky !== 'right' && item?.sticky !== 'end') {
            break;
        }
    }

    return {
        stickyStartItemIdList: visibleFlattenIds.slice(0, lastStickyStartIdx),
        sortableItemIdList: visibleFlattenIds.slice(lastStickyStartIdx, firstStickyEndIdx),
        stickyEndItemIdList: visibleFlattenIds.slice(firstStickyEndIdx),
    };
};

const prepareValue = (tableColumnItems: TableColumnSetupItem[]) => {
    const selectedIds: string[] = [];

    tableColumnItems.forEach(({id, isSelected}) => {
        if (isSelected) {
            selectedIds.push(id);
        }
    });

    return selectedIds;
};

interface RenderContainerProps {
    isDragDisabled?: boolean;
    provided?: DraggableProvided;
    snapshot?: DraggableStateSnapshot;
}

const RENDER_DRAG_DISABLED_CONTAINER_PROPS: RenderContainerProps = {isDragDisabled: true};

interface SwitcherProps {
    onKeyDown: React.KeyboardEventHandler<HTMLElement>;
    onClick: React.MouseEventHandler<HTMLElement>;
}

interface UseDndRenderContainerParams {
    onDragEnd: OnDragEndResponder;
    renderControls: () => React.ReactNode;
}
const useDndRenderContainer = ({onDragEnd, renderControls}: UseDndRenderContainerParams) => {
    const uniqId = useUniqId();

    const dndRenderContainer: TreeSelectRenderContainer<TableColumnSetupItem> = ({
        renderItem,
        list,
        containerRef,
        id,
        className,
    }) => {
        const renderDndActiveItem: DraggableChildrenFn = (provided, snapshot, rubric) => {
            const renderContainerProps: RenderContainerProps = {
                provided,
                snapshot,
            };

            return renderItem(
                list.structure.visibleFlattenIds[rubric.source.index],
                rubric.source.index,
                renderContainerProps,
            );
        };

        const {stickyStartItemIdList, sortableItemIdList, stickyEndItemIdList} = prepareStickyState(
            list.structure.itemsById,
            list.structure.visibleFlattenIds,
        );

        const stickyStartItemList = stickyStartItemIdList.map((visibleFlattenId, idx) => {
            return renderItem(visibleFlattenId, idx, RENDER_DRAG_DISABLED_CONTAINER_PROPS);
        });

        const sortableItemList = sortableItemIdList.map((visibleFlattenId, idx) => {
            return renderItem(visibleFlattenId, idx + stickyStartItemIdList.length);
        });

        const stickyEndItemList = stickyEndItemIdList.map((visibleFlattenId, idx) => {
            return renderItem(
                visibleFlattenId,
                stickyStartItemList.length + sortableItemList.length + idx,
                RENDER_DRAG_DISABLED_CONTAINER_PROPS,
            );
        });

        return (
            <React.Fragment>
                <ListContainerView ref={containerRef} id={id} className={className}>
                    {stickyStartItemList}
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId={uniqId} renderClone={renderDndActiveItem}>
                            {(droppableProvided) => {
                                return (
                                    <div
                                        {...droppableProvided.droppableProps}
                                        ref={droppableProvided.innerRef}
                                    >
                                        {sortableItemList}
                                        {droppableProvided.placeholder}
                                    </div>
                                );
                            }}
                        </Droppable>
                    </DragDropContext>
                    {stickyEndItemList}
                </ListContainerView>
                <div className={controlsCn}>{renderControls()}</div>
            </React.Fragment>
        );
    };

    return dndRenderContainer;
};

const useDndRenderItem = (sortable: boolean | undefined) => {
    const renderDndItem: TreeSelectRenderItem<TableColumnSetupItem, RenderContainerProps> = ({
        data: item,
        props,
        index,
        renderContainerProps,
    }) => {
        const isDragDisabled = sortable === false || renderContainerProps?.isDragDisabled === true;
        const endSlot = isDragDisabled ? undefined : <Icon data={Grip} size={16} />;
        const startSlot = item.isRequired ? <Icon data={Lock} /> : undefined;
        const selected = item.isRequired ? false : props.selected;

        const commonProps: ListItemViewProps = {
            ...props,
            selected,
            selectionViewType: item.isRequired ? 'single' : 'multiple',
            content: {
                ...props.content,
                startSlot,
                endSlot,
            },
        };

        if (isDragDisabled) {
            return <ListItemView {...commonProps} key={commonProps.id} />;
        }

        const renderItem = (provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
            <ListItemView
                {...commonProps}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
                dragging={snapshot.isDragging}
            />
        );

        if (renderContainerProps?.provided && renderContainerProps.snapshot) {
            return renderItem(renderContainerProps.provided, renderContainerProps.snapshot);
        }

        return (
            <Draggable
                draggableId={props.id}
                index={index}
                key={`item-key-${props.id}`}
                isDragDisabled={isDragDisabled}
            >
                {renderItem}
            </Draggable>
        );
    };

    return renderDndItem;
};

export type TableColumnSetupItem = TableSetting & {
    title: React.ReactNode;
    isRequired?: boolean;
    sticky?: TableColumnConfig<unknown>['sticky'];
};

const mapItemDataToContentProps = (item: TableColumnSetupItem): ListItemViewContentType => {
    return {
        title: item.title,
    };
};

const defaultFilterSettingsFn = (value: string, item: TableColumnSetupItem) => {
    return typeof item.title === 'string'
        ? item.title.toLowerCase().includes(value.trim().toLowerCase())
        : true;
};

const useEmptyRenderContainer = (placeholder?: string): TreeSelectRenderContainer<{}> => {
    const emptyRenderContainer = () => <Text className={emptyPlaceholderCn}>{placeholder}</Text>;
    return emptyRenderContainer;
};

export type RenderControls = (params: {
    DefaultApplyButton: React.ComponentType;
    /**
     * Is used to apply new settings and close the popup
     */
    onApply: () => void;
}) => React.ReactNode;

export interface TableColumnSetupProps {
    renderSwitcher?: (props: SwitcherProps) => React.JSX.Element;

    items: TableColumnSetupItem[];
    sortable?: boolean;
    hideApplyButton?: boolean;

    onUpdate: (newSettings: TableSetting[]) => void;
    popupWidth?: TreeSelectProps<unknown>['popupWidth'];
    popupPlacement?: PopupPlacement;

    /**
     * @deprecated
     */
    renderControls?: RenderControls;

    className?: string;

    defaultItems?: TableColumnSetupItem[];
    showResetButton?: boolean | ((currentItems: TableColumnSetupItem[]) => boolean);

    filterable?: boolean;
    filterPlaceholder?: string;
    filterEmptyMessage?: string;
    filterSettings?: (value: string, item: TableColumnSetupItem) => boolean;
}

export const TableColumnSetup = (props: TableColumnSetupProps) => {
    const {
        renderSwitcher,
        popupWidth,
        popupPlacement,
        items: propsItems,
        onUpdate: propsOnUpdate,
        sortable,
        renderControls,
        className,
        defaultItems = propsItems,
        showResetButton: propsShowResetButton,
        filterable,
        filterPlaceholder,
        filterEmptyMessage,
        filterSettings = defaultFilterSettingsFn,
        hideApplyButton,
    } = props;

    const [open, setOpen] = React.useState(false);
    const [sortingEnabled, setSortingEnabled] = React.useState(sortable);
    const [prevSortingEnabled, setPrevSortingEnabled] = React.useState(sortable);
    if (sortable !== prevSortingEnabled) {
        setPrevSortingEnabled(sortable);
        setSortingEnabled(sortable);
    }

    const [items, setItems] = useControlledState<TableColumnSetupItem[]>(
        hideApplyButton ? propsItems : undefined,
        propsItems,
        hideApplyButton ? propsOnUpdate : undefined,
    );

    // Track changes to propsItems in manual mode
    const [prevPropsItems, setPrevPropsItems] = React.useState(propsItems);
    if (propsItems !== prevPropsItems) {
        setPrevPropsItems(propsItems);
        if (!hideApplyButton) {
            setItems(propsItems);
        }
    }

    const {t} = i18n.useTranslation();

    const filterState = useListFilter({items, filterItem: filterSettings, debounceTimeout: 0});

    const onApply = () => {
        const newSettings = items.map<TableSetting>(({id, isSelected}) => ({id, isSelected}));
        propsOnUpdate(newSettings);
        onOpenChange(false);
    };

    const DefaultApplyButton = () => (
        <Button view="action" width="max" onClick={onApply}>
            {t('button_apply')}
        </Button>
    );

    const onDragEnd: OnDragEndResponder = ({destination, source}) => {
        if (destination?.index !== undefined && destination?.index !== source.index) {
            const reorderedItems = reorderArray(items, source.index, destination.index);
            setItems(reorderedItems);
        }
    };

    const showResetButton =
        typeof propsShowResetButton === 'function'
            ? propsShowResetButton(items)
            : propsShowResetButton;

    const dndRenderContainer = useDndRenderContainer({
        onDragEnd,
        renderControls: () =>
            renderControls ? (
                renderControls({DefaultApplyButton, onApply})
            ) : (
                <Flex gapRow={1} direction="column" className={controlsCn}>
                    {showResetButton && (
                        <Button
                            onClick={() => {
                                if (hideApplyButton) {
                                    propsOnUpdate(defaultItems);
                                }
                                setItems(defaultItems);
                            }}
                            width="max"
                        >
                            {t('button_reset')}
                        </Button>
                    )}
                    {!hideApplyButton && <DefaultApplyButton />}
                </Flex>
            ),
    });

    const dndRenderItem = useDndRenderItem(sortingEnabled);

    const renderControl: TreeSelectProps<unknown>['renderControl'] = ({toggleOpen}) => {
        const onKeyDown = createOnKeyDownHandler(toggleOpen);

        return (
            renderSwitcher?.({onClick: toggleOpen, onKeyDown}) || (
                <Button onClick={toggleOpen} onKeyDown={onKeyDown}>
                    <Icon data={Gear} />
                    {t('button_switcher')}
                </Button>
            )
        );
    };

    const onOpenChange = (open: boolean) => {
        setOpen(open);
        if (open === false) {
            setItems(propsItems);
            setSortingEnabled(sortable);
            filterState.reset();
        }
    };

    const onUpdate = (selectedItemsIds: string[]) => {
        const newItems = items.map((item) => ({
            ...item,
            isSelected: item.isRequired || selectedItemsIds.includes(item.id),
        }));

        setItems(newItems);
    };

    const value = React.useMemo(() => prepareValue(items), [items]);

    const emptyRenderContainer = useEmptyRenderContainer(filterEmptyMessage);

    const onFilterValueUpdate = (value: string) => {
        filterState.onFilterUpdate(value);
        setSortingEnabled(!value.length);
    };

    const slotBeforeListBody = filterable ? (
        <TextInput
            size="m"
            view="clear"
            placeholder={filterPlaceholder}
            value={filterState.filter}
            className={filterInputCn}
            onUpdate={onFilterValueUpdate}
            hasClear
        />
    ) : null;

    const renderContainer =
        filterState.filter && !filterState.items.length ? emptyRenderContainer : dndRenderContainer;

    return (
        <TreeSelect
            className={b(null, className)}
            mapItemDataToContentProps={mapItemDataToContentProps}
            multiple
            size="l"
            open={open}
            value={value}
            items={filterState.filter ? filterState.items : items}
            onUpdate={onUpdate}
            popupWidth={popupWidth}
            onOpenChange={onOpenChange}
            placement={popupPlacement}
            slotBeforeListBody={slotBeforeListBody}
            renderContainer={renderContainer}
            renderControl={renderControl}
            renderItem={dndRenderItem}
        />
    );
};
