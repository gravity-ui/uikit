export type ToasterArgs = {
    // FIXME: BREAKING CHANGE. Remove in the next major
    /** @deprecated  Will be deleted in te next major. Use className instead */
    additionalClass?: string;
    className?: string;
    mobile?: boolean;
};

export type ToastType = 'info' | 'success' | 'warning' | 'error';

export type ToastAction = {
    onClick: VoidFunction;
    label: string;
    removeAfterClick?: boolean;
};

export type ToastProps = {
    name: string;
    title?: string;
    className?: string;
    timeout?: number;
    allowAutoHiding?: boolean;
    content?: React.ReactNode;
    type?: ToastType;
    isClosable?: boolean;
    isOverride?: boolean;
    actions?: ToastAction[];
};
