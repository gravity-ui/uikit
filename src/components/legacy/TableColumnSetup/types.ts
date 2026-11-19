import type * as React from 'react';

import type {PopupPlacement} from '../../Popup';
import type {TableColumnConfig} from '../Table/Table';

// Kept apart from the component: DefaultPropsMap must not reach @hello-pangea/dnd through it.
export interface TableColumnSetupItem {
    id: string;
    title: React.ReactNode;
    selected?: boolean;
    required?: boolean;
    sticky?: TableColumnConfig<unknown>['sticky'];
}

type Item = TableColumnSetupItem;

export interface SwitcherProps {
    onKeyDown: React.KeyboardEventHandler<HTMLElement>;
    onClick: React.MouseEventHandler<HTMLElement>;
}

export interface TableColumnSetupProps {
    // for Button
    disabled?: boolean;
    /**
     * @deprecated Use renderSwitcher instead
     */
    switcher?: React.ReactElement | undefined;
    renderSwitcher?: (props: SwitcherProps) => React.ReactElement | undefined;

    items: Item[];
    sortable?: boolean;
    hideApplyButton?: boolean;

    onUpdate: (updated: Item[]) => void;
    popupWidth?: number | 'fit' | undefined;
    popupPlacement?: PopupPlacement;
    getItemTitle?: (item: Item) => TableColumnSetupItem['title'];
    showStatus?: boolean;
    className?: string;
}
