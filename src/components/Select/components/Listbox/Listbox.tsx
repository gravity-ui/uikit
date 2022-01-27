import React from 'react';
import {block} from '../../../utils/cn';
import {Popup} from '../../../Popup';
import {List} from '../../../List';
import {Dispatch} from '../../store';
import {SelectProps, SelectOption, SelectOptgroup} from '../../types';
import {
    BORDER_WIDTH,
    FlattenOption,
    getFlattenOptions,
    getListboxItemHeight,
    getListboxHeight,
    getPopupVerticalOffset,
} from '../../utils';
import {GroupLabel} from './GroupLabel';
import {OptionWrap} from './OptionWrap';

import './Listbox.scss';

const b = block('select-listbox');
const VIRTUALIZE_THRESHOLD = 50;

type ListboxProps = {
    dispatch: Dispatch;
    renderOption?: SelectProps['renderOption'];
    getOptionHeight?: SelectProps['getOptionHeight'];
    size: NonNullable<SelectProps['size']>;
    value: NonNullable<SelectProps['value']>;
    options: (SelectOption | SelectOptgroup)[];
    controlRect?: DOMRect;
    popupWidth?: number;
    active?: boolean;
    multiple?: boolean;
    controlRef?: React.RefObject<HTMLButtonElement>;
};

export const Listbox = React.forwardRef<List<FlattenOption>, ListboxProps>((props, ref) => {
    const {
        dispatch,
        renderOption,
        getOptionHeight,
        size,
        options,
        value,
        popupWidth,
        controlRect,
        active,
        multiple,
        controlRef,
    } = props;
    const flattenOptions = getFlattenOptions(options);
    const listboxHeight = getListboxHeight({options: flattenOptions, getOptionHeight, size});
    const popupVerticalOffset = getPopupVerticalOffset({listboxHeight, controlRect});
    const virtualizeEnabled = flattenOptions.length >= VIRTUALIZE_THRESHOLD;
    const inlinePopupStyles: React.CSSProperties = {
        minWidth: controlRect?.width ? controlRect?.width - BORDER_WIDTH * 2 : undefined,
        width: popupWidth,
    };

    const handleClose = () => {
        dispatch({type: 'SET_ACTIVE', payload: {active: false}});
    };

    const getItemHeight = React.useCallback(
        (option: FlattenOption, index: number) => {
            return getListboxItemHeight({getOptionHeight, size, option, index});
        },
        [getOptionHeight, size],
    );

    const renderItem = React.useCallback(
        (option: FlattenOption) => {
            if ('groupTitle' in option) {
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
        <Popup
            className={b({size, multiple})}
            style={inlinePopupStyles}
            open={active}
            anchorRef={controlRef}
            offset={[BORDER_WIDTH, popupVerticalOffset]}
            placement={['bottom-start', 'top-start']}
            onClose={handleClose}
        >
            <div className={b('container')}>
                <List
                    ref={ref}
                    itemClassName={b('item')}
                    itemHeight={getItemHeight}
                    itemsHeight={virtualizeEnabled ? listboxHeight : undefined}
                    items={flattenOptions}
                    filterable={false}
                    virtualized={virtualizeEnabled}
                    renderItem={renderItem}
                />
            </div>
        </Popup>
    );
});

Listbox.displayName = 'Listbox';
