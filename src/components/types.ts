import type * as React from 'react';

export interface DOMProps {
    style?: CSSProperties;
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

export interface ControlGroupOption<ValueType extends string = string> {
    value: ValueType;
    content?: React.ReactNode;
    children?: React.ReactNode;
    disabled?: boolean;
    title?: string;
}

export interface ControlGroupProps<ValueType extends string = string> extends AriaLabelingProps {
    name?: string;
    value?: ValueType | null;
    defaultValue?: ValueType;
    onUpdate?: (value: ValueType) => void;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
    disabled?: boolean;
    options?: ControlGroupOption<ValueType>[];
}

export type Key = string | number;

export interface AriaLabelingProps {
    /**
     * Defines a string value that labels the current element.
     */
    'aria-label'?: string;

    /**
     * Identifies the element (or elements) that labels the current element.
     */
    'aria-labelledby'?: string;

    /**
     * Identifies the element (or elements) that describes the object.
     */
    'aria-describedby'?: string;

    /**
     * Identifies the element (or elements) that provide a detailed, extended description for the object.
     */
    'aria-details'?: string;
}

export interface FocusEventHandlers<Target = Element> {
    /** Handler that is called when the element receives focus. */
    onFocus?: React.FocusEventHandler<Target>;
    /** Handler that is called when the element loses focus. */
    onBlur?: React.FocusEventHandler<Target>;
}

export type CSSProperties =
    | (React.CSSProperties & {
          [key: `--${string}`]: string | number;
      })
    | React.CSSProperties;
