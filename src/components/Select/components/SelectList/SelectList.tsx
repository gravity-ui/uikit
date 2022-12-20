import React from 'react';
import {List} from '../../../List';
import {SelectProps} from '../../types';
import {FlattenOption, getPopupItemHeight} from '../../utils';
import {selectListBlock, SelectQa} from '../../constants';
import {GroupLabel} from './GroupLabel';
import {OptionWrap} from './OptionWrap';

import './SelectList.scss';

type SelectListProps = {
    onOptionClick: (option: FlattenOption) => void;
    renderOption?: SelectProps['renderOption'];
    getOptionHeight?: SelectProps['getOptionHeight'];
    size: NonNullable<SelectProps['size']>;
    value: NonNullable<SelectProps['value']>;
    flattenOptions: FlattenOption[];
    listHeight: number;
    filterHeight: number;
    multiple?: boolean;
    virtualized?: boolean;
};

export const SelectList = React.forwardRef<List<FlattenOption>, SelectListProps>((props, ref) => {
    const {
        onOptionClick,
        renderOption,
        getOptionHeight,
        size,
        flattenOptions,
        value,
        listHeight,
        filterHeight,
        multiple,
        virtualized,
    } = props;

    const getItemHeight = React.useCallback(
        (option: FlattenOption, index: number) => {
            return getPopupItemHeight({getOptionHeight, size, option, index});
        },
        [getOptionHeight, size],
    );

    const renderItem = React.useCallback(
        (option: FlattenOption) => {
            if ('label' in option) {
                return <GroupLabel label={option.label} />;
            }

            return (
                <OptionWrap
                    option={option}
                    value={value}
                    multiple={multiple}
                    renderOption={renderOption}
                />
            );
        },
        [renderOption, value, multiple],
    );

    return (
        <div
            className={selectListBlock({size, virtualized})}
            style={{maxHeight: `calc(90vh - ${filterHeight}px)`}}
            data-qa={SelectQa.LIST}
        >
            <List
                ref={ref}
                itemClassName={selectListBlock('item')}
                itemHeight={getItemHeight}
                itemsHeight={virtualized ? listHeight : undefined}
                items={flattenOptions}
                filterable={false}
                virtualized={virtualized}
                renderItem={renderItem}
                onItemClick={onOptionClick}
            />
        </div>
    );
});

SelectList.displayName = 'SelectList';
