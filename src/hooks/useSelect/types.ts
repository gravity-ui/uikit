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
    onUpdate?: (value: string[]) => void;
} & UseOpenProps;

export type UseSelectResult<T> = {
    open: boolean;
    value: string[];
    activeIndex: number | undefined;
    handleSelection: (option: UseSelectOption<T>) => void;
    handleClearValue: () => void;
    toggleOpen: (val?: boolean | undefined) => void;
    setActiveIndex: React.Dispatch<React.SetStateAction<number | undefined>>;
};
