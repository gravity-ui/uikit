import * as React from 'react';

import {warnOnce} from '../utils/warn';

import {
    FLATTEN_KEY,
    GROUP_ITEM_MARGIN_TOP,
    GROUP_SEPARATOR_HEIGHT,
    MOBILE_SIZE,
    SIZE_TO_ITEM_HEIGHT,
} from './constants';
import type {Option, OptionGroup} from './tech-components';
import type {SelectOptionGroupProps, SelectOptionProps, SelectProps, SelectSize} from './types';

// "disable" property needs to deactivate group title item in List
export type GroupTitleItem<T = any> = {label: string; disabled: true; data?: T};

/** An option inside the Select: the type of its value stays with the consumer */
export type AnySelectOption<T = any> = SelectOptionProps<T, unknown>;
type AnySelectOptionGroup = SelectOptionGroupProps<unknown, unknown>;
export type AnySelectOptions = (AnySelectOption | AnySelectOptionGroup)[];

/** The getters of the props as the internals call them — with an option of any value */
export type AnySelectProps = SelectProps<any, any>;

export type FlattenOption = AnySelectOption | GroupTitleItem;

/** The string a value is known by: see `getValueKey` */
export type SelectValueKeyGetter = (value: unknown) => string;

/** The key of a value: the one the consumer defines, otherwise the value as a string */
export const getSelectValueKey = (
    value: unknown,
    getValueKey?: AnySelectProps['getValueKey'],
): string => {
    if (getValueKey) {
        return getValueKey(value);
    }

    if (typeof value === 'string') {
        return value;
    }

    if (typeof value === 'object' && value !== null) {
        warnOnce(
            '[Select] An option has an object as its value. The Select knows a value by a string — pass `getValueKey` to give such values one, otherwise all of them are "[object Object]".',
        );
    }

    return String(value);
};

/**
 * A group of the list: the header row plus its options — a section of the List core. The shape of
 * a `SelectOptionGroupProps` is kept (`label`, `data`, `options`): the node is what
 * `renderOptionGroup` and `getOptionGroupHeight` receive
 */
export type SelectGroupNode<T = any> = GroupTitleItem<T> & {
    id: string;
    options: AnySelectOption<T>[];
};

/** A row of the list as the List core sees it: an option or a section */
export type SelectListNode<T = any> = AnySelectOption<T> | SelectGroupNode<T>;

/** The mark of the row the Select adds itself: a value is not enough, a consumer may use any */
const LOADING_ROW = Symbol('select-loading-row');

/** The row of the loader: it takes an id of its own where the rows are built */
const LOADING_OPTION = {disabled: true} as AnySelectOption;

/** The row of the loader — ours, never an option of the consumer */
export const isSelectLoadingNode = (node: SelectListNode | FlattenOption): boolean => {
    return LOADING_ROW in node;
};

export type FlattenOptions = FlattenOption[] & {
    [FLATTEN_KEY]: {
        filteredOptions: FlattenOption[];
        /**
         * The group an option came from. Flattening loses the boundaries of a group — an option
         * that follows one is not a member of it — so membership is written down while it is still
         * known, and filtering keeps it: the options are the same objects
         */
        groupOfOption?: Map<AnySelectOption, GroupTitleItem>;
        /** The groups that had options of their own: only such a group can be left empty by a filter */
        groupsWithOptions?: Set<GroupTitleItem>;
    };
};

/** The groups of the options, as far as the flatten array knows them */
export const getGroupOfOption = (
    options: AnySelectOptions | FlattenOption[],
): Map<AnySelectOption, GroupTitleItem> | undefined => {
    return (options as Partial<FlattenOptions>)[FLATTEN_KEY]?.groupOfOption;
};

/** The groups that came with options of their own */
export const getGroupsWithOptions = (
    options: AnySelectOptions | FlattenOption[],
): Set<GroupTitleItem> | undefined => {
    return (options as Partial<FlattenOptions>)[FLATTEN_KEY]?.groupsWithOptions;
};

