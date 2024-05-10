import React from 'react';

import {useForkRef, useUniqId} from '../../hooks';
import {useOpenState} from '../../hooks/useSelect/useOpenState';
import {SelectControl} from '../Select/components';
import {SelectPopup} from '../Select/components/SelectPopup/SelectPopup';
import {TreeList} from '../TreeList';
import type {TreeListOnItemClick, TreeListRenderItem} from '../TreeList/types';
import {Flex} from '../layout';
import {useMobile} from '../mobile';
import {
    ListItemView,
    getListParsedState,
    scrollToListItem,
    useList,
    useListState,
} from '../useList';
import type {ListItemId} from '../useList';
import {block} from '../utils/cn';
import type {CnMods} from '../utils/cn';

import type {
    TreeSelectDefaultOnClickCb,
    TreeSelectProps,
    TreeSelectRenderControlProps,
} from './types';

import './TreeSelect.scss';

const b = block('tree-select');

const defaultItemRenderer: TreeListRenderItem<unknown> = (renderState) => {
    return <ListItemView {...renderState.props} {...renderState.renderContainerProps} />;
};

export const TreeSelect = React.forwardRef(function TreeSelect<T>(
    {
        id,
        qa,
        title,
        placement,
        slotBeforeListBody,
        slotAfterListBody,
        size = 'm',
        items,
        defaultOpen,
        width,
        containerRef: propsContainerRef,
        className,
        containerClassName,
        popupClassName,
        open: propsOpen,
        multiple,
        popupWidth,
        selectedById,
        expandedById,
        disabledById,
        activeItemId,
        popupDisablePortal,
        groupsBehavior = 'expandable',
        defaultGroupsExpanded,
        onClose,
        getItemId,
        onOpenChange,
        renderControl,
        renderItem = defaultItemRenderer as TreeListRenderItem<T>,
        renderContainer,
        onItemClick,
        setSelected: propsSetSelected,
        setExpanded: propsSetExpanded,
        setActiveItemId: propsSetActiveItemId,
        mapItemDataToProps,
    }: TreeSelectProps<T>,
    ref: React.Ref<HTMLButtonElement>,
) {
    const mobile = useMobile();
    const uniqId = useUniqId();
    const treeSelectId = id ?? uniqId;

    const controlWrapRef = React.useRef<HTMLDivElement>(null);
    const controlRef = React.useRef<HTMLElement>(null);
    const containerRefLocal = React.useRef<HTMLDivElement>(null);
    const containerRef = propsContainerRef ?? containerRefLocal;

    const handleControlRef = useForkRef(ref, controlRef);

    const initialValues = React.useMemo(() => getListParsedState(items).initialState, [items]);

    const listState = useListState({
        controlledValues: {
            expandedById,
            disabledById,
            activeItemId,
            selectedById,
        },
        initialValues,
    });

    const setSelected = propsSetSelected ?? listState.setSelected;
    const setExpanded = propsSetExpanded ?? listState.setExpanded;
    const setActiveItemId = propsSetActiveItemId ?? listState.setActiveItemId;

    const listParsedState = useList({
        items,
        getItemId,
        expandedById: listState.expandedById,
    });

    const {toggleOpen, open} = useOpenState({
        defaultOpen,
        onClose,
        onOpenChange,
        open: propsOpen,
    });

    const handleItemClick = React.useCallback<TreeListOnItemClick<T>>(
        (onClickProps) => {
            const defaultHandleClick: TreeSelectDefaultOnClickCb = ({
                defaultSelectionLogic,
            } = {}) => {
                if (listState.disabledById[onClickProps.id]) return;

                const {groupState} = onClickProps.context;

                // always activate selected item
                setActiveItemId(onClickProps.id);

                if (groupState && groupsBehavior === 'expandable') {
                    setExpanded((prvState) => ({
                        ...prvState,
                        [onClickProps.id]: !onClickProps.expanded,
                    }));
                } else if (defaultSelectionLogic === false) {
                    // do nothing - client know what to do
                } else {
                    setSelected((prevSelectedState) => ({
                        ...(multiple ? prevSelectedState : {}),
                        [onClickProps.id]: !prevSelectedState[onClickProps.id],
                    }));
                }

                if (!multiple) {
                    toggleOpen(false);
                }
            };

            if (onItemClick) {
                return onItemClick(onClickProps, defaultHandleClick);
            }

            return defaultHandleClick();
        },
        [
            onItemClick,
            listState.disabledById,
            setActiveItemId,
            groupsBehavior,
            multiple,
            setExpanded,
            setSelected,
            toggleOpen,
        ],
    );

    const value = React.useMemo(
        () =>
            Object.entries(listState.selectedById).reduce<ListItemId[]>(
                (acc, [listItemId, listItemValue]) => {
                    if (listItemValue) {
                        acc.push(listItemId);
                    }

                    return acc;
                },
                [],
            ),
        [listState.selectedById],
    );

    // restoring focus when popup opens
    React.useLayoutEffect(() => {
        if (open) {
            const firstSelectedItemId = value[0];
            containerRef.current?.focus();

            setActiveItemId(firstSelectedItemId);

            if (firstSelectedItemId) {
                scrollToListItem(firstSelectedItemId, containerRef.current);
            }
        }
        // subscribe only in open event
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);

    const handleClose = React.useCallback(() => toggleOpen(false), [toggleOpen]);

    const controlProps: TreeSelectRenderControlProps = {
        open,
        toggleOpen,
        clearValue: () => setSelected({}),
        ref: handleControlRef,
        size,
        value,
        id: treeSelectId,
        activeItemId: listState.activeItemId,
        title,
    };

    const togglerNode = renderControl ? (
        renderControl(controlProps)
    ) : (
        <SelectControl
            {...controlProps}
            selectedOptionsContent={React.Children.toArray(
                value.map((itemId) => mapItemDataToProps(listParsedState.itemsById[itemId]).title),
            ).join(', ')}
            view="normal"
            pin="round-round"
            popupId={`tree-select-popup-${treeSelectId}`}
            selectId={`tree-select-${treeSelectId}`}
        />
    );

    const mods: CnMods = {
        ...(width === 'max' && {width}),
    };

    const inlineStyles: React.CSSProperties = {};

    if (typeof width === 'number') {
        inlineStyles.width = width;
    }

    return (
        <Flex
            direction="column"
            gap="5"
            ref={controlWrapRef}
            className={b(mods, className)}
            style={inlineStyles}
        >
            {togglerNode}
            <SelectPopup
                ref={controlWrapRef}
                className={b('popup', {size}, popupClassName)}
                controlRef={controlRef}
                width={popupWidth}
                placement={placement}
                open={open}
                handleClose={handleClose}
                disablePortal={popupDisablePortal}
                mobile={mobile}
                id={`tree-select-popup-${treeSelectId}`}
            >
                {slotBeforeListBody}

                <TreeList<T>
                    size={size}
                    className={b('list', containerClassName)}
                    qa={qa}
                    multiple={multiple}
                    id={`list-${treeSelectId}`}
                    containerRef={containerRef}
                    getItemId={getItemId}
                    disabledById={listState.disabledById}
                    selectedById={listState.selectedById}
                    expandedById={listState.expandedById}
                    activeItemId={listState.activeItemId}
                    setActiveItemId={setActiveItemId}
                    onItemClick={handleItemClick}
                    items={items}
                    defaultGroupsExpanded={defaultGroupsExpanded}
                    renderContainer={renderContainer}
                    mapItemDataToProps={mapItemDataToProps}
                    renderItem={renderItem ?? defaultItemRenderer}
                />

                {slotAfterListBody}
            </SelectPopup>
        </Flex>
    );
}) as <T, P extends {} = {}>(
    props: TreeSelectProps<T, P> & {ref?: React.Ref<HTMLDivElement>},
) => React.ReactElement;
