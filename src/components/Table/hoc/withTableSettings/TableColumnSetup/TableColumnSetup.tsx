import React from 'react';

import {Gear, Grip, Lock} from '@gravity-ui/icons';
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
import type {
    DraggableChildrenFn,
    DraggableProvided,
    DraggableStateSnapshot,
    OnDragEndResponder,
} from 'react-beautiful-dnd';

import {useUniqId} from '../../../../../hooks';
import type {PopperPlacement} from '../../../../../hooks/private';
import {createOnKeyDownHandler} from '../../../../../hooks/useActionHandlers/useActionHandlers';
import {Button} from '../../../../Button';
import {Icon} from '../../../../Icon';
import {TreeSelect} from '../../../../TreeSelect/TreeSelect';
import type {
    TreeSelectProps,
    TreeSelectRenderContainer,
    TreeSelectRenderItem,
} from '../../../../TreeSelect/types';
import type {ListItemViewProps} from '../../../../useList';
import {ListContainerView, ListItemView} from '../../../../useList';
import {block} from '../../../../utils/cn';
import type {TableColumnConfig} from '../../../Table';
import type {TableSetting} from '../withTableSettings';

import i18n from './i18n';

import './TableColumnSetup.scss';

function identity<T>(value: T): T {
    return value;
}

const b = block('inner-table-column-setup');
const controlsCn = b('controls');

const reorderArray = <T extends unknown>(list: T[], startIndex: number, endIndex: number): T[] => {
    const result = [...list];
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

const prepareDndItems = (tableColumnItems: TableColumnSetupItem[]) => {
    return tableColumnItems.map<Item>((tableColumnItem) => {
        const hasSelectionIcon = !tableColumnItem.isRequired;

        return {
            id: tableColumnItem.id,
            title: tableColumnItem.title,
            isRequired: tableColumnItem.isRequired,
            isSelected: tableColumnItem.isSelected,
            sticky: tableColumnItem.sticky,
            startSlot: tableColumnItem.isRequired ? <Icon data={Lock} /> : undefined,
            hasSelectionIcon,
            selected: hasSelectionIcon ? tableColumnItem.isSelected : undefined,
        };
    });
};

const prepareStikyState = (itemsById: Record<string, Item>, visibleFlattenIds: string[]) => {
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

    const dndRenderContainer: TreeSelectRenderContainer<Item> = ({
        renderItem,
        visibleFlattenIds,
        itemsById,
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
                visibleFlattenIds[rubric.source.index],
                rubric.source.index,
                renderContainerProps,
            );
        };

        const {stickyStartItemIdList, sortableItemIdList, stickyEndItemIdList} = prepareStikyState(
            itemsById,
            visibleFlattenIds,
        );

        const stickyStartItemList = stickyStartItemIdList.map((visibleFlattenId, idx) => {
            return renderItem(visibleFlattenId, idx, RENDER_DRAG_DISABLED_CONTAINER_PROPS);
        });

        const sortableItemList = sortableItemIdList.map((visibleFlattenId, idx) => {
            return renderItem(visibleFlattenId, idx + stickyStartItemIdList.length);
        });

        const stickyEndItemList = stickyEndItemIdList.map((visibleFlattenId, idx) => {
            return renderItem(visibleFlattenId, idx, RENDER_DRAG_DISABLED_CONTAINER_PROPS);
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
    const renderDndItem: TreeSelectRenderItem<Item, RenderContainerProps> = ({
        data,
        props,
        index,
        renderContainerProps,
    }) => {
        const isDragDisabled = sortable === false || renderContainerProps?.isDragDisabled === true;

        const endSlot =
            data.endSlot ?? (isDragDisabled ? undefined : <Icon data={Grip} size={16} />);

        const commonProps = {
            ...props,
            ...data,
            endSlot,
        };

        if (isDragDisabled) {
            return <ListItemView {...commonProps} />;
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
                draggableId={data.id}
                index={index}
                key={`item-key-${data.id}`}
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

type Item = TableColumnSetupItem &
    ListItemViewProps & {
        id: string;
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

    onUpdate: (newSettings: TableSetting[]) => void;
    popupWidth?: TreeSelectProps<unknown>['popupWidth'];
    popupPlacement?: PopperPlacement;

    /**
     * @deprecated
     */
    renderControls?: RenderControls;

    className?: string;
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
    } = props;

    const [open, setOpen] = React.useState(false);

    const [items, setItems] = React.useState(propsItems);
    const [prevPropsItems, setPrevPropsItems] = React.useState(propsItems);
    if (propsItems !== prevPropsItems) {
        setPrevPropsItems(propsItems);

        setItems(propsItems);
    }

    const onApply = () => {
        const newSettings = items.map<TableSetting>(({id, isSelected}) => ({id, isSelected}));
        propsOnUpdate(newSettings);
        setOpen(false);
    };

    const DefaultApplyButton = () => (
        <Button view="action" width="max" onClick={onApply}>
            {i18n('button_apply')}
        </Button>
    );

    const onDragEnd: OnDragEndResponder = ({destination, source}) => {
        if (destination?.index !== undefined && destination?.index !== source.index) {
            setItems((prevItems) => {
                return reorderArray(prevItems, source.index, destination.index);
            });
        }
    };

    const dndRenderContainer = useDndRenderContainer({
        onDragEnd,
        renderControls: () =>
            renderControls ? renderControls({DefaultApplyButton, onApply}) : <DefaultApplyButton />,
    });

    const dndRenderItem = useDndRenderItem(sortable);

    const renderControl: TreeSelectProps<unknown>['renderControl'] = ({toggleOpen}) => {
        const onKeyDown = createOnKeyDownHandler(toggleOpen);

        return (
            renderSwitcher?.({onClick: toggleOpen, onKeyDown}) || (
                <Button onClick={toggleOpen} extraProps={{onKeyDown}}>
                    <Icon data={Gear} />
                    {i18n('button_switcher')}
                </Button>
            )
        );
    };

    const onOpenChange = (open: boolean) => {
        setOpen(open);

        if (open === false) {
            setItems(propsItems);
        }
    };

    const onUpdate = (selectedItemsIds: string[]) => {
        setItems((prevItems) => {
            return prevItems.map((item) => ({
                ...item,
                isSelected: selectedItemsIds.includes(item.id),
            }));
        });
    };

    const [value, dndItems] = React.useMemo(
        () => [prepareValue(items), prepareDndItems(items)] as const,
        [items],
    );

    return (
        <TreeSelect
            className={b(null, className)}
            mapItemDataToProps={identity}
            multiple
            size="l"
            open={open}
            value={value}
            items={dndItems}
            onUpdate={onUpdate}
            popupWidth={popupWidth}
            onOpenChange={onOpenChange}
            placement={popupPlacement}
            renderContainer={dndRenderContainer}
            renderControl={renderControl}
            renderItem={dndRenderItem}
        />
    );
};
