import type * as React from 'react';

import type {IconData} from '../Icon';
import type {ListItemData, ListProps} from '../List';
import type {PopupPlacement, PopupProps} from '../Popup';
import type {TextInputPin, TextInputProps, TextInputSize} from '../controls';
import type {QAProps} from '../types';

export interface RenderFallbackContentProps {
    value: string;
    error?: Error | null;
    loading?: boolean;
}

/**
 * Render mode for the options popup.
 * - `'popup'` (default): options are rendered inside a floating `Popup`
 * - `'inline'`: options are rendered inline directly under the input
 *   (no portal, no floating positioning). Useful when embedding the
 *   suggest inside a larger container that handles overflow itself.
 */
export type RenderStyle = 'popup' | 'inline';

export interface SuggestProps<T = any> extends QAProps {
    // Options fetching
    /** Function to fetch options based on input value (can return sync or async) */
    getOptions: (value: string) => ListItemData<T>[] | Promise<ListItemData<T>[]>;
    /** Callback when an option is clicked. Return true to keep popup open */
    onOptionClick?: (item: T, index?: number, fromKeyboard?: boolean) => boolean | void;
    /** Custom option renderer */
    renderOption?: ListProps<T>['renderItem'];
    /** Enable virtualization for long lists */
    virtualized?: boolean;
    /** Option height in pixels or function returning height for each option */
    itemHeight?: number | ((item: ListItemData<T>) => number);
    /** Get height for specific option (alternative to itemHeight) */
    getOptionHeight?: (option: ListItemData<T>, index: number) => number;
    /** Function to determine initial active option index after options are fetched */
    getInitialActiveItemIndex?: (options: ListItemData<T>[]) => number;

    // TextInput props
    /** Input value (controlled) */
    value?: string;
    /** Default input value (uncontrolled) */
    defaultValue?: string;
    /** Callback when input value changes */
    onUpdate?: (value: string) => void;
    /** Input placeholder text */
    placeholder?: string;
    /** Input size */
    size?: TextInputSize;
    /** Input pin style */
    pin?: TextInputPin;
    /** Disable the input */
    disabled?: boolean;
    /** Make the input read-only */
    readOnly?: boolean;
    /** Autocomplete attribute value */
    autoComplete?: TextInputProps['autoComplete'];
    /** Enable autofocus on mount */
    autoFocus?: boolean;
    /** Show clear button */
    hasClear?: boolean;
    /** Error state */
    error?: TextInputProps['error'];
    /** Determines content of the error message */
    errorMessage?: React.ReactNode;
    /** Error message placement */
    errorPlacement?: TextInputProps['errorPlacement'];
    /** Describes the validation state */
    validationState?: 'invalid';
    /** CSS class name */
    className?: string;
    /** Inline styles for the wrapper */
    style?: React.CSSProperties;
    /** CSS class name for the input element */
    inputClassName?: string;
    /** Component ID (auto-generated if not provided) */
    id?: string;
    /** Form input name attribute */
    name?: string;
    /** Additional props for the input control */
    controlProps?: React.InputHTMLAttributes<HTMLInputElement>;
    /** Content to render before the input */
    startContent?: React.ReactNode;
    /** Content to render after the input and clear button */
    endContent?: React.ReactNode;
    /**
     * Ref to the underlying `<input>` DOM element.
     * Useful when you need direct access to the input (e.g. focus, blur, selection).
     */
    controlRef?: TextInputProps['controlRef'];

    // Popup configuration
    /** CSS class name for popup */
    popupClassName?: string;
    /** Popup placement */
    popupPlacement?: PopupPlacement;
    /** QA attribute for popup */
    popupQa?: string;
    /** Popup width mode: 'fit' matches input width, number sets pixel width */
    popupWidth?: 'fit' | 'auto' | number;
    /** Popup offset [x, y] */
    popupOffset?: PopupProps['offset'];
    /** Disable popup portal */
    popupDisablePortal?: boolean;
    /**
     * When `true`, the component re-measures itself on `window` resize so
     * the popup width stays in sync with the input. Off by default to avoid
     * unnecessary re-renders.
     */
    syncPopupOnResize?: boolean;
    /**
     * Render mode for the options popup. `'popup'` renders inside a floating
     * `Popup` (default), `'inline'` renders the options directly underneath
     * the input without a portal.
     */
    renderStyle?: RenderStyle;

    // Open/Close state (controlled/uncontrolled)
    /** Control popup open state (controlled mode) */
    open?: boolean;
    /** Initial open state (uncontrolled mode) */
    defaultOpen?: boolean;

    // Behavior control
    /** Debounce delay in milliseconds for getOptions calls */
    debounce?: number;
    /** Override loading state (when using controlled options) */
    loading?: boolean;
    /** Show options when input value is empty */
    showOptionsOnEmptyValue?: boolean;
    /** Fetch options on component mount */
    getOptionsOnMount?: boolean;
    /** Allow accepting arbitrary input values (not just from list) */
    applicableInputValue?: boolean;
    /** Show "no options" message when list is empty */
    showNoOptionsMessage?: boolean;
    /** Callback to load more options (for infinite scroll) */
    onLoadMore?: () => void;

    // Event handlers
    /** Callback when input loses focus */
    onBlur?: () => void;
    /** Callback when popup open state changes */
    onOpenChange?: (isOpen: boolean) => void;
    /** Callback for any key press in input (when no option is active) */
    onInputKeyDown?: (value: string, event: React.KeyboardEvent) => void;
    /** Callback for Enter key in input with applicableInputValue=true (when no option is active) */
    onInputEnterKeyDown?: (value: string, event: React.KeyboardEvent) => void;
    /** Callback for Tab key when popup is open. Return boolean to control popup state */
    onTabKeyDown?: (
        value: string,
        event: React.KeyboardEvent,
        extra: {
            items: ListItemData<T>[];
            activeIndex?: number;
        },
    ) => boolean | undefined;

    // Fallback content
    /**
     * Optional icon to render in the default "no options" placeholder.
     * Pass any `IconData` from `@gravity-ui/icons` (or compatible). When
     * omitted, the default placeholder shows just the title and description
     * — no icon at all. For full control over the markup use
     * `renderEmptyOptions` instead.
     */
    emptyIcon?: IconData;
    /**
     * Optional icon to render in the default "fetch error" placeholder.
     * Pass any `IconData` from `@gravity-ui/icons` (or compatible). When
     * omitted, the default placeholder shows just the title, description
     * and the retry button. For full control over the markup use
     * `renderFetchOptionsError` instead.
     */
    errorIcon?: IconData;
    /** Custom component to render when no options match the search */
    renderEmptyOptions?: (props: RenderFallbackContentProps) => React.ReactElement | null;
    /** Custom component to render when fetching options fails */
    renderFetchOptionsError?: (props: RenderFallbackContentProps) => React.ReactElement | null;
    /** Custom render function for popup content. Receives the list node and state */
    renderPopup?: (props: {
        list: React.ReactNode;
        loading: boolean;
        error: Error | null;
    }) => React.ReactNode;

    /**
     * Render-prop for fully custom layouts. When provided, completely replaces
     * the default popup-based layout — receives the input node, current
     * fetched options, and current loading flag, and returns whatever JSX
     * you want (e.g. inline lists, side-by-side panels, etc.).
     */
    children?: (
        input: React.ReactNode,
        options: ListItemData<T>[],
        loading: boolean,
    ) => React.ReactNode;
}
