import type * as React from 'react';

import type {OpenChangeReason} from '@floating-ui/react';

import type {ListItemActionEvent} from '../../List';
import type {PopupPlacement} from '../../Popup';
import type {TextInputProps} from '../../controls';
import type {BaseInputControlProps} from '../../controls/types';
import type {AriaLabelingProps, ControlGroupOption, QAProps} from '../../types';

export type SuggestOpenChangeReason = OpenChangeReason | 'input-change' | 'option-action';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SuggestOptionProps<T = any> = QAProps & ControlGroupOption & {data?: T};

export type SuggestRenderInputProps = Omit<
    BaseInputControlProps<HTMLInputElement | HTMLTextAreaElement>,
    'controlRef' | 'defaultValue' | 'onChange' | 'onKeyUp'
> & {
    note?: React.ReactNode;
    ref: React.Ref<HTMLSpanElement>;
    controlRef: React.RefCallback<HTMLInputElement | HTMLTextAreaElement>;
    /** Optional popup anchor; defaults to the native control's parent element. */
    anchorRef: React.RefCallback<HTMLElement>;
    id: string;
    value: string;
    /** The requested open state; the popup also needs content to be rendered. */
    open: boolean;
    onUpdate: (value: string) => void;
    onFocus: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    onBlur: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    onKeyDown: React.KeyboardEventHandler<HTMLElement>;
    onClick: React.MouseEventHandler<HTMLElement>;
    controlProps: React.AriaAttributes & {role?: React.AriaRole};
};

type DefaultInputProp =
    | 'controlProps'
    | 'controlRef'
    | 'onChange'
    | 'onKeyDown'
    | 'onKeyUp'
    | 'type'
    | 'label'
    | 'startContent'
    | 'endContent';

interface SuggestBaseProps<T>
    extends Omit<TextInputProps, DefaultInputProp | 'onFocus' | 'onBlur'>, AriaLabelingProps {
    /** Initial open state (uncontrolled mode) */
    defaultOpen?: boolean;
    /** Render the popup without a portal */
    disablePortal?: boolean;
    /** Returns height for each option row (enables variable-height rows) */
    getOptionHeight?: (option: SuggestOptionProps<T>, index: number) => number;
    /** Append a loading row to the options, or show a standalone loader when options are empty */
    loading?: boolean;
    /**
     * Called when List requests an active option update via keyboard or pointer.
     * Receives the option value or null. Changes to options and popup visibility
     * do not emit additional notifications.
     */
    onActiveOptionUpdate?: (value: string | null) => void;
    onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    onFocus?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
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

type SuggestDefaultInputProps = Pick<TextInputProps, DefaultInputProp> & {
    renderInput?: undefined;
};

type SuggestCustomInputProps = {
    [K in DefaultInputProp]?: never;
} & {
    renderInput: (props: SuggestRenderInputProps) => React.ReactElement;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SuggestProps<T = any> = SuggestBaseProps<T> &
    (SuggestDefaultInputProps | SuggestCustomInputProps);
