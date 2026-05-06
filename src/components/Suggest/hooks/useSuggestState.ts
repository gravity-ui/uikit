import * as React from 'react';

import type {List, ListItemData} from '../../List';

interface UseSuggestStateProps<T> {
    value: string;
    onUpdate?: (value: string) => void;
    getOptions: (value: string) => ListItemData<T>[] | Promise<ListItemData<T>[]>;
    debounce: number;
    loadingProp?: boolean;
    showOptionsOnEmptyValue: boolean;
    getOptionsOnMount: boolean;
    getInitialActiveItemIndex?: (options: ListItemData<T>[]) => number;
    onBlur?: () => void;
    open: boolean;
    toggleOpen: (val?: boolean) => void;
    listRef: React.RefObject<List<T>>;
}

export function useSuggestState<T>({
    value,
    onUpdate,
    getOptions,
    debounce: debounceMs,
    loadingProp,
    showOptionsOnEmptyValue,
    getOptionsOnMount,
    getInitialActiveItemIndex,
    onBlur,
    open,
    toggleOpen,
    listRef,
}: UseSuggestStateProps<T>) {
    const [loading, setLoading] = React.useState(false);
    const [showLoadingIndicator, setShowLoadingIndicator] = React.useState(false);
    const [items, setItems] = React.useState<ListItemData<T>[]>([]);
    const [error, setError] = React.useState<Error | null>(null);
    const [activeIndex, setActiveIndex] = React.useState<number | undefined>();
    const [showEmptyMessage, setShowEmptyMessage] = React.useState(false);

    const loadingTimerRef = React.useRef<ReturnType<typeof setTimeout>>();
    const latestRequestIdRef = React.useRef<number>(0);

    const isLoading = loadingProp === undefined ? loading : loadingProp;

    // Show loading indicator with 300ms delay
    React.useEffect(() => {
        if (isLoading) {
            loadingTimerRef.current = setTimeout(() => {
                setShowLoadingIndicator(true);
            }, 300);
        } else {
            if (loadingTimerRef.current) {
                clearTimeout(loadingTimerRef.current);
            }
            setShowLoadingIndicator(false);
        }

        return () => {
            if (loadingTimerRef.current) {
                clearTimeout(loadingTimerRef.current);
            }
        };
    }, [isLoading]);

    const fetchOptions = React.useCallback(
        async (searchValue: string) => {
            // Increment and capture request ID
            const requestId = ++latestRequestIdRef.current;

            setLoading(true);
            setError(null);
            setActiveIndex(undefined);

            try {
                const result = getOptions(searchValue);
                const fetchedOptions = await result;

                // Only update if this is still the latest request
                if (requestId === latestRequestIdRef.current) {
                    setItems(fetchedOptions);
                    setLoading(false);
                    setError(null);
                    setShowEmptyMessage(fetchedOptions.length === 0);

                    // Set initial active index
                    if (getInitialActiveItemIndex && listRef.current && fetchedOptions.length > 0) {
                        const initialIndex = getInitialActiveItemIndex(fetchedOptions);
                        if (initialIndex >= 0 && initialIndex < fetchedOptions.length) {
                            setActiveIndex(initialIndex);
                            listRef.current.activateItem(initialIndex);
                        }
                    }
                }
            } catch (err) {
                // Only update error if this is still the latest request
                if (requestId === latestRequestIdRef.current) {
                    setError(err as Error);
                    setLoading(false);
                    setItems([]);
                    setShowEmptyMessage(false);
                }
            }
        },
        [getOptions, getInitialActiveItemIndex, listRef],
    );

    const debouncedFetchOptions = React.useMemo(() => {
        if (debounceMs === 0) {
            return fetchOptions;
        }

        let timeoutId: ReturnType<typeof setTimeout>;
        return (searchValue: string) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                fetchOptions(searchValue);
            }, debounceMs);
        };
    }, [fetchOptions, debounceMs]);

    // Fetch items on mount if needed
    React.useEffect(() => {
        if (getOptionsOnMount) {
            fetchOptions(value);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Update items when value changes
    React.useEffect(() => {
        if (value || showOptionsOnEmptyValue) {
            // Clear states before debounced fetch
            setError(null);
            setActiveIndex(undefined);
            setShowEmptyMessage(false);

            setLoading(true);
            debouncedFetchOptions(value);
        } else if (!value && !showOptionsOnEmptyValue) {
            setItems([]);
            setLoading(false);
            setShowEmptyMessage(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value, showOptionsOnEmptyValue]);

    const handleValueChange = React.useCallback(
        (newValue: string) => {
            onUpdate?.(newValue);

            // Auto-open popup when user types
            if (newValue && !open) {
                toggleOpen(true);
            }
        },
        [onUpdate, open, toggleOpen],
    );

    const handleInputFocus = React.useCallback(() => {
        if (value || showOptionsOnEmptyValue) {
            toggleOpen(true);
        }
    }, [value, showOptionsOnEmptyValue, toggleOpen]);

    const handleInputBlur = React.useCallback(() => {
        onBlur?.();
    }, [onBlur]);

    const refetchOptions = React.useCallback(() => {
        fetchOptions(value);
    }, [fetchOptions, value]);

    return {
        showLoadingIndicator,
        options: items,
        error,
        activeIndex,
        showEmptyMessage,
        setActiveIndex,
        handleValueChange,
        handleInputFocus,
        handleInputBlur,
        refetchOptions,
    };
}
