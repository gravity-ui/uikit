import type {MenuItemProps} from '../Menu';

export type DropdownMenuItemAction<T> = (
    event: React.MouseEvent<HTMLElement, MouseEvent> | KeyboardEvent,
    data?: T,
) => void;

type DropdownMenuItemWithActionProps<T> = {
    action: DropdownMenuItemAction<T>;
    href?: string;
    items?: DropdownMenuItemMixed<T>[];
};

type DropdownMenuItemWithLinkProps<T> = {
    action?: DropdownMenuItemAction<T>;
    href: string;
    items?: DropdownMenuItemMixed<T>[];
};

type DropdownMenuItemWithSubmenuProps<T> = {
    action?: DropdownMenuItemAction<T>;
    href?: string;
    items: DropdownMenuItemMixed<T>[];
};

type DropdownMenuItemRequiredProps<T> =
    | DropdownMenuItemWithActionProps<T>
    | DropdownMenuItemWithLinkProps<T>
    | DropdownMenuItemWithSubmenuProps<T>;

export type DropdownMenuItem<T = unknown> = Omit<MenuItemProps, 'onClick' | 'children'> &
    DropdownMenuItemRequiredProps<T> & {
        text?: React.ReactNode;
        hidden?: boolean;
    };

export type DropdownMenuListItem<T = unknown> = Omit<DropdownMenuItem<T>, 'items' | 'hidden'> & {
    items?: DropdownMenuListItem<T>[];
    path: number[];
};

export type DropdownMenuItemMixed<T> = DropdownMenuItem<T> | Array<DropdownMenuItem<T>>;

export type DropdownMenuSize = 's' | 'm' | 'l' | 'xl';
