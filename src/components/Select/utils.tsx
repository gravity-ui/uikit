import * as React from 'react';

import {warnOnce} from '../utils/warn';

import {
    FLATTEN_KEY,
    GROUP_ITEM_MARGIN_TOP,
    GROUP_SEPARATOR_HEIGHT,
    MOBILE_SIZE,
    SIZE_TO_GROUP_HEIGHT,
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

// "disable" property needs to deactivate group title item in List
export type GroupTitleItem<T = any> = {label: string; disabled: true; data?: T};

export type FlattenOption = SelectOption | GroupTitleItem;

/**
 * A group of the list: the header row plus its options — a section of the List core. The shape of
 * a `SelectOptionGroup` is kept (`label`, `data`, `options`): the node is what `renderOptionGroup`
 * and `getOptionGroupHeight` receive
 */
export type SelectGroupNode<T = any> = GroupTitleItem<T> & {
    id: string;
    options: SelectOption<T>[];
};

/** A row of the list as the List core sees it: an option or a section */
export type SelectListNode<T = any> = SelectOption<T> | SelectGroupNode<T>;

export const LOADING_OPTION_VALUE = '__SELECT_LIST_ITEM_LOADING__';

export const LOADING_OPTION: SelectOption = {value: LOADING_OPTION_VALUE, disabled: true};

export type FlattenOptions = FlattenOption[] & {
    [FLATTEN_KEY]: {
        filteredOptions: FlattenOption[];
    };
};

export const isSelectGroupTitle = (
    option?: SelectOption | SelectOptionGroup,
): option is GroupTitleItem => {
    return Boolean(option && 'label' in option);
};

export const getFlattenOptions = (options: SelectOptions): FlattenOptions => {
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

/** A string and a number are the text of the option as they are; a node is not */
const asText = (content: React.ReactNode): string | undefined => {
    if (typeof content === 'string') {
        return content;
    }

    return typeof content === 'number' ? String(content) : undefined;
};

/**
 * The default text of an option: its content when that is a string, otherwise its value. Call it
 * from a `getOptionText` of your own to fall back to the default for the rest of the options
 */
export const getSelectOptionText = (option: SelectOption): string => {
    const text = asText(option.content) ?? asText(option.children);

    if (text !== undefined) {
        return text;
    }

    if (option.content !== undefined || option.children !== undefined) {
        warnOnce(
            '[Select] An option whose content is not a string is searched and named by its `value`. Pass `getOptionText` to give such options a text of their own.',
        );
    }

    return option.value;
};

/** The text of an option: the one the consumer defines, otherwise the default */
export const resolveOptionText = (
    option: SelectOption,
    getOptionText?: SelectProps['getOptionText'],
): string => {
    return getOptionText ? getOptionText(option) : getSelectOptionText(option);
};

export const isSelectGroupNode = (node: SelectListNode): node is SelectGroupNode => {
    return 'label' in node;
};

/**
 * The flat list of options becomes the tree the core expects: a group title starts a section and
 * collects the options that follow it. The order of the rows is the order of `flattenOptions`, so
 * the index of a row in the list matches the index the height getters are called with; the loading
 * row is the last one, outside of any section.
 */
export const buildSelectListNodes = (
    flattenOptions: FlattenOption[],
    loading?: boolean,
): SelectListNode[] => {
    const nodes: SelectListNode[] = [];
    let currentGroup: SelectGroupNode | undefined;

    flattenOptions.forEach((option, index) => {
        if (isSelectGroupTitle(option)) {
            currentGroup = {...option, id: `__group_${index}`, options: []};
            nodes.push(currentGroup);
            return;
        }

        if (currentGroup) {
            currentGroup.options.push(option);
        } else {
            nodes.push(option);
        }
    });

    if (loading) {
        nodes.push(LOADING_OPTION);
    }

    return nodes;
};

export const getSelectListNodeText = (
    node: SelectListNode,
    getOptionText?: SelectProps['getOptionText'],
): string => {
    return isSelectGroupNode(node) ? node.label : resolveOptionText(node, getOptionText);
};

/** The size of the row view: on mobile every row is a row of size `l` */
export const getItemViewSize = (size: SelectSize, mobile: boolean): SelectSize =>
    mobile ? MOBILE_SIZE : size;

/**
 * The height of a row: the one the consumer asked for, or the one the row view comes out as. Only
 * a height of the first kind is put on the row inline — the rest of the time the view sizes itself
 * (and a row can never be shorter than the minimum of its size)
 */
export const getPopupItemHeight = (args: {
    getOptionHeight?: SelectProps['getOptionHeight'];
    getOptionGroupHeight?: SelectProps['getOptionGroupHeight'];
    size: SelectSize;
    option: FlattenOption;
    index: number;
    mobile: boolean;
}) => {
    const {getOptionHeight, getOptionGroupHeight, size, option, index, mobile} = args;
    const viewSize = getItemViewSize(size, mobile);

    if (isSelectGroupTitle(option)) {
        if (getOptionGroupHeight) {
            return getOptionGroupHeight(option, index);
        }

        // An empty label is a separator rather than a header
        if (option.label === '') {
            return index === 0 ? 0 : GROUP_SEPARATOR_HEIGHT;
        }

        return SIZE_TO_GROUP_HEIGHT[viewSize] + (index === 0 ? 0 : GROUP_ITEM_MARGIN_TOP);
    }

    return getOptionHeight ? getOptionHeight(option, index) : SIZE_TO_ITEM_HEIGHT[viewSize];
};

export const getSelectedOptionsContent = (
    options: SelectOptions,
    value: string[],
    renderSelectedOption?: SelectProps['renderSelectedOption'],
    getOptionText?: SelectProps['getOptionText'],
): React.ReactNode => {
    if (value.length === 0) {
        return null;
    }

    const flattenSimpleOptions = options.filter(
        (opt) => !isSelectGroupTitle(opt),
    ) as SelectOption[];

    const optionsMap = new Map<string, SelectOption>(
        flattenSimpleOptions.map((opt) => [opt.value, opt]),
    );

    const selectedOptions = value.map((val) => {
        return optionsMap.get(val) || {value: val};
    });

    if (renderSelectedOption) {
        return selectedOptions.map((option, index) => {
            return (
                <React.Fragment key={option.value}>
                    {renderSelectedOption(option, index)}
                </React.Fragment>
            );
        });
    } else {
        return selectedOptions
            .map((option) => {
                return resolveOptionText(option, getOptionText);
            })
            .join(', ');
    }
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
        [] as (SelectOption | SelectOptionGroup)[],
    );
};

const isOptionMatchedByFilter = (
    option: SelectOption,
    filter: string,
    getOptionText?: SelectProps['getOptionText'],
) => {
    const lowerOptionText = resolveOptionText(option, getOptionText).toLocaleLowerCase();
    const lowerFilter = filter.toLocaleLowerCase();

    return lowerOptionText.indexOf(lowerFilter) !== -1;
};

export const getFilteredFlattenOptions = (args: {
    options: FlattenOption[];
    filter: string;
    filterOption?: SelectProps['filterOption'];
    getOptionText?: SelectProps['getOptionText'];
}) => {
    const {options, filter, filterOption, getOptionText} = args;
    const filteredOptions = options.filter((option) => {
        if (isSelectGroupTitle(option)) {
            return true;
        }

        return filterOption
            ? filterOption(option, filter)
            : isOptionMatchedByFilter(option, filter, getOptionText);
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

/**
 * Scrolls the row into view inside the list root and nowhere else — unlike `scrollIntoView`, a popup
 * hanging off the viewport edge never drags the page along. Under virtualization the row sits in an
 * absolutely positioned wrapper, so its offset inside the root is the sum along the `offsetParent`
 * chain rather than a single `offsetTop`.
 */
export function scrollToItem(container: HTMLElement, node: HTMLElement) {
    const height = container.offsetHeight;
    const scrollTop = container.scrollTop;

    let top = 0;
    let element: HTMLElement | null = node;
    while (element && element !== container && container.contains(element)) {
        top += element.offsetTop;
        const offsetParent: Element | null = element.offsetParent;
        element = offsetParent instanceof HTMLElement ? offsetParent : null;
    }

    const bottom = top + node.offsetHeight;

    let nextScrollTop: number | undefined;

    if (bottom >= scrollTop + height) {
        nextScrollTop = bottom - height;
    } else if (top <= scrollTop) {
        nextScrollTop = top;
    }

    if (nextScrollTop !== undefined) {
        // scrollTop rather than scrollTo: the same instant scroll, and jsdom implements it
        // eslint-disable-next-line no-param-reassign
        container.scrollTop = nextScrollTop;
    }
}
