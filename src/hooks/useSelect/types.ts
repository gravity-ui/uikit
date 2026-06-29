export type UseSelectOption<T = unknown, V = string> = T & {value: V};

export type UseOpenProps = {
    defaultOpen?: boolean;
    open?: boolean;
    onClose?: () => void;
    onOpenChange?: (open: boolean) => void;
};

export type UseSelectProps<V = string> = {
    value?: V[];
    defaultValue?: V[];
    multiple?: boolean;
    onUpdate?: (value: V[]) => void;
    disabled?: boolean;
} & UseOpenProps;

export type UseSelectResult<T, V = string> = {
    open: boolean;
    value: V[];
    activeIndex: number | undefined;
    handleSelection: (option: UseSelectOption<T, V>) => void;
    handleClearValue: () => void;
    setValue: (value: V[]) => void;
    toggleOpen: (val?: boolean | undefined) => void;
    setActiveIndex: React.Dispatch<React.SetStateAction<number | undefined>>;
};
