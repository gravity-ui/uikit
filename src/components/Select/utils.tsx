import React from 'react';

import clone from 'lodash/clone';

import {KeyCode} from '../../constants';
import {List} from '../List';
import type {ListItemData} from '../List';

import {MOBILE_ITEM_HEIGHT, SIZE_TO_ITEM_HEIGHT} from './constants';
import type {SelectOptions} from './hooks-public';
import {Option, OptionGroup} from './tech-components';
import type {SelectOption, SelectOptionGroup, SelectProps, SelectSize} from './types';

export const FLATTEN_KEY = Symbol('flatten');

// "disable" property needs to deactivate group title item in List
export type GroupTitleItem = {label: string; disabled?: true};

export type FlattenOption<T = SelectOption | GroupTitleItem> = T & {
    [FLATTEN_KEY]: {
        group: number;
    };
};

export function getFlattenOption<T = SelectOption | GroupTitleItem>(
    option: T,
    config: {group: number},
) {
    const flattenOption = clone(option);
    Object.defineProperty(flattenOption, FLATTEN_KEY, {
        enumerable: false,
        value: config,
    });
    return flattenOption as FlattenOption<T>;
}

export const getFlattenOptions = (
    options: (SelectOption | SelectOptionGroup)[],
): FlattenOption[] => {
    const flatten: FlattenOption[] = [];
    let group = 0;
    Object.defineProperty(flatten, FLATTEN_KEY, {
        enumerable: false,
        value: {},
    });
    for (const option of options) {
        if ('label' in option) {
            group += 1;
            flatten.push(getFlattenOption({label: option.label, disabled: true}, {group}));

            if (Array.isArray(option.options)) {
                // eslint-disable-next-line @typescript-eslint/no-loop-func
                flatten.push(...option.options.map((o) => getFlattenOption(o, {group})));
            }
        } else {
            flatten.push(getFlattenOption(option, {group: 0}));
        }
    }
    return flatten;
};

export const isSelectGroupTitle = (
    option?: SelectOption | SelectOptionGroup,
): option is GroupTitleItem => {
    return Boolean(option && 'label' in option);
};

export const getPopupItemHeight = (args: {
    getOptionHeight?: SelectProps['getOptionHeight'];
    getOptionGroupHeight?: SelectProps['getOptionGroupHeight'];
    size: SelectSize;
    option: SelectOption | SelectOptionGroup;
    mobile: boolean;
}) => {
    const {getOptionHeight, getOptionGroupHeight, size, option, mobile} = args;

    let itemHeight = mobile ? MOBILE_ITEM_HEIGHT : SIZE_TO_ITEM_HEIGHT[size];

    if ('label' in option) {
        itemHeight = option.label === '' ? 0 : itemHeight;

        return getOptionGroupHeight ? getOptionGroupHeight(option) : itemHeight;
    } else if (option.value === '__DIVIDER__') {
        return 5;
    } else if (option.value === '__SELECT_LIST_ITEM_LOADING__') {
        return itemHeight;
    }

    return getOptionHeight ? getOptionHeight(option) : itemHeight;
};

