export interface DOMProps {
    style?: React.CSSProperties;
    className?: string;
}

export interface QAProps {
    'data-qa'?: string;
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
    onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
    disabled?: boolean;
    options?: ControlGroupOption[];
    'aria-label'?: string;
    'aria-labelledby'?: string;
}
