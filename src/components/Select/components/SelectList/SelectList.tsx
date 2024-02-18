import React from 'react';

import {List} from '../../../List';
import {SelectQa, selectListBlock} from '../../constants';
import type {SelectOption, SelectOptionGroup, SelectProps} from '../../types';
import {FLATTEN_KEY, getFlattenOption, getOptionsHeight, getPopupItemHeight} from '../../utils';
import type {FlattenOption, GroupTitleItem} from '../../utils';

import {GroupLabel} from './GroupLabel';
import {OptionWrap} from './OptionWrap';
import {SelectLoadingIndicator} from './SelectLoadingIndicator';

import './SelectList.scss';

type SelectListProps = {
    mobile: boolean;
    onOptionClick: (option: SelectOption | SelectOptionGroup) => void;
    renderOption?: SelectProps['renderOption'];
    renderOptionGroup?: SelectProps['renderOptionGroup'];
    renderDivider?: SelectProps['renderDivider'];
    getOptionHeight?: SelectProps['getOptionHeight'];
    getOptionGroupHeight?: SelectProps['getOptionGroupHeight'];
    getDividerHeight?: SelectProps['getDividerHeight'];
    size: NonNullable<SelectProps['size']>;
    value: NonNullable<SelectProps['value']>;
    flattenOptions: FlattenOption[];
    multiple?: boolean;
    virtualized?: boolean;
    loading?: boolean;
    onLoadMore?: () => void;
    selectId: string;
    onChangeActive: (index?: number) => void;
};

const loadingOption = getFlattenOption(
    {value: '__SELECT_LIST_ITEM_LOADING__', disabled: true},
    {group: 0},
);

export const SelectList = React.forwardRef<List<SelectOption | SelectOptionGroup>, SelectListProps>(
    (props, ref) => {
        const {
            onOptionClick,
            renderOption,
            renderOptionGroup,
            // renderDivider,
            getOptionHeight,
            getOptionGroupHeight,
            // getDividerHeight,
            size,
            flattenOptions,
            value,
            multiple,
            virtualized,
            mobile,
            loading,
            onLoadMore,
            selectId,
            onChangeActive,
        } = props;
        const items = React.useMemo(
            () => (loading ? [...flattenOptions, loadingOption] : flattenOptions),
            [flattenOptions, loading],
        );
        const listItems = [];
        for (let i = 0; i < items.length; i++) {
            if (i > 0 && items[i - 1][FLATTEN_KEY].group !== items[i][FLATTEN_KEY].group) {
                listItems.push({value: '__DIVIDER__', disabled: true});
            }
            listItems.push(items[i]);
        }

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
            (option: SelectOption | SelectOptionGroup) => {
                return getPopupItemHeight({
                    getOptionHeight,
                    getOptionGroupHeight,
                    size,
                    option,
                    mobile,
                });
            },
            [getOptionHeight, getOptionGroupHeight, mobile, size],
        );

        const renderItem = React.useCallback(
            (
                option: SelectOption | SelectOptionGroup,
                _isItemActive: boolean,
                itemIndex: number,
            ) => {
                if ('label' in option) {
                    const wrappedRenderOptionGroup = renderOptionGroup
                        ? (optionLocal: GroupTitleItem) => {
                              return renderOptionGroup(optionLocal, {
                                  itemHeight: getItemHeight(optionLocal),
                              });
                          }
                        : undefined;

                    return (
                        <GroupLabel option={option} renderOptionGroup={wrappedRenderOptionGroup} />
                    );
                }
                if (option.value === loadingOption.value) {
                    return (
                        <SelectLoadingIndicator
                            onIntersect={itemIndex === 0 ? undefined : onLoadMore}
                        />
                    );
                }
                if (option.value === '__DIVIDER__') {
                    return (
                        <div
                            style={{
                                width: '100%',
                                height: 1,
                                backgroundColor: 'var(--g-color-line-generic)',
                            }}
                        />
                    );
                }

                const wrappedRenderOption = renderOption
                    ? (optionLocal: SelectOption) => {
                          return renderOption(optionLocal, {
                              itemHeight: getItemHeight(optionLocal),
                          });
                      }
                    : undefined;

                return (
                    <OptionWrap
                        option={option}
                        value={value}
                        multiple={multiple}
                        renderOption={wrappedRenderOption}
                    />
                );
            },
            [renderOption, renderOptionGroup, value, multiple, getItemHeight, onLoadMore],
        );

        return (
            <List
                ref={ref}
                className={selectListBlock({size, virtualized, mobile})}
                qa={SelectQa.LIST}
                itemClassName={selectListBlock('item')}
                itemHeight={getItemHeight}
                itemsHeight={virtualized ? optionsHeight : undefined}
                items={listItems}
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
    },
);

SelectList.displayName = 'SelectList';
