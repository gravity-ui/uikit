import React from 'react';

import {Modal, ModalCloseReason} from '../Modal';
import {StoriesItem} from './types';

import {IndexType, StoriesLayout} from './components/StoriesLayout/StoriesLayout';

import {block} from '../utils/cn';

import './Stories.scss';

const b = block('stories');

export interface StoriesProps {
    open: boolean;
    items: StoriesItem[];
    onClose?: (
        event: MouseEvent | KeyboardEvent | React.MouseEvent<HTMLElement, MouseEvent>,
        reason: ModalCloseReason | 'closeButtonClick',
    ) => void;

    /** @deprecated  Will be deleted in te next major. Use `index` instead */
    initialStoryIndex?: number;

    index?: number;
    onPreviousClick?: (storyIndex: number) => void;
    onNextClick?: (storyIndex: number) => void;
    disableOutsideClick?: boolean;
}

export function Stories({
    open,
    onClose,
    items,
    onPreviousClick,
    onNextClick,
    initialStoryIndex,
    index,
    disableOutsideClick = true,
}: StoriesProps) {
    const [storyIndex, setStoryIndex] = React.useState(initialStoryIndex ?? index ?? 0);

    React.useEffect(() => {
        if (index === undefined || index < 0) {
            return;
        }

        if (storyIndex !== index) {
            setStoryIndex(index);
        }
    }, [open]);

    const handleClose = React.useCallback<NonNullable<StoriesProps['onClose']>>(
        (event, reason) => {
            onClose?.(event, reason);
        },
        [onClose],
    );

    const handleButtonClose = React.useCallback<
        (event: MouseEvent | KeyboardEvent | React.MouseEvent<HTMLElement, MouseEvent>) => void
    >(
        (event) => {
            handleClose(event, 'closeButtonClick');
        },
        [handleClose],
    );

    const handleGotoPrevious = React.useCallback(() => {
        setStoryIndex((currentStoryIndex) => {
            if (currentStoryIndex <= 0) {
                return 0;
            }

            const newIndex = currentStoryIndex - 1;
            onPreviousClick?.(newIndex);
            return newIndex;
        });
    }, [onPreviousClick]);

    const handleGotoNext = React.useCallback(() => {
        setStoryIndex((currentStoryIndex) => {
            if (currentStoryIndex >= items.length - 1) {
                return items.length - 1;
            }

            const newIndex = currentStoryIndex + 1;
            onNextClick?.(newIndex);
            return newIndex;
        });
    }, [items, onNextClick]);

    if (items.length === 0 || items[storyIndex] === undefined) {
        return null;
    }

    const indexType =
        (storyIndex === 0 && IndexType.Start) ||
        (storyIndex === items.length - 1 && IndexType.End) ||
        IndexType.InProccess;

    return (
        <Modal
            open={open}
            onClose={handleClose}
            disableOutsideClick={disableOutsideClick}
            contentClassName={b('modal-content')}
        >
            <StoriesLayout
                items={items}
                storyIndex={storyIndex}
                indexType={indexType}
                handleButtonClose={handleButtonClose}
                handleGotoNext={handleGotoNext}
                handleGotoPrevious={handleGotoPrevious}
            />
        </Modal>
    );
}
