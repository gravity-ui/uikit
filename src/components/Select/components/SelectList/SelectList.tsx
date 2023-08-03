import React from 'react';

import {List} from '../../../List';
import {SelectQa, selectListBlock} from '../../constants';
import type {SelectOption, SelectProps} from '../../types';
import type {FlattenOption} from '../../utils';
import {GroupTitleItem, getOptionsHeight, getPopupItemHeight} from '../../utils';

import {GroupLabel} from './GroupLabel';
import {OptionWrap} from './OptionWrap';
import {SelectLoadingIndicator} from './SelectLoadingIndicator';

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
        loading,
    } = props;
    const items = React.useMemo(
        () => (loading ? [...flattenOptions, loadingOption] : flattenOptions),
        [flattenOptions, loading],
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

                return <GroupLabel option={option} renderOptionGroup={wrappedRenderOptionGroup} />;
            }
            if (option.value === loadingOption.value) {
                return <SelectLoadingIndicator />;
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
                    option={option}
                    value={value}
                    multiple={multiple}
                    renderOption={wrappedRenderOption}
                />
            );
        },
        [renderOption, renderOptionGroup, value, multiple, getItemHeight],
    );

    return (
        <List
            ref={ref}
            className={selectListBlock({size, virtualized, mobile})}
            qa={SelectQa.LIST}
            itemClassName={selectListBlock('item')}
            itemHeight={getItemHeight}
            itemsHeight={virtualized ? optionsHeight : undefined}
            items={items}
            filterable={false}
            virtualized={virtualized}
            renderItem={renderItem}
            onItemClick={onOptionClick}
        />
    );
});

SelectList.displayName = 'SelectList';
