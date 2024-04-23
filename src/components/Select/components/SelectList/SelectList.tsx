import React from 'react';

import {List} from '../../../List';
import {SelectQa, selectListBlock} from '../../constants';
import type {SelectOption, SelectProps} from '../../types';
import {getOptionsHeight, getPopupItemHeight} from '../../utils';
import type {FlattenOption, GroupTitleItem} from '../../utils';

import {GroupLabel} from './GroupLabel';
import {OptionWrap} from './OptionWrap';
import {SelectLoadingIndicator} from './SelectLoadingIndicator';
import {SelectLoadingIndicatorNew} from './SelectLoadingIndicatorNew';

import './SelectList.scss';

type SelectListProps = {
    mobile: boolean;
    onOptionClick: (option: FlattenOption) => void;
    renderOption?: SelectProps['renderOption'];
    renderOptionGroup?: SelectProps['renderOptionGroup'];
    getOptionHeight?: SelectProps['getOptionHeight'];
    getOptionGroupHeight?: SelectProps['getOptionGroupHeight'];
    size: NonNullable<SelectProps['size']>;
    value: NonNullable<SelectProps['value']>;
    flattenOptions: FlattenOption[];
    multiple?: boolean;
    virtualized?: boolean;
    loading?: boolean;
    onLoadMore?: () => void;
    // TODO: надпись про soft миграцию
    newListView?: boolean;
    selectId: string;
    onChangeActive: (index?: number) => void;
};

const loadingOption = {value: '__SELECT_LIST_ITEM_LOADING__', disabled: true};

export const SelectList = React.forwardRef<List<FlattenOption>, SelectListProps>((props, ref) => {
    const {
        onOptionClick,
        renderOption,
        renderOptionGroup,
        getOptionHeight,
        getOptionGroupHeight,
        size,
        flattenOptions,
        value,
        multiple,
        virtualized,
        mobile,
        newListView,
        loading,
        onLoadMore,
        selectId,
        onChangeActive,
    } = props;
    const items = React.useMemo(
        () => (loading ? [...flattenOptions, loadingOption] : flattenOptions),
        [flattenOptions, loading],
    );

    const selectedIndexes = React.useMemo(
        () =>
            flattenOptions.reduce<number[]>((acc, option, index) => {
                if ('value' in option && value.includes(option.value)) {
                    acc.push(index);
                }
                return acc;
            }, []),
        [flattenOptions, value],
    );

    const optionsHeight = getOptionsHeight({
        options: items,
        getOptionHeight,
        getOptionGroupHeight,
        size,
        mobile,
    });

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

    const renderItem = React.useCallback(
        (option: FlattenOption, _isItemActive: boolean, itemIndex: number) => {
            if ('label' in option) {
                const wrappedRenderOptionGroup = renderOptionGroup
                    ? (optionLocal: GroupTitleItem) => {
                          return renderOptionGroup(optionLocal, {
                              itemHeight: getItemHeight(optionLocal, itemIndex),
                          });
                      }
                    : undefined;

                return (
                    <GroupLabel
                        option={option}
                        renderOptionGroup={wrappedRenderOptionGroup}
                        newListNew={newListView}
                    />
                );
            }
            if (option.value === loadingOption.value) {
                if (newListView) {
                    return (
                        <SelectLoadingIndicatorNew
                            size={size}
                            onIntersect={itemIndex === 0 ? undefined : onLoadMore}
                        />
                    );
                }

                return (
                    <SelectLoadingIndicator
                        onIntersect={itemIndex === 0 ? undefined : onLoadMore}
                    />
                );
            }

            const wrappedRenderOption = renderOption
                ? (optionLocal: SelectOption) => {
                      return renderOption(optionLocal, {
                          itemHeight: getItemHeight(optionLocal, itemIndex),
                      });
                  }
                : undefined;

            return (
                <OptionWrap
                    newListView={newListView}
                    option={option}
                    value={value}
                    multiple={multiple}
                    renderOption={wrappedRenderOption}
                />
            );
        },
        [
            renderOption,
            value,
            multiple,
            renderOptionGroup,
            getItemHeight,
            newListView,
            onLoadMore,
            size,
        ],
    );

    return (
        <List
            ref={ref}
            size={size}
            newListView={newListView}
            multiple={multiple}
            className={selectListBlock({size, virtualized, mobile, newListView})}
            qa={SelectQa.LIST}
            itemClassName={selectListBlock('item')}
            itemsClassName={newListView ? selectListBlock('items') : undefined}
            itemHeight={getItemHeight}
            itemsHeight={virtualized ? optionsHeight : undefined}
            items={items}
            filterable={false}
            virtualized={virtualized}
            renderItem={renderItem}
            onItemClick={onOptionClick}
            selectedItemIndex={selectedIndexes}
            id={`${selectId}-list`}
            role="listbox"
            onChangeActive={onChangeActive}
        />
    );
});

SelectList.displayName = 'SelectList';
