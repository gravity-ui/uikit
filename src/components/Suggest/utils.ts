import type {ListItemData} from '../List';

interface IsPopupContentVisibleProps<T> {
    loading: boolean;
    options: ListItemData<T>[];
    error: Error | null;
    value: string;
    showOptionsOnEmptyValue: boolean;
    showNoOptionsMessage: boolean;
    showEmptyMessage: boolean;
}

export function isPopupContentVisible<T>({
    loading,
    options,
    error,
    value,
    showOptionsOnEmptyValue,
    showNoOptionsMessage,
    showEmptyMessage,
}: IsPopupContentVisibleProps<T>): boolean {
    if (loading) {
        return true;
    }

    if (error) {
        return true;
    }

    if (options.length > 0) {
        // If value is empty, only show options if showOptionsOnEmptyValue is true
        if (!value && !showOptionsOnEmptyValue) {
            return false;
        }
        return true;
    }

    // Show empty state (only if showEmptyMessage flag is true AND other conditions met)
    if (value && showNoOptionsMessage && showEmptyMessage) {
        return true;
    }

    return false;
}
