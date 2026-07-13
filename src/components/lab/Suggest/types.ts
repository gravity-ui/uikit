import type * as React from 'react';

import type {OpenChangeReason} from '@floating-ui/react';

import type {ListItemData, ListProps} from '../../List';
import type {PopupProps} from '../../Popup';
import type {TextInputProps} from '../../controls';
import type {QAProps} from '../../types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface SuggestProps<T = any> extends QAProps {
    /** Input value (controlled) */
    value?: string;
    /** Default input value (uncontrolled) */
    defaultValue?: string;
    /** Callback when input value changes */
    onUpdate?: (value: string) => void;

    /** List of options to display */
    options?: ListItemData<T>[];
    /**
     * Callback when an option is clicked or selected via keyboard.
     * Return `true` to keep the popup open after selection.
     */
    onOptionClick?: (option: T, index?: number) => boolean | void;
    /** Custom option renderer */
    renderOption?: ListProps<T>['renderItem'];
    /** Enable virtualization for long lists */
    virtualized?: boolean;
    /**
     * Height of the scrollable list viewport in pixels when `virtualized` is enabled.
     * Defaults to `300`. Has no effect when `virtualized` is `false`.
     */
    listHeight?: number;
    /** Returns height for each option row (enables variable-height rows) */
    getOptionHeight?: (option: ListItemData<T>, index: number) => number;
    /** Called when the user scrolls to the bottom of the list (for pagination) */
    onLoadMore?: () => void;

    // Input customization — spread into the underlying TextInput
    /**
     * All `TextInput` props (placeholder, size, pin, disabled, hasClear,
     * error, startContent, endContent, controlRef, etc.).
     * These are spread directly into the `TextInput` component.
     */
    inputProps?: TextInputProps;

    // Popup configuration
    /** Popup width: `'fit'` matches input width, `'auto'` uses natural width, number sets pixel width */
    popupWidth?: 'fit' | 'auto' | number;
    /**
     * Any `Popup` props (placement, className, qa, offset, disablePortal, etc.).
     * Spread directly into the `Popup` component.
     * Note: `open`, `onOpenChange`, `anchorElement`, `id`, and `style` are
     * controlled by Suggest and cannot be overridden here.
     */
    popupProps?: PopupProps;

    /** Show a loading indicator inside the popup (useful with async data via hooks) */
    loading?: boolean;

    /** Control popup open state externally */
    open?: boolean;
    /** Initial open state (uncontrolled mode) */
    defaultOpen?: boolean;
    /** Callback when popup open state changes */
    onOpenChange?: (open: boolean, event?: Event, reason?: OpenChangeReason) => void;

    /**
     * Called when the keyboard-highlighted option index changes.
     * Use this to implement custom Tab-autocomplete or other behaviors
     * that depend on which option is currently active.
     */
    onActiveIndexChange?: (index: number | undefined) => void;
    /**
     * Use this to render empty-state or error UI as
     * well (you control what is shown based on your own state).
     */
    renderPopup?: (props: {list: React.ReactNode}) => React.ReactNode;

    /** CSS class name for the wrapper element */
    className?: string;
    /** Inline styles for the wrapper element */
    style?: React.CSSProperties;
    /** Component id (auto-generated if omitted) */
    id?: string;
}
