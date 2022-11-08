import React from 'react';
import {block} from '../../../utils/cn';
import {Popup} from '../../../Popup';
import {List} from '../../../List';
import {SelectProps} from '../../types';
import {
    FlattenOption,
    getPopupItemHeight,
    getPopupHeight,
    getPopupMinWidth,
    getPopupVerticalOffset,
} from '../../utils';
import {BORDER_WIDTH, LIST_CLASSNAME, SelectQa} from '../../constants';
import {GroupLabel} from './GroupLabel';
import {OptionWrap} from './OptionWrap';

import './SelectPopup.scss';

const b = block('select-popup');
const VIRTUALIZE_THRESHOLD = 50;

type SelectPopupProps = {
    handleClose: () => void;
    onOptionClick: (option: FlattenOption) => void;
    renderOption?: SelectProps['renderOption'];
    getOptionHeight?: SelectProps['getOptionHeight'];
    size: NonNullable<SelectProps['size']>;
    value: NonNullable<SelectProps['value']>;
    flattenOptions: FlattenOption[];
    controlRect?: DOMRect;
    popupWidth?: number;
    open?: boolean;
    multiple?: boolean;
    controlRef?: React.RefObject<HTMLElement>;
};

export const SelectPopup = React.forwardRef<List<FlattenOption>, SelectPopupProps>((props, ref) => {
    const {
        onOptionClick,
        handleClose,
        renderOption,
        getOptionHeight,
        size,
        flattenOptions,
        value,
        popupWidth,
        controlRect,
        open,
        multiple,
        controlRef,
    } = props;
    const popupHeight = getPopupHeight({
        options: flattenOptions,
        getOptionHeight,
        size,
    });
    const popupVerticalOffset = getPopupVerticalOffset({popupHeight, controlRect});
    const virtualizeEnabled = flattenOptions.length >= VIRTUALIZE_THRESHOLD;
    const inlineStyles: React.CSSProperties = {
        minWidth: getPopupMinWidth(virtualizeEnabled, controlRect),
        width: popupWidth,
    };

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
        <Popup
            qa={SelectQa.POPUP}
            className={b({size, multiple})}
            style={inlineStyles}
            open={open}
            anchorRef={controlRef}
            offset={[BORDER_WIDTH, popupVerticalOffset]}
            placement={['bottom-start', 'top-start']}
            onClose={handleClose}
        >
            <div className={b('container')}>
                <List
                    ref={ref}
                    className={LIST_CLASSNAME}
                    itemClassName={b('item')}
                    itemHeight={getItemHeight}
                    itemsHeight={virtualizeEnabled ? popupHeight : undefined}
                    items={flattenOptions}
                    filterable={false}
                    virtualized={virtualizeEnabled}
                    renderItem={renderItem}
                    onItemClick={onOptionClick}
                />
            </div>
        </Popup>
    );
});

SelectPopup.displayName = 'SelectPopup';
