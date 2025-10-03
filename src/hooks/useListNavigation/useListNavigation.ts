import * as React from 'react';

import {KeyCode} from '../../constants';

import {moveBack} from './moveBack';
import {moveForward} from './moveForward';

export type UseListNavigationProps<ItemType, AnchorType> = {
    items: ItemType[];
    skip?: (item: ItemType) => boolean;
    pageSize?: number;
    processHomeKey?: boolean;
    processEndKey?: boolean;
    disabled?: boolean;
    initialValue?: number;
    anchorRef?: React.RefObject<AnchorType>;
    onAnchorKeyDown?: (activeItemIndex: number, event: KeyboardEvent) => void | boolean;
};

export type UseListNavigationResult = {
    activeItemIndex: number;
    setActiveItemIndex: React.Dispatch<React.SetStateAction<number>>;
    reset: () => void;
};

export function useListNavigation<ItemType, AnchorType extends HTMLElement>({
    items,
    skip,
    pageSize,
    processHomeKey = true,
    processEndKey = true,
    anchorRef,
    disabled = false,
    initialValue = -1,
    onAnchorKeyDown,
}: UseListNavigationProps<ItemType, AnchorType>): UseListNavigationResult {
    const [activeItemIndex, setActiveItemIndex] = React.useState<number>(initialValue);

    const reset = React.useCallback(() => {
        setActiveItemIndex(initialValue);
    }, [initialValue]);

    React.useEffect(() => {
        if (items) {
            reset();
        }
    }, [items, reset]);

    React.useLayoutEffect(() => {
        if (disabled) {
            return undefined;
        }

        const canNavigate = items.some((item) => !skip?.(item));
        if (!canNavigate) {
            return undefined;
        }

        const anchor = anchorRef?.current;
        if (!anchor) {
            return undefined;
        }

        const handleKeyDown = (event: KeyboardEvent) => {
            const shouldProcessKeydown = onAnchorKeyDown?.(activeItemIndex, event);
            if (shouldProcessKeydown === false) {
                return;
            }

            switch (event.key) {
                case KeyCode.ARROW_DOWN: {
                    event.preventDefault();

                    // Go 1 step forward
                    setActiveItemIndex((previousActiveItemIndex) =>
                        moveForward(items, previousActiveItemIndex, 1, skip),
                    );

                    break;
                }
                case KeyCode.ARROW_UP: {
                    event.preventDefault();

                    // Go 1 step back
                    setActiveItemIndex((previousActiveItemIndex) =>
                        moveBack(items, previousActiveItemIndex, 1, skip),
                    );

                    break;
                }
                case KeyCode.PAGE_DOWN: {
                    if (!pageSize) {
                        return;
                    }

                    event.preventDefault();

                    // Go pageSize steps forward
                    setActiveItemIndex((previousActiveItemIndex) =>
                        moveForward(items, previousActiveItemIndex, pageSize, skip),
                    );

                    break;
                }
                case KeyCode.PAGE_UP: {
                    if (!pageSize) {
                        return;
                    }

                    event.preventDefault();

                    // Go pageSize steps back
                    setActiveItemIndex((previousActiveItemIndex) =>
                        moveBack(items, previousActiveItemIndex, pageSize, skip),
                    );

                    break;
                }
                case KeyCode.HOME: {
                    if (!processHomeKey) {
                        return;
                    }

                    event.preventDefault();

                    // Go to the start of the list
                    setActiveItemIndex((previousActiveItemIndex) =>
                        moveBack(items, previousActiveItemIndex, previousActiveItemIndex, skip),
                    );

                    break;
                }
                case KeyCode.END: {
                    if (!processEndKey) {
                        return;
                    }

                    event.preventDefault();

                    // Go to the end of the list
                    setActiveItemIndex((previousActiveItemIndex) =>
                        moveBack(items, previousActiveItemIndex, previousActiveItemIndex + 1, skip),
                    );

                    break;
                }
            }
        };

        anchor.addEventListener('keydown', handleKeyDown);

        return () => {
            anchor.removeEventListener('keydown', handleKeyDown);
        };
    }, [
        activeItemIndex,
        anchorRef,
        disabled,
        items,
        onAnchorKeyDown,
        pageSize,
        processEndKey,
        processHomeKey,
        skip,
    ]);

    return {
        activeItemIndex,
        setActiveItemIndex,
        reset,
    };
}
