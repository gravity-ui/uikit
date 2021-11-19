import React from 'react';

export interface DOMProps {
    style?: React.CSSProperties;
    className?: string;
}

export interface QAProps {
    qa?: string;
}

// Checkbox, Radio and Switch
export interface ControlProps {
    name?: string;
    value?: string;
    id?: string;
    checked?: boolean;
    defaultChecked?: boolean;
    indeterminate?: boolean;
    onUpdate?: (checked: boolean) => void;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
    disabled?: boolean;
    controlProps?: React.InputHTMLAttributes<HTMLInputElement>;
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
