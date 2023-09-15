import type React from 'react';

export interface DOMProps {
    style?: React.CSSProperties;
    className?: string;
}

export interface QAProps {
    qa?: string;
}

// Checkbox, Radio and Switch
export interface ControlProps
    extends Pick<
        React.InputHTMLAttributes<HTMLInputElement>,
        | 'name'
        | 'value'
        | 'id'
        | 'checked'
        | 'onChange'
        | 'onFocus'
        | 'onBlur'
        | 'disabled'
        | 'defaultChecked'
    > {
    indeterminate?: boolean;
    onUpdate?: (checked: boolean) => void;
    controlProps?: Omit<
        React.InputHTMLAttributes<HTMLInputElement>,
        | 'name'
        | 'value'
        | 'id'
        | 'onFocus'
        | 'onBlur'
        | 'disabled'
        | 'type'
        | 'onChange'
        | 'defaultChecked'
        | 'checked'
        | 'aria-checked'
    >;
    controlRef?: React.Ref<HTMLInputElement>;
}

export interface ControlGroupOption<ValueType extends string = string> extends DataAttrProps {
    value: ValueType;
    content?: React.ReactNode;
    children?: React.ReactNode;
    disabled?: boolean;
    title?: string;
}

export interface ControlGroupProps<ValueType extends string = string> extends DataAttrProps {
    name?: string;
    value?: ValueType;
    defaultValue?: ValueType;
    onUpdate?: (value: ValueType) => void;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
    disabled?: boolean;
    options?: ControlGroupOption<ValueType>[];
    'aria-label'?: string;
    'aria-labelledby'?: string;
}

export interface DataAttrProps {
    [dataAttribute: `data-${string}`]: string | number | boolean;
}
