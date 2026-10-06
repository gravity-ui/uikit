'use client';

import * as React from 'react';

import {List} from '../../../List';
import type {ListFocusOwner, ListItemContext, ListItemHelpers} from '../../../List';
import {ListVirtualizationContext} from '../../../List/VirtualizationContext';
import type {ListVirtualizationContextValue} from '../../../List/VirtualizationContext';
import {warnOnce} from '../../../utils/warn';
import {SelectQa, selectListBlock} from '../../constants';
import {
    buildSelectListNodes,
    getItemViewSize,
    getPopupItemHeight,
    getSelectListNodeId,
    getSelectListNodeText,
    isSelectGroupNode,
    isSelectLoadingNode,
} from '../../utils';
import type {
    AnySelectOption,
    AnySelectProps,
    FlattenOption,
    GroupTitleItem,
    SelectGroupNode,
    SelectListNode,
    SelectValueKeyGetter,
} from '../../utils';

import {OptionWrap} from './OptionWrap';
import {SelectLoadingIndicator} from './SelectLoadingIndicator';

import './SelectList.scss';

type SelectListProps = {
    mobile: boolean;
    /** The keys of the selected values: the ids of their rows */
    selectedKeys: string[];
    onSelectedUpdate: (keys: string[]) => void;
    /** An option was applied: the selection has already changed by then */
    onOptionAction: () => void;
    getKey: SelectValueKeyGetter;
    renderOption?: AnySelectProps['renderOption'];
    renderOptionGroup?: AnySelectProps['renderOptionGroup'];
    selectionStyle?: AnySelectProps['selectionStyle'];
    getOptionText?: AnySelectProps['getOptionText'];
    getOptionHeight?: AnySelectProps['getOptionHeight'];
    getOptionGroupHeight?: AnySelectProps['getOptionGroupHeight'];
    size: NonNullable<AnySelectProps['size']>;
    flattenOptions: FlattenOption[];
    /** The group an option came from — the flat list of options no longer says it by itself */
    groupOfOption?: Map<AnySelectOption, GroupTitleItem>;
    /** The groups that came with options: only such a group can be left empty by the filter */
    groupsWithOptions?: Set<GroupTitleItem>;
    multiple?: boolean;
    virtualized?: boolean;
    loading?: boolean;
    onLoadMore?: () => void;
    id: string;
    /** The trigger names the list: its text is the value or the placeholder of the Select */
    labelledBy: string;
    focusOwner?: ListFocusOwner;
    activeItemId?: string;
    onActiveItemUpdate: (id: string | null) => void;
};

const getItemChildren = (node: SelectListNode) =>
    isSelectGroupNode(node) ? node.options : undefined;

const getItemDisabled = (node: SelectListNode) => Boolean(node.disabled);

