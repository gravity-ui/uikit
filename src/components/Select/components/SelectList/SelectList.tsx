import React from 'react';
import {List} from '../../../List';
import {SelectProps} from '../../types';
import {FlattenOption, getOptionsHeight, getPopupItemHeight} from '../../utils';
import {selectListBlock, SelectQa} from '../../constants';
import {GroupLabel} from './GroupLabel';
import {OptionWrap} from './OptionWrap';

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
};

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
    } = props;
    const optionsHeight = getOptionsHeight({
        options: flattenOptions,
        getOptionHeight,
        size,
        mobile,
    });

    const getItemHeight = React.useCallback(
        (option: FlattenOption, index: number) => {
            return getPopupItemHeight({getOptionHeight, size, option, index, mobile});
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
        <List
            ref={ref}
            className={selectListBlock({size, virtualized, mobile})}
            qa={SelectQa.LIST}
            itemClassName={selectListBlock('item')}
            itemHeight={getItemHeight}
            itemsHeight={virtualized ? optionsHeight : undefined}
            items={flattenOptions}
            filterable={false}
            virtualized={virtualized}
            renderItem={renderItem}
            onItemClick={onOptionClick}
        />
    );
});

SelectList.displayName = 'SelectList';
