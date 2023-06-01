import React from 'react';

import {Modal} from '../Modal';
import type {ModalCloseReason} from '../Modal';
import {block} from '../utils/cn';

import {IndexType, StoriesLayout} from './components/StoriesLayout/StoriesLayout';
import type {StoriesLayoutProps} from './components/StoriesLayout/StoriesLayout';
import type {StoriesItem} from './types';

import './Stories.scss';

const b = block('stories');

export interface StoriesProps {
    open: boolean;
    items: StoriesItem[];
    onClose?: (
        event: MouseEvent | KeyboardEvent | React.MouseEvent<HTMLElement, MouseEvent>,
        reason: ModalCloseReason | 'closeButtonClick',
    ) => void;
    initialStoryIndex?: number;
    onPreviousClick?: (storyIndex: number) => void;
    onNextClick?: (storyIndex: number) => void;
    disableOutsideClick?: boolean;
    className?: string;
    action?: StoriesLayoutProps['action'];
}

export function Stories({
    open,
    onClose,
    items,
    onPreviousClick,
    onNextClick,
    initialStoryIndex = 0,
    disableOutsideClick = true,
    className,
    action,
}: StoriesProps) {
    const [storyIndex, setStoryIndex] = React.useState(initialStoryIndex);

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

    if (items.length === 0) {
        return null;
    }

    // case when items has changed and index has ceased to be valid
    if (items[storyIndex] === undefined) {
        const correctIndex = items[initialStoryIndex] === undefined ? 0 : initialStoryIndex;
        setStoryIndex(correctIndex);

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
            contentClassName={b('modal-content', className)}
        >
            <StoriesLayout
                items={items}
                storyIndex={storyIndex}
                indexType={indexType}
                handleButtonClose={handleButtonClose}
                handleGotoNext={handleGotoNext}
                handleGotoPrevious={handleGotoPrevious}
                action={action}
            />
        </Modal>
    );
}