export const SelectList = React.forwardRef<HTMLDivElement, SelectListProps>(
    function SelectList(props, ref) {
        const {
            onSelectedUpdate,
            onOptionAction,
            renderOption,
            renderOptionGroup,
            selectionStyle,
            getOptionText,
            getOptionHeight,
            getOptionGroupHeight,
            size,
            flattenOptions,
            groupOfOption,
            groupsWithOptions,
            selectedKeys,
            getKey,
            multiple,
            virtualized,
            mobile,
            loading,
            onLoadMore,
            id,
            labelledBy,
            focusOwner,
            activeItemId,
            onActiveItemUpdate,
        } = props;

        const getItemTextValue = React.useCallback(
            (node: SelectListNode) => getSelectListNodeText(node, getOptionText),
            [getOptionText],
        );

        const getItemId = React.useCallback(
            (node: SelectListNode) => getSelectListNodeId(node, getKey),
            [getKey],
        );

        const nodes = React.useMemo(
            () =>
                buildSelectListNodes(
                    flattenOptions,
                    getKey,
                    loading,
                    groupOfOption,
                    groupsWithOptions,
                ),
            [flattenOptions, getKey, loading, groupOfOption, groupsWithOptions],
        );

        const getItemHeight = React.useCallback(
            (option: FlattenOption, index: number) => {
                return getPopupItemHeight({
                    getOptionHeight,
                    getOptionGroupHeight,
                    size,
                    option,
                    index,
                    mobile,
                });
            },
            [getOptionHeight, getOptionGroupHeight, mobile, size],
        );

        /**
         * The height a row comes out as is also its estimate under virtualization: the estimate of
         * the outer `ListVirtualizer` is re-wrapped here, since the type of an option row never
         * leaves the Select and the consumer has nothing to write it against
         */
        const outerVirtualization = React.useContext(ListVirtualizationContext);
        const virtualization = React.useMemo<ListVirtualizationContextValue | null>(() => {
            if (!outerVirtualization) {
                return null;
            }

            if (outerVirtualization.estimateItemSize !== undefined) {
                warnOnce(
                    '[Select] `estimateItemSize` of `ListVirtualizer` is not used by the Select: the height of a row comes from `getOptionHeight`/`getOptionGroupHeight` and the size of the Select.',
                );
            }

            return {
                ...outerVirtualization,
                estimateItemSize: (ctx: ListItemContext<SelectListNode>) =>
                    getItemHeight(ctx.item, ctx.index),
            };
        }, [outerVirtualization, getItemHeight]);

        const handleItemAction = React.useCallback(
            (_id: string, node: SelectListNode) => {
                if (isSelectGroupNode(node) || isSelectLoadingNode(node)) {
                    return;
                }

                onOptionAction();
            },
            [onOptionAction],
        );

        const renderItem = React.useCallback(
            (
                ctx: ListItemContext<SelectListNode>,
                {getItemProps, getItemViewProps}: ListItemHelpers,
            ) => {
                const isItemActive = ctx.state.active;
                const itemHeight = getItemHeight(ctx.item, ctx.index);
                const isSection = ctx.kind === 'section';
                // The row view sizes itself: an inline height is only what the consumer asked for
                const hasCustomHeight = Boolean(isSection ? getOptionGroupHeight : getOptionHeight);
                // minHeight too: the view has a minimum of its own for every size, and the number
                // the consumer returned has to be the height of the row exactly
                const style = hasCustomHeight
                    ? {height: itemHeight, minHeight: itemHeight}
                    : undefined;

                if (isSection) {
                    const group = ctx.item as SelectGroupNode;

                    if (renderOptionGroup) {
                        const wrappedRenderOptionGroup = (optionLocal: GroupTitleItem) => {
                            return renderOptionGroup(optionLocal, {isItemActive, itemHeight});
                        };

                        return (
                            <div
                                {...getItemProps({
                                    className: selectListBlock('item', {group: true}),
                                    style,
                                })}
                            >
                                {wrappedRenderOptionGroup(group)}
                            </div>
                        );
                    }

                    // A group with an empty label separates the options with a line instead
                    if (group.label === '') {
                        return (
                            <div
                                {...getItemProps({
                                    className: selectListBlock('item', {separator: true}),
                                    style,
                                })}
                            />
                        );
                    }

                    return (
                        <List.SectionHeader
                            {...getItemProps({
                                className: selectListBlock('item', {group: true}),
                                style,
                            })}
                            {...getItemViewProps()}
                        >
                            {group.label}
                        </List.SectionHeader>
                    );
                }

                const option = ctx.item as AnySelectOption;

                if (isSelectLoadingNode(option)) {
                    return (
                        <div
                            {...getItemProps({
                                className: selectListBlock('item', {loading: true}),
                                style,
                            })}
                        >
                            <SelectLoadingIndicator
                                onIntersect={ctx.index === 0 ? undefined : onLoadMore}
                            />
                        </div>
                    );
                }

                const wrappedRenderOption = renderOption
                    ? (optionLocal: AnySelectOption) => {
                          return renderOption(optionLocal, {
                              isItemActive,
                              itemHeight,
                              selected: Boolean(ctx.state.selected),
                          });
                      }
                    : undefined;

                return (
                    <List.ItemView
                        {...getItemProps({
                            className: selectListBlock('item'),
                            style,
                            'data-qa': isItemActive ? SelectQa.ACTIVE_ITEM : undefined,
                        })}
                        {...getItemViewProps()}
                        {...(selectionStyle === 'none' && {selectionStyle})}
                    >
                        <OptionWrap option={option} renderOption={wrappedRenderOption} />
                    </List.ItemView>
                );
            },
            [
                getItemHeight,
                getOptionGroupHeight,
                getOptionHeight,
                onLoadMore,
                renderOption,
                renderOptionGroup,
                selectionStyle,
            ],
        );

        const list = (
            <List<SelectListNode>
                ref={ref}
                id={id}
                qa={SelectQa.LIST}
                className={selectListBlock({size, virtualized, mobile, multiple})}
                aria-labelledby={labelledBy}
                size={getItemViewSize(size, mobile)}
                items={nodes}
                getItemId={getItemId}
                getItemChildren={getItemChildren}
                getItemDisabled={getItemDisabled}
                getItemTextValue={getItemTextValue}
                focusOwner={focusOwner}
                selectionMode={multiple ? 'multiple' : 'single'}
                selectedIds={selectedKeys}
                onSelectedUpdate={onSelectedUpdate}
                activeItemId={activeItemId ?? null}
                onActiveItemUpdate={onActiveItemUpdate}
                onItemAction={handleItemAction}
                renderItem={renderItem}
            />
        );

        if (!virtualization) {
            return list;
        }

        return (
            <ListVirtualizationContext.Provider value={virtualization}>
                {list}
            </ListVirtualizationContext.Provider>
        );
    },
);
