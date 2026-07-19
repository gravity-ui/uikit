import * as React from 'react';

import {KeyCode} from '../../constants';
import type {List, ListItemData} from '../List';

import {
    FLATTEN_KEY,
    GROUP_ITEM_MARGIN_TOP,
    MOBILE_ITEM_HEIGHT,
    SIZE_TO_ITEM_HEIGHT,
} from './constants';
import type {Option, OptionGroup} from './tech-components';
import type {
    SelectOption,
    SelectOptionGroup,
    SelectOptions,
    SelectProps,
    SelectSize,
} from './types';

// Internal views of the public types with the value/data generics erased
type ErasedOption = SelectOption<unknown, unknown>;
type ErasedOptionGroup = SelectOptionGroup<unknown, unknown>;
type ErasedOptions = SelectOptions<unknown, unknown>;
type ErasedProps = SelectProps<unknown, unknown>;

// "disable" property needs to deactivate group title item in List
export type GroupTitleItem<T = any> = {label: string; disabled: true; data?: T};

export type FlattenOption = SelectOption<any, any> | GroupTitleItem;

export type FlattenOptions = FlattenOption[] & {
    [FLATTEN_KEY]: {
        filteredOptions: FlattenOption[];
    };
};

export const isSelectGroupTitle = (
    option?: ErasedOption | ErasedOptionGroup,
): option is GroupTitleItem => {
    return Boolean(option && 'label' in option);
};

export const getFlattenOptions = (options: ErasedOptions): FlattenOptions => {
    const flatten = options.reduce<FlattenOption[]>((acc, option) => {
        if ('label' in option) {
            acc.push({label: option.label, disabled: true, data: option.data});
            acc.push(...(option.options || []));
        } else {
            acc.push(option);
        }

        return acc;
    }, []);
    Object.defineProperty(flatten, FLATTEN_KEY, {
        enumerable: false,
        value: {},
    });
    return flatten as FlattenOptions;
};

export const getPopupItemHeight = (args: {
    getOptionHeight?: SelectProps['getOptionHeight'];
    getOptionGroupHeight?: SelectProps['getOptionGroupHeight'];
    size: SelectSize;
    option: FlattenOption;
    index: number;
    mobile: boolean;
}) => {
    const {getOptionHeight, getOptionGroupHeight, size, option, index, mobile} = args;

    let itemHeight = mobile ? MOBILE_ITEM_HEIGHT : SIZE_TO_ITEM_HEIGHT[size];

    if (isSelectGroupTitle(option)) {
        const marginTop = index === 0 ? 0 : GROUP_ITEM_MARGIN_TOP;
        itemHeight = option.label === '' ? 0 : itemHeight;

        return getOptionGroupHeight ? getOptionGroupHeight(option, index) : itemHeight + marginTop;
    }

    return getOptionHeight ? getOptionHeight(option, index) : itemHeight;
};

export const getOptionsHeight = (args: {
    getOptionHeight?: SelectProps['getOptionHeight'];
    getOptionGroupHeight?: SelectProps['getOptionGroupHeight'];
    size: NonNullable<SelectProps['size']>;
    options: FlattenOption[];
    mobile: boolean;
}) => {
    const {getOptionHeight, getOptionGroupHeight, size, options, mobile} = args;
    return options.reduce((height, option, index) => {
        return (
            height +
            getPopupItemHeight({getOptionHeight, getOptionGroupHeight, size, option, index, mobile})
        );
    }, 0);
};

export const serializeOptionValue = (value: unknown): string => {
    switch (typeof value) {
        case 'string':
            return value;
        case 'object':
            try {
                return JSON.stringify(value) ?? String(value);
            } catch {
                return String(value); // circular structure
            }
        default:
            return String(value);
    }
};

export const getOptionValueKey = (() => {
    const keys = new WeakMap<object, string>();
    let nextKey = 0;

    // selection works by reference for object values, so React keys follow identity too
    return (value: unknown): string => {
        if (typeof value === 'object' && value !== null) {
            let key = keys.get(value);
            if (key === undefined) {
                key = `obj-${nextKey++}`;
                keys.set(value, key);
            }
            return key;
        }
        return serializeOptionValue(value);
    };
})();