export const isSelectGroupTitle = (
    option?: AnySelectOption | AnySelectOptionGroup,
): option is GroupTitleItem => {
    return Boolean(option && 'label' in option);
};

export const getFlattenOptions = (options: AnySelectOptions): FlattenOptions => {
    const groupOfOption = new Map<AnySelectOption, GroupTitleItem>();
    const groupsWithOptions = new Set<GroupTitleItem>();
    const flatten = options.reduce<FlattenOption[]>((acc, option) => {
        if ('label' in option) {
            const title: GroupTitleItem = {label: option.label, disabled: true, data: option.data};
            acc.push(title);
            for (const groupOption of option.options || []) {
                groupOfOption.set(groupOption, title);
                groupsWithOptions.add(title);
                acc.push(groupOption);
            }
        } else {
            acc.push(option);
        }

        return acc;
    }, []);
    Object.defineProperty(flatten, FLATTEN_KEY, {
        enumerable: false,
        value: {groupOfOption, groupsWithOptions},
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
 * The default text of an option: its content when that is a string or a number, otherwise its
 * value — as it is for a string, through `String()` for another primitive. An object value has no
 * text of its own. Call it from a `getOptionText` of your own to fall back to the default for the
 * rest of the options
 */
export const getSelectOptionText = <V,>(option: SelectOptionProps<unknown, V>): string => {
    const text = asText(option.content) ?? asText(option.children);

    if (text !== undefined) {
        return text;
    }

    if (option.content !== undefined || option.children !== undefined) {
        warnOnce(
            '[Select] An option whose content is not a string is searched and named by its `value`. Pass `getOptionText` to give such options a text of their own.',
        );
    }

    const {value} = option;

    if (typeof value === 'string') {
        return value;
    }

    if (typeof value === 'object' && value !== null) {
        warnOnce(
            '[Select] An option whose value is an object has no text by default. Pass `getOptionText` to give such options a text, or give them a string `content`.',
        );
        return '';
    }

    return String(value);
};

/** The text of an option: the one the consumer defines, otherwise the default */
export const resolveOptionText = (
    option: AnySelectOption,
    getOptionText?: AnySelectProps['getOptionText'],
): string => {
    return getOptionText ? getOptionText(option) : getSelectOptionText(option);
};

export const isSelectGroupNode = (node: SelectListNode): node is SelectGroupNode => {
    return 'label' in node;
};

/** The id of a row: a section and the loader have their own, an option is known by its value */
export const getSelectListNodeId = (node: SelectListNode, getKey: SelectValueKeyGetter): string => {
    if (isSelectGroupNode(node)) {
        return node.id;
    }

    const loadingId = (node as {[LOADING_ROW]?: string})[LOADING_ROW];

    return loadingId ?? getKey(node.value);
};

/**
 * The values that count as selected: one with an option, or one without that is not empty — `''`,
 * `null` and `undefined` mean nothing unless an option declares them
 */
export const getSelectedValues = (
    options: FlattenOption[],
    value: unknown[],
    getKey: SelectValueKeyGetter,
): unknown[] => {
    const optionKeys = new Set<string>();

    for (const option of options) {
        if (!isSelectGroupTitle(option)) {
            optionKeys.add(getKey(option.value));
        }
    }

    return value.filter(
        (item) =>
            optionKeys.has(getKey(item)) || (item !== '' && item !== null && item !== undefined),
    );
};

/** The way back from a key to a value: the options and the selected values, with or without one */
export const getValueByKey = (
    options: FlattenOption[],
    value: unknown[],
    getKey: SelectValueKeyGetter,
): Map<string, unknown> => {
    const map = new Map<string, unknown>();

    for (const option of options) {
        if (!isSelectGroupTitle(option)) {
            map.set(getKey(option.value), option.value);
        }
    }

    // A selected value stays the very object the consumer gave
    for (const item of value) {
        map.set(getKey(item), item);
    }

    return map;
};

const SECTION_ID_PREFIX = '__group_';

/**
 * A prefix no value of an option starts with: the id of a section shares the space of ids with the
 * values, and a collision would cost the list a row
 */
const getSectionIdPrefix = (
    flattenOptions: FlattenOption[],
    getKey: SelectValueKeyGetter,
): string => {
    const keys = flattenOptions.flatMap((option) =>
        isSelectGroupTitle(option) ? [] : [getKey(option.value)],
    );
    const startsWithPrefix = (prefix: string) => keys.some((key) => key.startsWith(prefix));

    let prefix = SECTION_ID_PREFIX;

    while (startsWithPrefix(prefix)) {
        prefix = `_${prefix}`;
    }

    return prefix;
};

/**
 * The flat list of options becomes the tree the core expects: a group title starts a section, and
 * the options of that group become its rows. Which options those are is told by the flatten array
 * (`groupOfOption`) rather than by their position — an option that merely follows a group is not a
 * member of it. The order of the rows is the order of `flattenOptions`, so the index of a row in
 * the list matches the index the height getters are called with; the loading row is the last one,
 * outside of any section.
 */
export const buildSelectListNodes = (
    flattenOptions: FlattenOption[],
    getKey: SelectValueKeyGetter,
    loading?: boolean,
    groupOfOption?: Map<AnySelectOption, GroupTitleItem>,
    groupsWithOptions?: Set<GroupTitleItem>,
): SelectListNode[] => {
    const nodes: SelectListNode[] = [];
    const sectionOfTitle = new Map<GroupTitleItem, SelectGroupNode>();
    // The section is a copy of the title, so the way back has to be written down
    const titleOfSection = new Map<SelectGroupNode, GroupTitleItem>();
    const prefix = getSectionIdPrefix(flattenOptions, getKey);

    flattenOptions.forEach((option, index) => {
        if (isSelectGroupTitle(option)) {
            const section: SelectGroupNode = {...option, id: `${prefix}${index}`, options: []};
            sectionOfTitle.set(option, section);
            titleOfSection.set(section, option);
            nodes.push(section);
            return;
        }

        const title = groupOfOption?.get(option);
        const section = title && sectionOfTitle.get(title);

        if (section) {
            section.options.push(option);
        } else {
            nodes.push(option);
        }
    });

    if (loading) {
        nodes.push({...LOADING_OPTION, [LOADING_ROW]: `${prefix}loading`} as AnySelectOption);
    }

    // A section whose options the filter took away has nothing left to head. A group that came
    // without options of its own is a header by the will of the consumer and stays, as does a group
    // with an empty label — that one is a separator and heads nothing to begin with
    return nodes.filter((node) => {
        if (!isSelectGroupNode(node) || node.label === '' || node.options.length > 0) {
            return true;
        }

        const title = titleOfSection.get(node);

        return title && groupsWithOptions ? !groupsWithOptions.has(title) : false;
    });
};

export const getSelectListNodeText = (
    node: SelectListNode,
    getOptionText?: AnySelectProps['getOptionText'],
): string => {
    if (isSelectGroupNode(node)) {
        return node.label;
    }

    // The loading row belongs to the Select, not to the consumer: it has no text of its own and
    // must not reach a getter written for the options of the consumer
    if (isSelectLoadingNode(node)) {
        return '';
    }

    return resolveOptionText(node, getOptionText);
};

/** The size of the row view: on mobile every row is a row of size `xl`, whatever the Select is */
export const getItemViewSize = (size: SelectSize, mobile: boolean): SelectSize =>
    mobile ? MOBILE_SIZE : size;

/**
 * The height of a row: the one the consumer asked for, or the one the row view comes out as. Only
 * a height of the first kind is put on the row inline — the rest of the time the view sizes itself
 * (and a row can never be shorter than the minimum of its size)
 */
export const getPopupItemHeight = (args: {
    getOptionHeight?: AnySelectProps['getOptionHeight'];
    getOptionGroupHeight?: AnySelectProps['getOptionGroupHeight'];
    size: SelectSize;
    option: FlattenOption;
    index: number;
    mobile: boolean;
}) => {
    const {getOptionHeight, getOptionGroupHeight, size, option, index, mobile} = args;
    const viewSize = getItemViewSize(size, mobile);

    // The loading row belongs to the Select: a getter written for the options of the consumer is
    // no more prepared for it here than it is for the text of an option
    if (isSelectLoadingNode(option)) {
        return SIZE_TO_ITEM_HEIGHT[viewSize];
    }

    if (isSelectGroupTitle(option)) {
        if (getOptionGroupHeight) {
            return getOptionGroupHeight(option, index);
        }

        // An empty label is a separator rather than a header
        if (option.label === '') {
            return index === 0 ? 0 : GROUP_SEPARATOR_HEIGHT;
        }

        return SIZE_TO_ITEM_HEIGHT[viewSize] + (index === 0 ? 0 : GROUP_ITEM_MARGIN_TOP);
    }

    return getOptionHeight ? getOptionHeight(option, index) : SIZE_TO_ITEM_HEIGHT[viewSize];
};

export const getSelectedOptionsContent = (
    options: AnySelectOptions,
    value: unknown[],
    getKey: SelectValueKeyGetter,
    renderSelectedOptions?: AnySelectProps['renderSelectedOptions'],
    getOptionText?: AnySelectProps['getOptionText'],
): React.ReactNode => {
    if (value.length === 0) {
        return null;
    }

    const flattenSimpleOptions = options.filter(
        (opt) => !isSelectGroupTitle(opt),
    ) as AnySelectOption[];

    const optionsMap = new Map<string, AnySelectOption>(
        flattenSimpleOptions.map((opt) => [getKey(opt.value), opt]),
    );

    if (renderSelectedOptions) {
        const selectedOptions = value.map((val) => optionsMap.get(getKey(val)) ?? {value: val});
        // Keys an array such as `options.map(render)`; an empty array still hides the placeholder
        return React.Children.toArray(renderSelectedOptions(selectedOptions));
    }

    return value
        .map((val) => {
            const key = getKey(val);
            const option = optionsMap.get(key);

            // A value the options do not hold yet — they are still loading, say — is not an option:
            // the getter of the consumer is written for its own options and would not survive one
            return option ? resolveOptionText(option, getOptionText) : key;
        })
        .join(', ');
};

const getTypedChildrenArray = (children: AnySelectProps['children']) => {
    return React.Children.toArray(children) as (
        | React.ReactElement<AnySelectOption, typeof Option>
        | React.ReactElement<AnySelectOptionGroup, typeof OptionGroup>
    )[];
};

const getOptionsFromOptgroupChildren = (children: AnySelectOptionGroup['children']) => {
    return (
        React.Children.toArray(children) as React.ReactElement<AnySelectOption, typeof Option>[]
    ).reduce((acc, {props}) => {
        if ('value' in props) {
            acc.push(props);
        }

        return acc;
    }, [] as AnySelectOption[]);
};

export const getOptionsFromChildren = (children: AnySelectProps['children']) => {
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
        [] as (AnySelectOption | AnySelectOptionGroup)[],
    );
};

const isOptionMatchedByFilter = (
    option: AnySelectOption,
    filter: string,
    getOptionText?: AnySelectProps['getOptionText'],
) => {
    const lowerOptionText = resolveOptionText(option, getOptionText).toLocaleLowerCase();
    const lowerFilter = filter.toLocaleLowerCase();

    return lowerOptionText.indexOf(lowerFilter) !== -1;
};

export const getFilteredFlattenOptions = (args: {
    options: FlattenOption[];
    filter: string;
    filterOption?: AnySelectProps['filterOption'];
    getOptionText?: AnySelectProps['getOptionText'];
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
