import React from 'react';
import {PopupPlacement} from '../../Popup';
import {List, ListItemData} from '../../List';
import {KeyCode} from '../../constants';
import {SelectProps, SelectOption, SelectOptionGroup} from './types';
import {Option, OptionGroup} from './tech-components';
import {
    BORDER_WIDTH,
    CONTAINER_VERTICAL_MARGIN,
    GROUP_ITEM_MARGIN_TOP,
    SIZE_TO_ITEM_HEIGHT,
    POPUP_MIN_WIDTH_IN_VIRTUALIZE_CASE,
} from './constants';

// "disable" property needs to deactivate group title item in List
type GroupTitleItem = {label: string; disabled: true};

export type FlattenOption = SelectOption | GroupTitleItem;

export const getFlattenOptions = (
    options: (SelectOption | SelectOptionGroup)[],
): FlattenOption[] => {
    return options.reduce((acc, option) => {
        if ('label' in option) {
            acc.push({label: option.label, disabled: true});
            acc.push(...(option.options || []));
        } else {
            acc.push(option);
        }

        return acc;
    }, [] as FlattenOption[]);
};

export const getPopupItemHeight = (args: {
    getOptionHeight?: SelectProps['getOptionHeight'];
    size: NonNullable<SelectProps['size']>;
    option: FlattenOption;
    index: number;
}) => {
    const {getOptionHeight, size, option, index} = args;

    if ('label' in option) {
        const marginTop = index === 0 ? 0 : GROUP_ITEM_MARGIN_TOP;
        return SIZE_TO_ITEM_HEIGHT[size] + marginTop;
    }

    return getOptionHeight ? getOptionHeight(option) : SIZE_TO_ITEM_HEIGHT[size];
};

export const getPopupHeight = (args: {
    getOptionHeight?: SelectProps['getOptionHeight'];
    size: NonNullable<SelectProps['size']>;
    options: FlattenOption[];
}) => {
    const {getOptionHeight, size, options} = args;
    return options.reduce((height, option, index) => {
        return height + getPopupItemHeight({getOptionHeight, size, option, index});
    }, 0);
};

export const getPopupVerticalOffset = (args: {popupHeight: number; controlRect?: DOMRect}) => {
    const {popupHeight, controlRect} = args;

    if (!controlRect) {
        return BORDER_WIDTH;
    }

    const vh = window.innerHeight / 100;
    const heigth5vh = vh * 5;
    const heigth90vh = vh * 90;
    const containerHeight = heigth90vh < popupHeight ? heigth90vh : popupHeight;
    const popupPlacement: PopupPlacement =
        controlRect.y + controlRect.height / 2 < window.innerHeight / 2
            ? 'bottom-start'
            : 'top-start';
    const screenOffset =
        popupPlacement === 'bottom-start'
            ? window.innerHeight - controlRect.y - controlRect.height
            : controlRect.y;

    let offset = BORDER_WIDTH;

    if (containerHeight > screenOffset) {
        offset = (containerHeight - screenOffset) * -1 - heigth5vh - CONTAINER_VERTICAL_MARGIN;
    }

    return offset;
};

const getOptionText = (option: SelectOption): string => {
    if (typeof option.content === 'string') {
        return option.content;
    }

    if (typeof option.children === 'string') {
        return option.children;
    }

    if (option.text) {
        return option.text;
    }

    return option.value;
};

export const getOptionsText = (flattenOptions: FlattenOption[], value: string[]): string[] => {
    return flattenOptions.reduce((acc, option) => {
        if ('label' in option) {
            return acc;
        }

        const optionSelected = value.includes(option.value);

        if (optionSelected) {
            acc.push(getOptionText(option));
        }

        return acc;
    }, [] as string[]);
};

const getTypedChildrenArray = (children: SelectProps['children']) => {
    return React.Children.toArray(children) as (
        | React.ReactElement<SelectOption, typeof Option>
        | React.ReactElement<SelectOptionGroup, typeof OptionGroup>
    )[];
};

const getOptionsFromOptgroupChildren = (children: SelectOptionGroup['children']) => {
    return (
        React.Children.toArray(children) as React.ReactElement<SelectOption, typeof Option>[]
    ).reduce((acc, {props}) => {
        if ('value' in props) {
            acc.push(props);
        }

        return acc;
    }, [] as SelectOption[]);
};

export const getOptionsFromChildren = (children: SelectProps['children']) => {
    return getTypedChildrenArray(children).reduce((acc, {props}) => {
        if ('label' in props) {
            const options = props.options || getOptionsFromOptgroupChildren(props.children);
            acc.push({
                options,
                label: props.label,
            });
        }

        if ('value' in props) {
            acc.push({...props});
        }

        return acc;
    }, [] as (SelectOption | SelectOptionGroup)[]);
};

export const getPopupMinWidth = (virtualizeEnabled: boolean, controlRect?: DOMRect) => {
    const controlWidth = controlRect?.width;

    if (virtualizeEnabled && controlWidth) {
        return controlWidth > POPUP_MIN_WIDTH_IN_VIRTUALIZE_CASE
            ? controlWidth
            : POPUP_MIN_WIDTH_IN_VIRTUALIZE_CASE;
    }

    return controlWidth ? controlWidth - BORDER_WIDTH * 2 : undefined;
};

export const getNextQuickSearch = (keyCode: string, quickSearch: string) => {
    // https://www.w3.org/TR/uievents-code/#key-alphanumeric-writing-system
    const writingSystemKeyPressed = keyCode.length === 1;
    const backspacePressed = keyCode === KeyCode.BACKSPACE;
    let nextQuickSearch = '';

    if (backspacePressed && quickSearch.length) {
        nextQuickSearch = quickSearch.slice(0, quickSearch.length - 1);
    } else if (writingSystemKeyPressed) {
        nextQuickSearch = (quickSearch + keyCode).trim();
    }

    return nextQuickSearch;
};

export const findItemIndexByQuickSearch = (
    quickSearch: string,
    items?: ListItemData<FlattenOption>[],
) => {
    if (!items) {
        return -1;
    }

    return items.findIndex((item) => {
        if ('label' in item) {
            return false;
        }

        if (item.disabled) {
            return false;
        }

        const optionText = getOptionText(item);

        return new RegExp(quickSearch, 'i').test(optionText);
    });
};

export const getListItems = (listRef: React.RefObject<List<FlattenOption>>) => {
    return listRef?.current?.getItems() || [];
};

export const getActiveItem = (listRef: React.RefObject<List<FlattenOption>>) => {
    const items = getListItems(listRef);
    const activeItemIndex = listRef?.current?.getActiveItem();

    return typeof activeItemIndex === 'number' ? items[activeItemIndex] : undefined;
};

export const activateFirstClickableItem = (listRef: React.RefObject<List<FlattenOption>>) => {
    const items = getListItems(listRef);
    const isGroupTitleFirstItem = items[0] && 'label' in items[0];
    listRef?.current?.activateItem(isGroupTitleFirstItem ? 1 : 0);
};