const getOptionText = (option: ErasedOption): string => {
    if (typeof option.content === 'string') {
        return option.content;
    }

    if (typeof option.children === 'string') {
        return option.children;
    }

    if (option.text) {
        return option.text;
    }

    return serializeOptionValue(option.value);
};

export const getSelectedOptionsContent = (
    options: ErasedOptions,
    value: unknown[],
    renderSelectedOption?: ErasedProps['renderSelectedOption'],
): React.ReactNode => {
    if (value.length === 0) {
        return null;
    }

    const flattenSimpleOptions = options.filter((opt) => !isSelectGroupTitle(opt)) as SelectOption<
        unknown,
        unknown
    >[];

    const optionsMap = new Map<unknown, ErasedOption>(
        flattenSimpleOptions.map((opt) => [opt.value, opt]),
    );

    const selectedOptions = value.map((val) => {
        return optionsMap.get(val) || {value: val};
    });

    if (renderSelectedOption) {
        return selectedOptions.map((option, index) => {
            return (
                <React.Fragment key={getOptionValueKey(option.value)}>
                    {renderSelectedOption(option, index)}
                </React.Fragment>
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

const getTypedChildrenArray = (children: ErasedProps['children']) => {
    return React.Children.toArray(children) as (
        | React.ReactElement<ErasedOption, typeof Option>
        | React.ReactElement<ErasedOptionGroup, typeof OptionGroup>
    )[];
};

const getOptionsFromOptgroupChildren = (children: ErasedOptionGroup['children']) => {
    return (
        React.Children.toArray(children) as React.ReactElement<ErasedOption, typeof Option>[]
    ).reduce((acc, {props}) => {
        if ('value' in props) {
            acc.push(props);
        }

        return acc;
    }, [] as ErasedOption[]);
};

export const getOptionsFromChildren = (children: ErasedProps['children']) => {
    return getTypedChildrenArray(children).reduce(
        (acc, {props}) => {
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
        },
        [] as (ErasedOption | ErasedOptionGroup)[],
    );
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
    items?: ListItemData<FlattenOption>[],
) => {
    if (!items) {
        return -1;
    }

    return items.findIndex((item) => {
        if (isSelectGroupTitle(item)) {
            return false;
        }

        if (item.disabled) {
            return false;
        }

        const optionText = getOptionText(item);

        return getEscapedRegExp(quickSearch).test(optionText);
    });
};

export const getListItems = (listRef: React.RefObject<List<FlattenOption> | null>) => {
    return listRef?.current?.getItems() || [];
};

export const getActiveItem = (listRef: React.RefObject<List<FlattenOption> | null>) => {
    const items = getListItems(listRef);
    const activeItemIndex = listRef?.current?.getActiveItem();

    return typeof activeItemIndex === 'number' ? items[activeItemIndex] : undefined;
};

const isOptionMatchedByFilter = (option: ErasedOption, filter: string) => {
    const lowerOptionText = getOptionText(option).toLocaleLowerCase();
    const lowerFilter = filter.toLocaleLowerCase();

    return lowerOptionText.indexOf(lowerFilter) !== -1;
};

export const getFilteredFlattenOptions = (args: {
    options: FlattenOption[];
    filter: string;
    filterOption?: SelectProps<any, any>['filterOption'];
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

    return filteredOptions.reduce((acc, option, index) => {
        const groupTitle = isSelectGroupTitle(option);
        const previousGroupTitle = isSelectGroupTitle(acc[acc.length - 1]);
        const isLastOption = index === filteredOptions.length - 1;

        if (groupTitle && previousGroupTitle) {
            acc.pop();
        }

        if (!groupTitle || (groupTitle && !isLastOption)) {
            acc.push(option);
        }

        return acc;
    }, [] as FlattenOption[]);
};

export function scrollToItem(node: HTMLElement) {
    const container = node.offsetParent;
    if (container instanceof HTMLElement) {
        const height = container.offsetHeight;
        const scrollTop = container.scrollTop;

        const top = node.offsetTop;
        const bottom = top + node.offsetHeight;

        if (bottom >= scrollTop + height) {
            container.scrollTo({top: top - height + node.offsetHeight});
        } else if (top <= scrollTop) {
            container.scrollTo({top});
        }
    }

    return true;
}
