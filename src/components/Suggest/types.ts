import type {UseOpenProps} from '../../hooks/useSelect/types';
import type {SelectOptions, SelectProps} from '../Select/types';
import type {TextInputProps} from '../controls/TextInput';

/** Props for the Suggest component — free-text field with `Select`-style popup and list. */
export type SuggestProps<T = unknown> = Omit<TextInputProps, 'error' | 'type'> &
    Pick<
        SelectProps<T>,
        | 'renderOption'
        | 'renderOptionGroup'
        | 'renderPopup'
        | 'renderEmptyOptions'
        | 'getOptionHeight'
        | 'getOptionGroupHeight'
        | 'filterOption'
        | 'popupWidth'
        | 'popupPlacement'
        | 'popupClassName'
        | 'controlClassName'
        | 'disablePortal'
        | 'virtualizationThreshold'
        | 'loading'
        | 'onLoadMore'
    > &
    UseOpenProps & {
        /** Same shape as {@link SelectProps.options}. Takes precedence over `items`. */
        options?: SelectOptions<T>;
        /** Shorthand: each string becomes `{value, content}`. Ignored when `options` is set. */
        items?: string[];
        /** Root width — same as {@link SelectProps.width}. */
        width?: SelectProps['width'];
        /**
         * Renders results **below the text field** in normal document flow (no floating popup).
         * The list spans the full width of the Suggest root — use `width="max"` inside flex layouts and
         * `min-width: 0` on flex parents so it respects the column width.
         */
        inlineSuggest?: boolean;
        /**
         * Called when the user edits the field (same string as `onUpdate`). Use with `loading` and
         * dynamic `options` / `items` to load matches asynchronously (debounce the fetch in your handler).
         */
        onFilterChange?: (filter: string) => void;
    };
