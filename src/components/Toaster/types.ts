import type {ButtonView} from '../Button';

export type ToasterArgs = {
    className?: string;
    mobile?: boolean;
};

export type ToastTheme = 'normal' | 'info' | 'success' | 'warning' | 'danger' | 'utility';

export type ToastAction = {
    onClick: VoidFunction;
    label: string;
    view?: ButtonView;
    removeAfterClick?: boolean;
};

export type ToastProps = {
    name: string;
    title?: string;
    className?: string;
    autoHiding?: number | false;
    content?: React.ReactNode;
    theme?: ToastTheme;
    isClosable?: boolean;
    actions?: ToastAction[];

    /** Function. Use for toast icon customization. By default type-based behavior is used */
    renderIcon?: (toastProps: ToastProps) => React.ReactNode;
};

export type InternalToastProps = ToastProps & {
    addedAt?: number;
    ref?: React.RefObject<HTMLDivElement>;
};

export interface ToasterContextMethods {
    add(toast: ToastProps): void;
    remove(toastName: ToastProps['name']): void;
    removeAll(): void;
    update(toastName: ToastProps['name'], override: Partial<ToastProps>): void;
    has(toastName: ToastProps['name']): boolean;
}

export interface ToasterPublicMethods extends ToasterContextMethods {}
