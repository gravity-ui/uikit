import type * as React from 'react';

import type {OpenChangeReason} from '@floating-ui/react';

import type {ListItemActionEvent} from '../../List';
import type {PopupPlacement} from '../../Popup';
import type {TextInputProps} from '../../controls';
import type {AriaLabelingProps, ControlGroupOption, QAProps} from '../../types';

export type SuggestOpenChangeReason = OpenChangeReason | 'input-change' | 'option-action';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SuggestOptionProps<T = any> = QAProps & ControlGroupOption & {data?: T};

export type SuggestRenderControlProps = {
    /** Attributes and event handlers to attach to the custom control's focusable element. */
    controlProps: React.AriaAttributes &
        Pick<React.HTMLAttributes<HTMLElement>, 'id' | 'role' | 'onClick' | 'onKeyDown'>;
    disabled?: boolean;
    onUpdate: (value: string) => void;
    /** Whether opening is requested; the popup is only shown when it has content. */
    open: boolean;
    ref: React.Ref<HTMLElement>;
    value: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface SuggestProps<T = any> extends TextInputProps, AriaLabelingProps {
    /** The active option's value (controlled mode); null means no active option. */
    activeOption?: string | null;
    /** Initial active option's value (uncontrolled mode). */
    defaultActiveOption?: string | null;
    /** Initial open state (uncontrolled mode) */
    defaultOpen?: boolean;
    /** Render the popup without a portal */
    disablePortal?: boolean;
    /** Returns height for each option row (enables variable-height rows) */
    getOptionHeight?: (option: SuggestOptionProps<T>, index: number) => number;
    /** Append a loading row to the options, or show a standalone loader when options are empty */
    loading?: boolean;
    /**
     * Called when List requests an active option update, or with null to reset activity
     * when the list closes, the text changes, or the control is clicked.
     * Receives the option value or null. Reordering or removing individual options
     * does not emit additional notifications.
     */
    onActiveOptionUpdate?: (value: string | null) => void;
    /** Called when the loading row becomes visible in a non-empty list (for pagination) */
    onLoadMore?: () => void;
    /** Callback when popup open state changes */
    onOpenChange?: (open: boolean, event?: Event, reason?: SuggestOpenChangeReason) => void;
    /**
     * Callback when an option is clicked or selected via keyboard.
     */
    onOptionAction?: (
        value: string,
        option: SuggestOptionProps<T>,
        event: ListItemActionEvent,
    ) => void;
    /** Control popup open state externally */
    open?: boolean;
    /** List of options to display */
    options?: SuggestOptionProps<T>[];
    /** CSS class name for the popup */
    popupClassName?: string;
    /** Popup placement relative to the input */
    popupPlacement?: PopupPlacement;
    /** Popup width */
    popupWidth?: 'fit' | number;
    /** Render a custom control using the provided ref, controlProps, value and onUpdate. */
    renderControl?: (props: SuggestRenderControlProps) => React.ReactElement;
    /** Render empty-state or error content when there are no options and loading is false. */
    renderEmptyOptions?: (props: {filter: string}) => React.ReactElement | null;
    /**
     * Custom option renderer.
     */
    renderOption?: (
        option: SuggestOptionProps<T>,
        options: {itemHeight: number; isItemActive: boolean; selected: boolean},
    ) => React.ReactElement;
    /** Replace or wrap the default popup content. */
    renderPopup?: (props: {
        renderList: () => React.ReactElement | null;
    }) => React.ReactElement | null;
}