export const getOptionsHeight = (args: {
    getOptionHeight?: SelectProps['getOptionHeight'];
    getOptionGroupHeight?: SelectProps['getOptionGroupHeight'];
    size: NonNullable<SelectProps['size']>;
    options: (SelectOption | SelectOptionGroup)[];
    mobile: boolean;
}) => {
    const {getOptionHeight, getOptionGroupHeight, size, options, mobile} = args;
    return options.reduce((height, option) => {
        return (
            height +
            getPopupItemHeight({
                getOptionHeight,
                getOptionGroupHeight,
                size,
                option,
                mobile,
            })
        );
    }, 0);
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

export const getSelectedOptionsContent = (
    flattenOptions: (SelectOption | SelectOptionGroup)[],
    value: string[],
    renderSelectedOption?: SelectProps['renderSelectedOption'],
): React.ReactNode => {
    if (value.length === 0) {
        return null;
    }

    const flattenSimpleOptions = flattenOptions.filter(
        (opt) => !isSelectGroupTitle(opt),
    ) as SelectOption[];

    const selectedOptions = value.reduce<SelectOption[]>((acc, val) => {
        const selectedOption = flattenSimpleOptions.find((opt) => opt.value === val);

        acc.push(selectedOption || {value: val});
        return acc;
    }, []);

    if (renderSelectedOption) {
        return selectedOptions.map((option) => {
            return (
                <React.Fragment key={option.value}>{renderSelectedOption(option)}</React.Fragment>
            );
        });
    } else {
        return selectedOptions
            .map((option) => {
                return getOptionText(option);
            })
            .join(', ');
    }
};

const getOptionsFromOptgroupChildren = (children: React.ReactNode) => {
    const options: SelectOptions = [];
    React.Children.map(children, (element) => {
        if (React.isValidElement(element)) {
            if (element.type === Option) {
                options.push(element.props);
            }
        }
    });
    return options;
};

export const getOptionsFromChildren = (children: React.ReactNode) => {
    const options: SelectOptions = [];
    React.Children.map(children, (element) => {
        if (React.isValidElement(element)) {
            if (element.type === Option) {
                options.push(element.props);
            } else if (element.type === OptionGroup) {
                const groupOptions =
                    element.props.options || getOptionsFromOptgroupChildren(element.props.children);
                options.push({
                    options: groupOptions,
                    label: element.props.label,
                });
            }
        }
    });
    return options;
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

const getEscapedRegExp = (string: string) => {
    return new RegExp(string.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&'), 'i');
};

export const findItemIndexByQuickSearch = (
    quickSearch: string,
    items?: ListItemData<SelectOption | SelectOptionGroup>[],
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

        return getEscapedRegExp(quickSearch).test(optionText);
    });
};

export const getListItems = (listRef: React.RefObject<List<SelectOption | SelectOptionGroup>>) => {
    return listRef?.current?.getItems() || [];
};

export const getActiveItem = (listRef: React.RefObject<List<SelectOption | SelectOptionGroup>>) => {
    const items = getListItems(listRef);
    const activeItemIndex = listRef?.current?.getActiveItem();

    return typeof activeItemIndex === 'number' ? items[activeItemIndex] : undefined;
};

export const activateFirstClickableItem = (
    listRef: React.RefObject<List<SelectOption | SelectOptionGroup>>,
) => {
    const items = getListItems(listRef);
    listRef?.current?.activateItem(List.findNextIndex(items, 0, 1), false);
};

const isOptionMatchedByFilter = (option: SelectOption, filter: string) => {
    const lowerOptionText = getOptionText(option).toLocaleLowerCase();
    const lowerFilter = filter.toLocaleLowerCase();

    return lowerOptionText.indexOf(lowerFilter) !== -1;
};

export const getFilteredFlattenOptions = (args: {
    options: FlattenOption[];
    filter: string;
    filterOption?: SelectProps['filterOption'];
}) => {
    const {options, filter, filterOption} = args;
    const filteredOptions = options.filter((option) => {
        if (isSelectGroupTitle(option)) {
            return true;
        }

        return filterOption
            ? filterOption(option, filter)
            : isOptionMatchedByFilter(option, filter);
    });

    return filteredOptions.reduce<FlattenOption[]>((acc, option, index) => {
        const groupTitle = isSelectGroupTitle(option);
        const isLastOption = index === filteredOptions.length - 1;

        if (
            !(
                (groupTitle &&
                    !isLastOption &&
                    option[FLATTEN_KEY].group === filteredOptions[index + 1][FLATTEN_KEY].group) ||
                !groupTitle
            )
        ) {
            return acc;
        }

        acc.push(option);

        return acc;
    }, []);
};
