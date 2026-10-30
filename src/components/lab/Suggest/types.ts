import type * as React from 'react';

import type {OpenChangeReason} from '@floating-ui/react';

import type {ListItemActionEvent} from '../../List';
import type {PopupPlacement} from '../../Popup';
import type {TextInputProps} from '../../controls';
import type {AriaLabelingProps, ControlGroupOption, QAProps} from '../../types';

export type SuggestOpenChangeReason = OpenChangeReason | 'input-change' | 'option-action';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SuggestOptionProps<T = any> = QAProps & ControlGroupOption & {data?: T};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface SuggestProps<T = any> extends TextInputProps, AriaLabelingProps {
    /** List of options to display */
    options?: SuggestOptionProps<T>[];
    /**
     * Callback when an option is clicked or selected via keyboard.
     */
    onOptionAction?: (
        value: string,
        option: SuggestOptionProps<T>,
        event: ListItemActionEvent,
    ) => void;
    /**
     * Custom option renderer.
     */
    renderOption?: (
        option: SuggestOptionProps<T>,
        isItemActive: boolean,
        index: number,
    ) => React.ReactNode;
    /** Returns height for each option row (enables variable-height rows) */
    getOptionHeight?: (option: SuggestOptionProps<T>, index: number) => number;
    /** Called when the loading row becomes visible in a non-empty list (for pagination) */
    onLoadMore?: () => void;

    // Popup configuration
    /** Popup width: `'fit'` matches input width, `'auto'` uses natural width, number sets pixel width */
    popupWidth?: 'fit' | 'auto' | number;
    /** CSS class name for the popup */
    popupClassName?: string;
    /** Popup placement relative to the input */
    popupPlacement?: PopupPlacement;
    /** Render the popup without a portal */
    disablePortal?: boolean;

    /** Append a loading row to the options, or show a standalone loader when options are empty */
    loading?: boolean;

    /** Control popup open state externally */
    open?: boolean;
    /** Initial open state (uncontrolled mode) */
    defaultOpen?: boolean;
    /** Callback when popup open state changes */
    onOpenChange?: (open: boolean, event?: Event, reason?: SuggestOpenChangeReason) => void;

    /**
     * Called when the highlighted option index changes, via keyboard or pointer.
     * Receives `undefined` when no option is highlighted.
     * Use this to implement custom Tab-autocomplete or other behaviors
     * that depend on which option is currently active.
     */
    onActiveIndexChange?: (index: number | undefined) => void;
    /**
     * Use this to render empty-state or error UI as
     * well (you control what is shown based on your own state).
     */
    renderPopup?: (props: {list: React.ReactNode}) => React.ReactNode;
}
