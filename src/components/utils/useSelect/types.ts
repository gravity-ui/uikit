export type UseSelectOption<T = unknown> = T & {value: string};

export type UseSelectProps = {
    value?: string[];
    defaultValue?: string[];
    multiple?: boolean;
    defaultOpen?: boolean;
    onUpdate?: (value: string[]) => void;
    open?: boolean;
};
