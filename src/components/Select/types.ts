import React from 'react';
import {TextInputView, TextInputSize, TextInputPin} from '../TextInput';
import {ControlGroupProps, ControlGroupOption, QAProps} from '../types';
import {Option, OptionGroup} from './tech-components';

export type SelectProps = QAProps &
    Pick<ControlGroupProps, 'name' | 'disabled'> & {
        onUpdate?: (value: string[]) => void;
        onOpenChange?: (open: boolean) => void;
        onFilterChange?: (filter: string) => void;
        renderControl?: (props: {
            onClick: (e: React.MouseEvent<HTMLElement>) => void;
            onKeyDown: (e: React.KeyboardEvent<HTMLElement>) => void;
            ref: React.Ref<HTMLElement>;
        }) => React.ReactElement;
        renderFilter?: (props: {
            onChange: (filter: string) => void;
            onKeyDown: (e: React.KeyboardEvent<HTMLElement>) => void;
            value: string;
            ref: React.Ref<HTMLInputElement>;
        }) => React.ReactElement;
        renderOption?: (option: SelectOption) => React.ReactElement;
        renderEmptyOptions?: ({filter}: {filter: string}) => React.ReactElement;
        getOptionHeight?: (option: SelectOption) => number;
        filterOption?: (option: SelectOption, filter: string) => boolean;
        view?: TextInputView;
        size?: TextInputSize;
        pin?: TextInputPin;
        width?: 'auto' | 'max' | number;
        popupWidth?: number;
        virtualizationThreshold?: number;
        className?: string;
        label?: string;
        placeholder?: React.ReactNode;
        filterPlaceholder?: string;
        value?: string[];
        defaultValue?: string[];
        options?: (SelectOption | SelectOptionGroup)[];
        multiple?: boolean;
        filterable?: boolean;
        children?:
            | React.ReactElement<SelectOption, typeof Option>
            | React.ReactElement<SelectOption, typeof Option>[]
            | React.ReactElement<SelectOptionGroup, typeof OptionGroup>
            | React.ReactElement<SelectOptionGroup, typeof OptionGroup>[];
    };

export type SelectOption = ControlGroupOption & {
    text?: string;
    data?: any;
};

export type SelectOptionGroup = {
    label: string;
    options?: SelectOption[];
    children?:
        | React.ReactElement<SelectOption, typeof Option>
        | React.ReactElement<SelectOption, typeof Option>[];
};
