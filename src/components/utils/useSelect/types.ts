export type UseSelectOption<T = unknown> = T & {value: string};

export type UseOpenProps = {
    defaultOpen?: boolean;
    open?: boolean;
    onClose?: () => void;
    onOpenChange?: (open: boolean) => void;
};

export type UseSelectProps = {
    value?: string[];
    defaultValue?: string[];
    multiple?: boolean;
    defaultOpen?: boolean;
    onUpdate?: (value: string[]) => void;
    open?: boolean;
};
