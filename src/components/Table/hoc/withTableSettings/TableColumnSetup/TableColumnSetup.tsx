import React from 'react';

import {Gear, Grip, Lock} from '@gravity-ui/icons';
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
import type {OnDragEndResponder} from 'react-beautiful-dnd';

import {useUniqId} from '../../../../../hooks';
import type {PopperPlacement} from '../../../../../hooks/private';
import {createOnKeyDownHandler} from '../../../../../hooks/useActionHandlers/useActionHandlers';
import {Button} from '../../../../Button';
import {Icon} from '../../../../Icon';
import {TreeSelect} from '../../../../TreeSelect/TreeSelect';
import {TreeSelectItem} from '../../../../TreeSelect/TreeSelectItem';
import type {TreeSelectItemProps} from '../../../../TreeSelect/TreeSelectItem';
import type {
    TreeSelectProps,
    TreeSelectRenderContainer,
    TreeSelectRenderItem,
} from '../../../../TreeSelect/types';
import {ListContainerView} from '../../../../useList';
import {block} from '../../../../utils/cn';
import type {TableColumnSetupItem, TableSetting} from '../withTableSettings';

import i18n from './i18n';

import './TableColumnSetup.scss';

const b = block('table-column-setup');
const tableColumnSetupCn = b(null);
const applyButtonCn = b('apply');
const requiredDndItemCn = b('required-item');

const reorderArray = <T extends unknown>(list: T[], startIndex: number, endIndex: number): T[] => {
    const result = [...list];
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

const prepareDndItems = (tableColumnItems: TableColumnSetupItem[]) => {
    return tableColumnItems.map<Item>((tableColumnItem) => {
        const hasSelectionIcon = tableColumnItem.isRequired === false;

        return {
            ...tableColumnItem,
            startSlot: tableColumnItem.isRequired ? <Icon data={Lock} /> : undefined,
            hasSelectionIcon,
            // to overwrite select background effect - https://github.com/gravity-ui/uikit/blob/main/src/components/useList/components/ListItemView/ListItemView.tsx#L125
            className: hasSelectionIcon ? undefined : requiredDndItemCn,
        };
    });
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

interface SwitcherProps {
    onKeyDown: React.KeyboardEventHandler<HTMLElement>;
    onClick: React.MouseEventHandler<HTMLElement>;
}

const useDndRenderContainer = ({
    onApply,
    onDragEnd,
}: {
    onDragEnd: OnDragEndResponder;
    onApply: () => void;
}) => {
    const uniqId = useUniqId();

    const dndRenderContainer: TreeSelectRenderContainer<Item> = ({
        renderItem,
        visibleFlattenIds,
        items: _items,
        containerRef,
        id,
    }) => {
        const visibleFlattenItemList = visibleFlattenIds.map((visibleFlattenId, idx) =>
            renderItem(visibleFlattenId, idx),
        );

        return (
            <React.Fragment>
                <ListContainerView ref={containerRef} id={id}>
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId={uniqId}>
                            {(droppableProvided) => {
                                return (
                                    <div
                                        {...droppableProvided.droppableProps}
                                        ref={droppableProvided.innerRef}
                                    >
                                        {visibleFlattenItemList}
                                        {droppableProvided.placeholder}
                                    </div>
                                );
                            }}
                        </Droppable>
                    </DragDropContext>
                </ListContainerView>
                <Button view="action" className={applyButtonCn} onClick={onApply}>
                    {i18n('button_apply')}
                </Button>
            </React.Fragment>
        );
    };

    return dndRenderContainer;
};

const useDndRenderItem = (sortable: boolean | undefined) => {
    const renderDndItem: TreeSelectRenderItem<Item> = ({data, props, index}) => {
        const isDragDisabled = sortable === false;

        const endSlot =
            data.endSlot ?? (isDragDisabled ? undefined : <Icon data={Grip} size={16} />);

        const commonProps = {
            ...props,
            ...data,
            endSlot,
        };

        return (
            <Draggable
                draggableId={data.id}
                index={index}
                key={`item-key-${data.id}`}
                isDragDisabled={isDragDisabled}
            >
                {(provided, snapshot) => {
                    const style: React.CSSProperties = {
                        ...provided.draggableProps.style,
                    };

                    // not expected offset appears, one way to fix - remove this offsets explicitly
                    if (snapshot.isDragging) {
                        style.left = undefined;
                        style.top = undefined;
                    }

                    return (
                        <TreeSelectItem
                            ref={provided.innerRef}
                            {...commonProps}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={style}
                            active={snapshot.isDragging}
                        />
                    );
                }}
            </Draggable>
        );
    };

    return renderDndItem;
};

type Item = TableColumnSetupItem &
    TreeSelectItemProps & {
        id: string;
        isDragDisabled?: boolean;
    };

export interface TableColumnSetupProps {
    renderSwitcher?: (props: SwitcherProps) => React.JSX.Element;

    items: TableColumnSetupItem[];
    sortable?: boolean;

    onUpdate: (newSettings: TableSetting[]) => void;
    popupWidth?: TreeSelectProps<any>['popupWidth'];
    popupPlacement?: PopperPlacement;
}

export const TableColumnSetup = (props: TableColumnSetupProps) => {
    const {
        renderSwitcher,
        popupWidth,
        popupPlacement,
        items: propsItems,
        onUpdate: propsOnUpdate,
        sortable,
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

    const onDragEnd: OnDragEndResponder = ({destination, source}) => {
        if (destination?.index !== undefined && destination?.index !== source.index) {
            setItems((prevItems) => {
                return reorderArray(prevItems, source.index, destination.index);
            });
        }
    };

    const dndRenderContainer = useDndRenderContainer({onApply, onDragEnd});

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
            className={tableColumnSetupCn}
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
