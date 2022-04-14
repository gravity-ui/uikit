import React, {InputHTMLAttributes} from 'react';

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
        InputHTMLAttributes<HTMLInputElement>,
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

export interface ControlGroupOption {
    value: string;
    content?: React.ReactNode;
    children?: React.ReactNode;
    disabled?: boolean;
}

export interface ControlGroupProps {
    name?: string;
    value?: string;
    defaultValue?: string;
    onUpdate?: (value: string) => void;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
    options?: ControlGroupOption[];
}
