import type {TextInputPin, TextInputSize, TextInputView} from '../TextInput';
import type {ControlGroupOption, ControlGroupProps, QAProps} from '../types';
import type {Fetcher} from '../utils/Select/useSelectInfinityFetch/types';
import type {UseOpenProps} from '../utils/useSelect/types';

import type {Option, OptionGroup} from './tech-components';

export type SelectRenderControlProps = {
    onClick: (e: React.MouseEvent<HTMLElement>) => void;
    onKeyDown: (e: React.KeyboardEvent<HTMLElement>) => void;
    ref: React.Ref<HTMLElement>;
    open: boolean;
};
export type SelectRenderControlOptions = {
    value: SelectProps['value'];
};
export type SelectRenderControl = (
    props: SelectRenderControlProps,
    options: SelectRenderControlOptions,
) => React.ReactElement;

export type SelectRenderOptionViewParams = {
    itemHeight: number;
};

export type SelectRenderOption<T> = (
    option: SelectOption<T>,
    options: SelectRenderOptionViewParams,
) => React.ReactElement;

export type SelectSize = TextInputSize;

export type SelectOptionType<T> = SelectOption<T> | SelectOptionGroup<T>;
export type SelectAsyncOptionType<Option, Pagination> = Fetcher<Option, Pagination>;

export type SelectProps<T = any, Pagination = any> = QAProps &
    Pick<ControlGroupProps, 'name' | 'disabled'> &
    UseOpenProps & {
        onUpdate?: (value: string[]) => void;
        onFilterChange?: (filter: string) => void;
        renderControl?: SelectRenderControl;
        renderFilter?: (props: {
            onChange: (filter: string) => void;
            onKeyDown: (e: React.KeyboardEvent<HTMLElement>) => void;
            value: string;
            ref: React.Ref<HTMLInputElement>;
        }) => React.ReactElement;
        renderOption?: SelectRenderOption<T>;
        renderSelectedOption?: (option: SelectOption<T>, index: number) => React.ReactElement;
        renderEmptyOptions?: ({filter}: {filter: string}) => React.ReactElement;
        getOptionHeight?: (option: SelectOption<T>) => number;
        filterOption?: (option: SelectOption<T>, filter: string) => boolean;
        view?: TextInputView;
        size?: SelectSize;
        pin?: TextInputPin;
        width?: 'auto' | 'max' | number;
        popupWidth?: number;
        virtualizationThreshold?: number;
        className?: string;
        controlClassName?: string;
        popupClassName?: string;
        label?: string;
        placeholder?: React.ReactNode;
        filterPlaceholder?: string;
        value?: string[];
        defaultValue?: string[];
        options?: SelectOptionType<T>[] | SelectAsyncOptionType<T, Pagination>;
        error?: string | boolean;
        multiple?: boolean;
        filterable?: boolean;
        disablePortal?: boolean;
        children?:
            | React.ReactElement<SelectOption<T>, typeof Option>
            | React.ReactElement<SelectOption<T>, typeof Option>[]
            | React.ReactElement<SelectOptionGroup<T>, typeof OptionGroup>
            | React.ReactElement<SelectOptionGroup<T>, typeof OptionGroup>[];
    };

export type SelectBasicProps<Option = any> = Omit<SelectProps<Option>, 'options'> & {
    options?: SelectOptionType<Option>[];
};

export type SelectAsyncProps<Option = any, Pagination = any> = Omit<
    SelectProps<Option>,
    'options'
> & {
    options: SelectAsyncOptionType<SelectOptionType<Option>[], Pagination>;
};

export type SelectOption<T = any> = QAProps &
    ControlGroupOption & {
        text?: string;
        data?: T;
        notFilterable?: boolean;
    };

export type SelectOptionGroup<T = any> = {
    /** Label is a string which displayed above the options group.
     * If label is empty string, group item height will be 0 and only border will be displayed */
    label: string;
    options?: SelectOption<T>[];
    children?:
        | React.ReactElement<SelectOption, typeof Option>
        | React.ReactElement<SelectOption, typeof Option>[];
};
