import React from 'react';

import {List} from '../../../List';
import {SelectQa, selectListBlock} from '../../constants';
import type {SelectOption, SelectProps} from '../../types';
import type {FlattenOption} from '../../utils';
import {getOptionsHeight, getPopupItemHeight} from '../../utils';

import {GroupLabel} from './GroupLabel';
import {OptionWrap} from './OptionWrap';
import {SelectLoadingIndicator} from './SelectLoadingIndicator';

import './SelectList.scss';

type SelectListProps = {
    mobile: boolean;
    onOptionClick: (option: FlattenOption) => void;
    renderOption?: SelectProps['renderOption'];
    getOptionHeight?: SelectProps['getOptionHeight'];
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
        getOptionHeight,
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
        size,
        mobile,
    });

    const getItemHeight = React.useCallback(
        (option: FlattenOption, index: number) => {
            return getPopupItemHeight({getOptionHeight, size, option, index, mobile});
        },
        [getOptionHeight, mobile, size],
    );

    const renderItem = React.useCallback(
        (option: FlattenOption, _isItemActive: boolean, itemIndex: number) => {
            if ('label' in option) {
                return <GroupLabel label={option.label} />;
            }
            if (option.value === loadingOption.value) {
                return <SelectLoadingIndicator />;
            }

            const wrappedRenderOption = renderOption
                ? (option: SelectOption) => {
                      return renderOption(option, {itemHeight: getItemHeight(option, itemIndex)});
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
        [renderOption, value, multiple, getItemHeight],
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
